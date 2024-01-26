import { Form, useFetcher, useOutletContext } from "@remix-run/react";
import { useRef } from "react";
import type { Comment } from "~/lib/models/comments.server";
import type { User } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import UserAvatar from "~/components/ui/user-avatar";
import { FiSend } from "react-icons/fi";

export default function CommentSection({
  comments,
  commentableId,
}: {
  comments: Comment[];
  commentableId: number;
}) {
  const { user } = useOutletContext<{
    user: User;
  }>();
  const fetcher = useFetcher();
  const commentRef = useRef<HTMLTextAreaElement>(null);

  function handleCommentButton(event: React.MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    const comment = commentRef.current?.value;
    if (comment) {
      fetcher.submit(
        { intent: "comment", commentableId, comment },
        { method: "post" },
      );
    }
  }

  return (
    <section className="text-start">
      <h1 className="text-gray-200 mt-10 mb-6 text-lg">Comentários</h1>
      <main className="flex flex-col gap-2">
        {comments
          .filter((comment) => !comment.replying_to)
          .map((comment) => (
            <div
              className="border p-2 border-background-700 rounded-lg flex items-center gap-2"
              key={comment.id}
            >
              <UserAvatar avatar={comment.user.avatar} className="w-10 m-2" />
              <div className="flex flex-col">
                <span className="text-gray-500 text-base">
                  {formatName(comment.user.name)}
                </span>
                <p className="text-gray-300 text-sm">{comment.comment}</p>
              </div>
            </div>
          ))}
      </main>

      <Form className="mt-6">
        <div className="flex h-16 items-center bg-background-800 rounded-lg border-background-700">
          <UserAvatar avatar={user.avatar} className="w-10 m-2" />
          <textarea
            name="comment"
            className="focus:ring-0 resize-none flex-grow border-none h-10 bg-background-800 rounded-lg border-background-700"
            placeholder="Digite um comentário..."
            ref={commentRef}
          />
          <button
            type="submit"
            name="intent"
            value="comment"
            onClick={(event) => handleCommentButton(event)}
            className="m-2"
          >
            <FiSend className="text-brand-500 hover:opacity-70 text-xl" />
          </button>
        </div>
      </Form>
    </section>
  );
}
