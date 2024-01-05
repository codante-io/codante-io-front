import {
  logout,
  logoutWithRedirectAfterLogin,
} from "~/lib/services/auth.server";

export async function loader({ request }: { request: Request }) {
  const redirectTo = new URL(request.url).searchParams.get("redirectTo");

  return logoutWithRedirectAfterLogin({
    request,
    redirectTo: redirectTo || "/",
  });
}

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let redirectTo = (formData.get("redirectTo") as string) || "/";
  return logout({ request, redirectTo });
}
