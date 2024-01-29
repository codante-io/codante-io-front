import {
  Form,
  useFetcher,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { Fragment, useEffect, useRef, useState } from "react";
import type { Comment } from "~/lib/models/comments.server";
import type { User } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import UserAvatar from "~/components/ui/user-avatar";
import { FiSend } from "react-icons/fi";
import { NewButton, buttonVariants } from "~/components/ui/new-button";
import { Dialog, Transition } from "@headlessui/react";

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
  // console.log(comments[0].user.avatar);
  const navigate = useNavigate();
  return (
    <section className="text-start">
      <h1 className="text-gray-200 mt-10 mb-6 text-lg">Comentários</h1>
      <main className="flex flex-col gap-2">
        {comments
          .filter((comment) => !comment.replying_to)
          .map((comment) => (
            <CommentCard
              comment={comment}
              replies={comments.filter(
                (reply) => reply.replying_to === comment.id,
              )}
              key={comment.id}
            />
          ))}
      </main>

      {user ? (
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
      ) : (
        <div className="mt-6">
          <NewButton
            onClick={() => navigate("/login?redirectTo=/assine")}
            className={buttonVariants({ variant: "outline" })}
          >
            Faça login para comentar
          </NewButton>
        </div>
      )}
    </section>
  );
}

function CommentCard({
  comment,
  replies,
}: {
  comment: Comment;
  replies: Comment[];
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    commentId: string | null;
  }>({
    isOpen: false,
    commentId: null,
  });
  const { user } = useOutletContext<{
    user: User;
  }>();
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    if (showReplyInput && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [showReplyInput]);

  function replyComment(event: React.MouseEvent<HTMLButtonElement>) {
    event?.preventDefault();
    const inputedComment = replyInputRef.current?.value;
    if (inputedComment) {
      fetcher.submit(
        {
          intent: "comment",
          commentableId: comment.commentable_id,
          comment: inputedComment,
          replyingTo: comment.id,
        },
        { method: "post" },
      );
      setShowReplyInput(false);
    }
  }

  function handleDelete() {
    fetcher.submit(
      {
        intent: "delete-comment",
        commentId: deleteModal.commentId,
      },
      { method: "delete" },
    );
    setDeleteModal({ ...deleteModal, isOpen: false });
  }

  return (
    <main className="border p-2 border-background-700 rounded-lg shadow-lg">
      <div>
        <section className="flex items-center gap-2">
          <div className="flex-shrink-0">
            <UserAvatar avatar={comment.user.avatar} className="w-10 m-2" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-gray-500 text-base">
              {formatName(comment.user.name)}
            </span>
            <p className="text-gray-300 text-sm">{comment.comment}</p>
          </div>
        </section>
        <section className="text-xs text-brand-500 flex gap-2 ml-16">
          {user && (
            <button
              className="hover:opacity-70"
              onClick={() => setShowReplyInput(true)}
            >
              Responder
            </button>
          )}
          {user.id === comment.user.id && (
            <button className="hover:opacity-70">Editar</button>
          )}
          {user.id === comment.user.id && (
            <button
              onClick={() =>
                setDeleteModal({ isOpen: true, commentId: comment.id })
              }
              className="hover:text-red-500"
            >
              Deletar
            </button>
          )}
        </section>
      </div>

      {/* Replies */}
      {replies.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 ml-8 sm:ml-16">
          {replies.map((reply) => (
            <div key={reply.id}>
              <section className="flex items-center gap-2">
                <div className="flex-shrink-0">
                  <UserAvatar avatar={reply.user.avatar} className="w-8 m-2" />
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-sm">
                    {formatName(reply.user.name)}
                  </span>
                  <p className="text-gray-300 text-sm">{reply.comment}</p>
                </div>
              </section>
              <section className="text-xs text-brand-500 flex gap-2 ml-14">
                {user && (
                  <button
                    onClick={() => setShowReplyInput(true)}
                    className="hover:opacity-70"
                  >
                    Responder
                  </button>
                )}
                {user.id === reply.user.id && (
                  <button className="hover:opacity-70">Editar</button>
                )}
                {user.id === reply.user.id && (
                  <button
                    className="hover:text-red-500"
                    onClick={() =>
                      setDeleteModal({ isOpen: true, commentId: reply.id })
                    }
                  >
                    Deletar
                  </button>
                )}
              </section>
            </div>
          ))}
        </div>
      )}
      {showReplyInput && (
        <Form className="mt-6 mx-2">
          <div className="flex h-16 items-center bg-background-800 rounded-lg border-background-700">
            <UserAvatar avatar={user.avatar} className="w-8 m-4" />
            <textarea
              name="comment"
              className="focus:ring-0 resize-none flex-grow border-none h-10 bg-background-800 rounded-lg border-background-700 text-base"
              placeholder="Digite uma resposta..."
              ref={replyInputRef}
              defaultValue=""
            />
            <button
              type="submit"
              name="intent"
              value="reply-comment"
              onClick={(event) => replyComment(event)}
              className="m-2"
            >
              <FiSend className="text-brand-500 hover:opacity-70 text-xl" />
            </button>
          </div>
        </Form>
      )}

      {/* Delete Modal */}
      <Transition appear show={deleteModal.isOpen}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setDeleteModal({ ...deleteModal, isOpen: false })}
        >
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-background-100 dark:bg-background-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 mb-6"
                  >
                    Deletar comentário
                  </Dialog.Title>
                  <div className="mt-2">
                    <Form method="PUT">
                      <div>
                        <h1 className="block text-sm leading-6 text-gray-800 dark:text-white">
                          Ao confirmar, todas as respostas feitas a este
                          comentário também serão deletadas.
                        </h1>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md"></div>
                        </div>
                      </div>
                      <div className="mt-8 flex gap-x-3">
                        <NewButton
                          type="button"
                          variant={"destructive"}
                          onClick={handleDelete}
                        >
                          Deletar
                        </NewButton>
                        <NewButton
                          type="button"
                          variant={"outline-ghost"}
                          onClick={() =>
                            setDeleteModal({ ...deleteModal, isOpen: false })
                          }
                        >
                          Cancelar
                        </NewButton>
                      </div>
                    </Form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}
