import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";

export default function WorkshopLayout() {
  return <Outlet />;
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

  return <Error500 />;
}
