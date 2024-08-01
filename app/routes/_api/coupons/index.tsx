import { react } from "~/lib/models/reactions.server";
import type { AllowedReaction } from "~/lib/models/reactions.server";
import { abort404 } from "~/lib/utils/responses.server";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/features/error-handling/not-found";
import { Error500 } from "~/components/features/error-handling/500";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const reactableType = formData.get("reactableType");
  const reactableId = formData.get("reactableId");
  const reaction = formData.get("reaction");

  return react(
    request,
    reactableId as string,
    reactableType as string,
    reaction as AllowedReaction,
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
