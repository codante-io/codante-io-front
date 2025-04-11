import type { TypedResponse } from "react-router";
import {
  createCookie,
  createCookieSessionStorage,
  redirect,
} from "react-router";
import type { AxiosResponse } from "axios";
import type { User } from "~/lib/models/user.server";
import { environment } from "~/lib/models/environment";
import { createAxios } from "~/lib/services/axios.server";

export const sessionStorage = createCookieSessionStorage({
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

export const { getSession, commitSession, destroySession } = sessionStorage;

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
  const axios = await createAxios(request);
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
  const session = await sessionStorage.getSession(request.headers.get("Cookie"));
  const axios = await createAxios(request);

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

  const user = session.get("user");

  if (!user?.token) return redirect(redirectTo);
  const axios = await createAxios(request);

  await axios.post("/logout");

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
  const axios = await createAxios(request);

  const session = await sessionStorage.getSession(
    request.headers.get("Cookie"),
  );

  const user = session.get("user");

  if (!user?.token) return redirect(`/login?redirectTo=${redirectTo}`);

  await axios.post("/logout");

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
    return token as string;
  }
}

export async function user({
  request,
  params,
}: {
  request: Request;
  params?: any;
}): Promise<User | null | TypedResponse<User>> {
  let response;
  const axios = await createAxios(request);

  try {
    response = await axios.get<User>("/user");
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
  const token = await currentToken({ request });

  if (!token) {
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
  const axios = await createAxios();

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
  const axios = await createAxios();

  try {
    await axios.post("/forgot-password", { email });
  } catch (error: any) {
    return { errors: Object.values(error?.response?.data?.errors).flat() };
  }
}

export const redirectToCookie = createCookie("redirect-to", {
  path: "/",
  httpOnly: true,
  sameSite: "lax",
  maxAge: 60, // 1 minute because it makes no sense to keep it for a long time
  secure: environment().NODE_ENV === "production",
});
