import { createCookie, type LoaderArgs } from "@remix-run/node";
import { redirectToCookie } from "~/services/auth.server";
import { authenticator } from "~/services/github-auth.server";

export async function loader({ request }: LoaderArgs) {
  let redirectTo =
    (await redirectToCookie.parse(request.headers.get("Cookie"))) ?? "/";

  return authenticator.authenticate("github", request, {
    successRedirect: redirectTo,
    failureRedirect: "/login",
  });
}
