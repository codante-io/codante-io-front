import type { LoaderFunctionArgs } from "react-router";
import { getUserProfile } from "~/lib/models/user.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const githubUser = url.searchParams.get("github_user");

  if (!githubUser) {
    return Response.json(null, { status: 400 });
  }

  const profile = await getUserProfile(githubUser);

  if (!profile) {
    return Response.json(null, { status: 404 });
  }

  return Response.json(profile, {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
