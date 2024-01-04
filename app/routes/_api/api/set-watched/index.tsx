import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import { setCompleted } from "~/lib/models/lesson.server";
import { abort404 } from "~/lib/utils/responses.server";

export async function action({ request }: { request: any }) {
  // const lessonId = params.lessonId;

  const formData = await request.formData();
  const lessonId = formData.get("lessonId") as string;
  const markCompleted = formData.get("markCompleted") as string;

  if (markCompleted === "true") {
    await setCompleted(lessonId, request);
  }

  if (markCompleted === "false") {
    await setCompleted(lessonId, request, false);
  }

  return null;
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
