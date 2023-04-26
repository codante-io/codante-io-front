import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/not-found";

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

  return (
    <div>
      <h1>Ops...</h1>
      <p>Something went wrong.</p>
    </div>
  );
}
