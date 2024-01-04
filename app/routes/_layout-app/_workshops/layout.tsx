import {
  Outlet,
  isRouteErrorResponse,
  useOutletContext,
  useRouteError,
} from "@remix-run/react";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import type { User } from "~/lib/models/user.server";

export default function WorkshopLayout() {
  const { user } = useOutletContext<{ user: User | null }>();
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
