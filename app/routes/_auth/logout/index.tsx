import { logout, logoutWithRedirectAfterLogin } from "~/services/auth.server";

export async function loader({ request }: { request: Request }) {
  const redirectTo = new URL(request.url).searchParams.get("redirectTo");

  return logoutWithRedirectAfterLogin({
    request,
    redirectTo: redirectTo || "/login",
  });
}

export async function action({ request }: { request: Request }) {
  let formData = await request.formData();

  let redirectTo = (formData.get("redirectTo") as string) || "/login";
  return logout({ request, redirectTo });
}
