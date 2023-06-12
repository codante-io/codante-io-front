import { react } from "~/models/reactions.server";
import type { AllowedReaction } from "~/models/reactions.server";
import { abort404 } from "~/utils/responses.server";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/errors/not-found";
import { Error500 } from "~/components/errors/500";
import { currentToken, logout } from "~/services/auth.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const reactableType = formData.get("reactableType");
  const reactableId = formData.get("reactableId");
  const reaction = formData.get("reaction");
  const redirectTo = formData.get("redirectTo");
  let token = await currentToken({ request });

  //if user is not authenticated, redirect to login
  if (!token) {
    return logout({ request, redirectTo: `/login?redirectTo=${redirectTo}` });
  }

  return react(
    request,
    reactableId as string,
    reactableType as string,
    reaction as AllowedReaction
  );
}

export async function loader() {
  return abort404();
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return <Error500 error={error} />;
}

export default function Reactions() {
  return null;
}
