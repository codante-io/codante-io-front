import { abort404 } from "~/lib/utils/responses.server";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/features/error-handling/not-found";
import { Error500 } from "~/components/features/error-handling/500";
import {
  createComment,
  deleteComment,
  updateComment,
} from "~/lib/models/comments.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  const commentId = formData.get("commentId") as string;
  const commentableId = formData.get("commentableId") as string;
  const comment = formData.get("comment") as string;
  const replyingTo = formData.get("replyingTo") as string | null;
  const editId = formData.get("commentId") as string;
  const editComment = formData.get("comment") as string;

  switch (intent) {
    case "comment":
      return createComment(
        request,
        commentableId,
        "ChallengeUser",
        comment,
        replyingTo,
      );
    case "delete-comment":
      return deleteComment(request, commentId);
    case "edit-comment":
      return updateComment(request, editId, editComment);
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

export default function Comments() {
  return null;
}
