import { Outlet, isRouteErrorResponse, useRouteError } from "react-router";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import Navbar from "~/components/_layouts/navbar";
import { useUserFromOutletContext } from "~/lib/hooks/useUserFromOutletContext";

export default function ChallengeLayout() {
  const user = useUserFromOutletContext();
  return (
    <div className="bg-background-900">
      <Outlet context={{ user }} />
    </div>
  );
}

export function ErrorBoundary() {
  const user = useUserFromOutletContext();
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Navbar user={user} />
        <div className="min-h-screen">
          <NotFound />
        </div>
      </>
    );
  }

  return <Error500 error={error} />;
}
