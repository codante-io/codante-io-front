import { abort404 } from "~/lib/utils/responses.server";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/features/error-handling/not-found";
import { Error500 } from "~/components/features/error-handling/500";
import { registerLead } from "~/lib/models/lead.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  const email = formData.get("email") as string;
  // const tag = formData.get("tag") as string | undefined;

  switch (intent) {
    case "register-lead":
      return registerLead(request, email);
  }
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

export default function Leads() {
  return null;
}
