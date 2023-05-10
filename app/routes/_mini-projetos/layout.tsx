import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";
import { useUserFromOutletContext } from "~/hooks/useUserFromOutletContext";

export default function ChallengeLayout() {
  const user = useUserFromOutletContext();
  return <Outlet context={{ user }} />;
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
