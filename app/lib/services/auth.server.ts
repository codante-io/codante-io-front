import type { TypedResponse } from "@remix-run/node";
import {
  createCookie,
  createCookieSessionStorage,
  redirect,
} from "@remix-run/node";
import axios from "./axios.server";
import type { AxiosResponse } from "axios";
import type { User } from "~/lib/models/user.server";
import { environment } from "~/lib/models/environment.server";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "codante_session",
    secure: environment().NODE_ENV === "production",
    secrets: [environment().SESSION_SECRET as string],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;

export async function register({
  request,
  name,
  email,
  password,
  passwordConfirmation,
}: {
  request: Request;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}) {
  try {
    await axios.post("/register", {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  } catch (error: any) {
    return { errors: error?.response?.data?.message };
  }

  return await login({
    request,
    email,
    password,
    redirectTo: "/?new-signup=true",
  });
}

export async function login({
  request,
  email,
  password,
  redirectTo = "/",
}: {
  request: Request;
  email: string;
  password: string;
  redirectTo?: string;
}) {
  let response: AxiosResponse;
  let session = await sessionStorage.getSession(request.headers.get("Cookie"));

  try {
    response = await axios.post("/login", { email, password });
  } catch (error: any) {
    return { errors: error?.response?.data?.message };
  }

  let userData: { token?: string } = {};
  if (session.get("user")) {
    userData = session.get("user");
  }
  userData.token = response.data.token;
  session.set("user", userData);

  return {
    redirector: redirect(redirectTo, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    }),
  };
}

export async function logout({
  request,
  redirectTo = "/login",
}: {
  request: Request;
  redirectTo?: string;
}) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  let user = session.get("user");

  if (!user?.token) return redirect(redirectTo);

  await axios.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: "Bearer " + user?.token,
      },
    },
  );

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function logoutWithRedirectAfterLogin({
  request,
  redirectTo = "/login",
}: {
  request: Request;
  redirectTo?: string;
}) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  let user = session.get("user");

  if (!user?.token) return redirect(`/login?redirectTo=${redirectTo}`);

  await axios.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: "Bearer " + user?.token,
      },
    },
  );

  return redirect(`/login?redirectTo=${redirectTo}`, {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}

export async function currentToken({ request }: { request: Request }) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  if (session.has("user")) {
    const { token } = session.get("user");
    return token;
  }
}

export async function user({
  request,
  params,
}: {
  request: Request;
  params?: any;
}): Promise<User | null | TypedResponse<any>> {
  let response;
  let token = await currentToken({ request });

  try {
    response = await axios.get<User>("/user", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  } catch (error: any) {
    // se o usuário não estiver autenticado, destrua a sessão e redirecione de volta.
    if (error?.response?.status === 401) {
      const session = await getSession(request.headers.get("Cookie"));
      if (session.has("user")) {
        return redirect(`/${params?.name}`, {
          headers: {
            "Set-Cookie": await sessionStorage.destroySession(session),
          },
        });
      }
    }
    return null;
  }
  return response.data;
}

export async function requireGuest({ request }: { request: Request }) {
  if (await user({ request })) {
    throw redirect("/");
  }
}

export async function requireAuth({ request }: { request: Request }) {
  let token = await currentToken({ request });

  if (!token) {
    throw redirect("/login");
  }
}

export async function requireAdmin({ request }: { request: Request }) {
  let userData = await user({ request });

  if (!(userData as User)?.is_admin) {
    throw redirect("/login");
  }
}

export async function resetPassword({
  token,
  email,
  password,
  passwordConfirmation,
}: {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}) {
  try {
    await axios.post("/reset-password", {
      token,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  } catch (error: any) {
    return { errors: Object.values(error?.response?.data?.errors).flat() };
  }

  return {
    redirector: redirect("/login"),
  };
}

export async function sendPasswordLink({ email }: { email: string }) {
  try {
    await axios.post("/forgot-password", { email });
  } catch (error: any) {
    return { errors: Object.values(error?.response?.data?.errors).flat() };
  }
}

export let redirectToCookie = createCookie("redirect-to", {
  path: "/",
  httpOnly: true,
  sameSite: "lax",
  maxAge: 60, // 1 minute because it makes no sense to keep it for a long time
  secure: environment().NODE_ENV === "production",
});
