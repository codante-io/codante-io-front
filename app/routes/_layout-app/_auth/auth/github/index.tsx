import type { ActionFunctionArgs } from "@remix-run/node";
import { redirectToCookie } from "~/services/auth.server";
import { authenticator } from "~/services/github-auth.server";

export async function loader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") as string | null;

  try {
    return await authenticator.authenticate("github", request, {
      successRedirect: redirectTo ?? "/conta",
      failureRedirect: "/",
    });
  } catch (error) {
    if (!redirectTo) throw error;
    if (error instanceof Response && isRedirect(error)) {
      error.headers.append(
        "Set-Cookie",
        await redirectToCookie.serialize(redirectTo),
      );
      return error;
    }
    throw error;
  }
}

function isRedirect(response: Response) {
  if (response.status < 300 || response.status >= 400) return false;
  return response.headers.has("Location");
}
