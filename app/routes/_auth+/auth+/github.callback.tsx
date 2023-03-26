import type { LoaderArgs } from "@remix-run/node";
import { authenticator } from "~/services/github-auth.server";


export async function loader({ request }: LoaderArgs) {
  console.log(request)
  return authenticator.authenticate("github", request, {
    successRedirect: "/",
    failureRedirect: "/failure",


  });

};