import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useOutletContext } from "@remix-run/react";
import { redirect } from "react-router";
import {
  getChallenge,
  type ChallengeCardInfo,
} from "~/models/challenge.server";

export async function loader({ request }: LoaderArgs) {
  // get pathname
  const url = new URL(request.url);
  const pathname = url.pathname;

  if (pathname.endsWith("/resolucao") || pathname.endsWith("/resolucao/")) {
    const challenge = await getChallenge(pathname.split("/")[2], request);
    if (
      !challenge ||
      !challenge.workshop ||
      challenge.workshop.status !== "published"
    ) {
      return redirect("em-breve");
    }
    return redirect(challenge.workshop?.lessons[0].slug);
  }

  return null;
}

export default function Resolution() {
  const context = useOutletContext<{ challenge: ChallengeCardInfo }>();
  const challenge = context?.challenge;

  return <Outlet context={{ challenge }} />;
}
