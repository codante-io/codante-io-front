import { useFetcher, useNavigate, useOutletContext } from "react-router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import type { Comment } from "~/lib/models/comments.server";
import type { User } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import UserAvatar from "~/components/ui/user-avatar";
import { FiSend } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { useOnClickOutside } from "~/lib/hooks/useOnClickOutside";
import { Card } from "~/components/ui/cards/card";
import TitleIcon from "~/components/ui/title-icon";
import TextareaAutosize from "react-textarea-autosize";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import toast from "react-hot-toast";
import { Button, buttonVariants } from "~/components/ui/button";

export default function CommentSection({
  comments,
  commentableId,
  redirectTo,
  commentableType,
}: {
  comments: Comment[];
  commentableId: string | number;
  redirectTo: string;
  commentableType: "ChallengeUser" | "Lesson";
}) {
  const { user } = useOutletContext<{
    user: User;
  }>();
  const fetcher = useFetcher();
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const isSubmittingOrLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";
  const [toastId, setToastId] = useState<string | null>(null);

  useEffect(() => {
    if (isSubmittingOrLoading && toastId === null) {
      const id = toast.loading("Enviando comentário...");
      setToastId(id);
    } else if (!isSubmittingOrLoading && toastId !== null) {
      toast.dismiss(toastId);
      toast.success("Comentário enviado!");
      setToastId(null);
    }
  }, [isSubmittingOrLoading, toastId]);

  function handleCommentButton(event: React.MouseEvent | React.KeyboardEvent) {
    event?.preventDefault();
    const comment = commentRef.current?.value;

    if (!comment || comment.trim() === "") {
      return;
    }

    fetcher.submit(
      { intent: "comment", commentableId, comment, commentableType },
      {
        method: "post",
        action: "/comments?index",
      },
    );

    if (commentRef.current) commentRef.current.value = "";
  }

  const navigate = useNavigate();

  return (
    <section className="text-start">
      <section className="flex items-center gap-2 my-8">
        <TitleIcon className="w-5 h-5"></TitleIcon>
        <h3 className="text-2xl text-gray-700 dark:text-gray-50">
          Comentários
        </h3>
        <span className="text-lg self-end dark:text-gray-500 text-gray-400">{`(${comments?.length})`}</span>
      </section>
      <section className="flex flex-col gap-4">
        {comments?.length > 0 &&
          comments
            .filter((comment) => !comment.replying_to)
            .map((comment) => (
              <CommentCard
                comment={comment}
                replies={comments.filter(
                  (reply) => reply.replying_to === comment.id,
                )}
                key={comment.id}
                commentableType={commentableType}
              />
            ))}
      </section>

      {user ? (
        <CommentInput
          formClass=" mt-6"
          ref={commentRef}
          commentFunction={handleCommentButton}
          disabled={isSubmittingOrLoading}
        />
      ) : (
        <div className="mt-6">
          <Button
            onClick={() => navigate("/login?redirectTo=" + redirectTo)}
            className={buttonVariants({ variant: "outline" })}
          >
            Faça login para comentar
          </Button>
        </div>
      )}
    </section>
  );
}

function CommentCard({
  comment,
  replies,
  commentableType,
}: {
  comment: Comment;
  replies: Comment[];
  commentableType: "ChallengeUser" | "Lesson";
}) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditButtonDisabled, setIsEditButtonDisabled] = useState(false);
  const [editSettings, setEditSettings] = useState<{
    isEditing: boolean;
    commentId: string | null;
  }>({
    isEditing: false,
    commentId: null,
  });
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    commentId: string | null;
  }>({
    isOpen: false,
    commentId: null,
  });

  const [successMessage, setSuccessMessage] = useState("");
  const replyInputRef = useRef<HTMLTextAreaElement>(null);
  const editInputRef = useRef<HTMLTextAreaElement>(null);
  const fetcher = useFetcher();

  const [toastId, setToastId] = useState<string | null>(null);
  const isSubmittingOrLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  useEffect(() => {
    if (showReplyInput && replyInputRef.current) {
      replyInputRef.current.focus();
    }

    if (editSettings.isEditing) {
      const input = editInputRef.current;
      if (input) {
        input.focus();
        const inputLength = input.value.length;
        input.selectionStart = inputLength;
        input.selectionEnd = inputLength; // cursor no final do texto
        input.scrollTop = input.scrollHeight; // scroll para o final do texto
      }
    }

    if (isSubmittingOrLoading && toastId === null) {
      if (fetcher.formMethod === "PUT") {
        const id = toast.loading("Editando comentário...");
        setToastId(id);
        setSuccessMessage("Comentário editado!");
      } else if (fetcher.formMethod === "DELETE") {
        const id = toast.loading("Deletando comentário...");
        setToastId(id);
        setSuccessMessage("Comentário deletado!");
      } else {
        const id = toast.loading("Enviando comentário...");
        setToastId(id);
        setSuccessMessage("Comentário enviado!");
      }
    } else if (!isSubmittingOrLoading && toastId !== null) {
      toast.dismiss(toastId);
      toast.success(successMessage);
      setToastId(null);
    }
    return () => {
      // quando for DELETE e nao for uma resposta.
      if (
        toastId &&
        isSubmittingOrLoading &&
        fetcher.formMethod === "DELETE" &&
        !replies.find((reply) => reply.replying_to === comment.id)
      ) {
        toast.dismiss(toastId);
        toast.success("Comentário deletado!");
        setToastId(null);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    showReplyInput,
    editSettings.isEditing,
    isSubmittingOrLoading,
    toastId,
    fetcher.formMethod,
  ]);

  function replyComment(event: React.MouseEvent | React.KeyboardEvent) {
    event?.preventDefault();
    const inputedComment = replyInputRef.current?.value;
    if (inputedComment) {
      fetcher.submit(
        {
          intent: "comment",
          commentableId: comment.commentable_id,
          comment: inputedComment,
          replyingTo: comment.id,
          commentableType,
        },
        {
          method: "post",
          action: "/comments?index",
        },
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
      {
        method: "delete",
        action: "/comments?index",
      },
    );
    setDeleteModal({ ...deleteModal, isOpen: false });
  }

  function handleEditButton() {
    const inputedComment = editInputRef.current?.value;
    if (inputedComment) {
      fetcher.submit(
        {
          intent: "edit-comment",
          commentId: editSettings.commentId,
          comment: inputedComment,
        },
        {
          method: "put",
          action: "/comments?index",
        },
      );
      setEditSettings({ isEditing: false, commentId: null });
    }
  }

  function disableEditButton() {
    setIsEditButtonDisabled(!editInputRef.current?.value);
  }

  return (
    <Card
      id={`comment-${comment.id}`}
      className="px-6 py-8 dark:border-background-700 dark:bg-background-800  border-gray-300 rounded-lg shadow-2xs bg-white "
    >
      <div>
        <CommentInfo
          ref={editInputRef}
          comment={comment}
          editSettings={editSettings}
          setEditSettings={setEditSettings}
          disableEditButtonFunction={disableEditButton}
          handleEditButton={handleEditButton}
          editButtonIsDisabled={isEditButtonDisabled}
          setShowReplyInput={setShowReplyInput}
          setDeleteModal={setDeleteModal}
        />
      </div>

      {replies.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 sm:ml-16 border-l border-dotted border-gray-300 dark:border-gray-700 pl-4">
          {replies.map((reply) => (
            <div key={reply.id}>
              <CommentInfo
                ref={editInputRef}
                comment={reply}
                editSettings={editSettings}
                setEditSettings={setEditSettings}
                disableEditButtonFunction={disableEditButton}
                handleEditButton={handleEditButton}
                editButtonIsDisabled={isEditButtonDisabled}
                setShowReplyInput={setShowReplyInput}
                setDeleteModal={setDeleteModal}
                avatarSize="w-8 m-4"
              />
            </div>
          ))}
        </div>
      )}
      {showReplyInput && (
        <CommentInput
          disabled={isSubmittingOrLoading}
          formClass="mt-6 sm:ml-16"
          avatarSize="w-8 m-4"
          padding="px-6 py-2"
          ref={replyInputRef}
          commentFunction={replyComment}
          setShowReplyInput={setShowReplyInput}
        />
      )}
      <DeleteModal
        setDeleteModal={setDeleteModal}
        deleteModal={deleteModal}
        handleDelete={handleDelete}
      />
    </Card>
  );
}

const CommentInput = React.forwardRef<
  HTMLTextAreaElement,
  {
    commentFunction: (event: React.MouseEvent | React.KeyboardEvent) => void;
    formClass: string;
    avatarSize?: string;
    padding?: string;
    setShowReplyInput?: React.Dispatch<React.SetStateAction<boolean>>;
  } & React.ComponentPropsWithRef<typeof TextareaAutosize>
>(
  (
    {
      commentFunction,
      formClass,
      avatarSize = "w-10 m-2",
      padding = "px-6 py-4",
      setShowReplyInput,
      ...props
    },
    ref,
  ) => {
    const { user } = useOutletContext<{ user: User }>();
    const formRef = useRef<HTMLFormElement>(null);

    function handleClickOutside() {
      if (setShowReplyInput) setShowReplyInput(false);
    }

    useOnClickOutside(formRef, handleClickOutside);

    return (
      <form ref={formRef} className={`${formClass}`}>
        <Card
          hover="brand-light"
          className={`${padding} dark:border-background-700 border-gray-300 group dark:hover:border-background-600 dark:focus-within:border-background-600 focus-within:border-brand-300 flex items-center bg-background-50`}
        >
          {
            <div className="hidden sm:block self-start">
              <UserAvatar avatar={user.avatar} className={avatarSize} />
            </div>
          }
          <TextareaAutosize
            {...props}
            name="comment"
            className="focus:ring-0 resize-none text-sm sm:text-base grow border-none dark:bg-background-800 rounded-lg dark:border-background-700 bg-background-50"
            placeholder="Escreva um comentário..."
            title="Experimente utilizar markdown para formatar seu comentário."
            ref={ref}
            onKeyDown={(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (event.key === "Enter" && event.metaKey) {
                event.preventDefault();
                commentFunction(event);
              } else if (event.key === "Escape") {
                handleClickOutside();
              }
            }}
          />
          <Button
            variant="ghost"
            type="submit"
            name="intent"
            value="comment"
            onClick={(event) => commentFunction(event)}
            className="m-2 hover:opacity-70"
          >
            <FiSend className="text-brand-500  text-xl" />
          </Button>
        </Card>
      </form>
    );
  },
);

CommentInput.displayName = "CommentInput";

const CommentInfo = React.forwardRef<
  HTMLTextAreaElement,
  {
    comment: Comment;
    editSettings: {
      isEditing: boolean;
      commentId: string | null;
    };
    setEditSettings: (value: {
      isEditing: boolean;
      commentId: string | null;
    }) => void;
    disableEditButtonFunction: () => void;
    handleEditButton: () => void;
    editButtonIsDisabled: boolean;
    setShowReplyInput: (value: boolean) => void;
    setDeleteModal: (value: {
      isOpen: boolean;
      commentId: string | null;
    }) => void;
    avatarSize?: string;
  } // prop types
>(
  (
    {
      comment,
      editSettings,
      setEditSettings,
      disableEditButtonFunction,
      handleEditButton,
      editButtonIsDisabled,
      setShowReplyInput,
      setDeleteModal,
      avatarSize = "w-10 m-2",
    },
    ref,
  ) => {
    const { user } = useOutletContext<{ user: User }>();
    return (
      <section className="flex flex-col items-start h-fit">
        <div className="items-center gap-2 flex w-full">
          <div className="shrink-0">
            <UserAvatar avatar={comment.user.avatar} className={avatarSize} />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-gray-500 text-sm sm:text-base">
              {formatName(comment.user.name)}
            </span>
            <span className="text-xs sm:text-xs dark:text-gray-600 text-gray-400 mb-2">
              {comment.created_at_human}
            </span>
          </div>
        </div>
        <section className="w-full sm:pl-16 overflow-auto break-words">
          {editSettings.isEditing && editSettings.commentId === comment.id ? (
            <form method="PUT" className="w-full">
              <div className="mt-2 w-full">
                <TextareaAutosize
                  ref={ref}
                  name="edit-comment"
                  className="w-full h-full focus:ring-0 resize-none grow border-none dark:bg-background-800 rounded-lg dark:border-background-700 bg-background-50"
                  placeholder="Edite o comentário..."
                  defaultValue={comment.comment}
                  onInput={disableEditButtonFunction}
                  onKeyDown={(
                    event: React.KeyboardEvent<HTMLTextAreaElement>,
                  ) => {
                    if (event.key === "Enter" && event.metaKey) {
                      event.preventDefault();
                      handleEditButton();
                    } else if (event.key === "Escape") {
                      setEditSettings({
                        isEditing: false,
                        commentId: null,
                      });
                    }
                  }}
                />
              </div>
              <div className="mt-1 flex gap-x-3">
                <button
                  onClick={handleEditButton}
                  className="text-sm text-brand-500 hover:text-green-400 disabled:hover:opacity-50"
                  disabled={editButtonIsDisabled}
                >
                  Salvar
                </button>
                <button
                  onClick={() =>
                    setEditSettings({ isEditing: false, commentId: null })
                  }
                  className="text-sm text-brand-500 hover:opacity-70"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <MarkdownRenderer fontSize="small" markdown={comment.comment} />
          )}
        </section>
        {!(editSettings.isEditing && editSettings.commentId === comment.id) && (
          <section className="text-xs text-brand-500 flex gap-2 sm:ml-16 mt-1">
            {user && (
              <button
                className="hover:opacity-70"
                onClick={() => setShowReplyInput(true)}
              >
                Responder
              </button>
            )}
            {user && user.id === comment.user.id && (
              <button
                className="hover:opacity-70"
                onClick={() =>
                  setEditSettings({ isEditing: true, commentId: comment.id })
                }
              >
                Editar
              </button>
            )}
            {user && user.id === comment.user.id && (
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
        )}
      </section>
    );
  },
);

CommentInfo.displayName = "CommentInfo";

function DeleteModal({
  setDeleteModal,
  deleteModal,
  handleDelete,
}: {
  setDeleteModal: (value: {
    isOpen: boolean;
    commentId: string | null;
  }) => void;
  deleteModal: { isOpen: boolean; commentId: string | null };
  handleDelete: () => void;
}) {
  return (
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
                  <form method="PUT">
                    <div>
                      <h1 className="block text-sm leading-6 text-gray-800 dark:text-white">
                        Ao confirmar, todas as respostas feitas a este
                        comentário também serão deletadas.
                      </h1>
                      <div className="mt-2">
                        <div className="flex rounded-lg shadow-2xs ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md"></div>
                      </div>
                    </div>
                    <div className="mt-8 flex gap-x-3">
                      <Button
                        type="button"
                        variant={"destructive"}
                        onClick={handleDelete}
                      >
                        Deletar
                      </Button>
                      <Button
                        type="button"
                        variant={"outline-ghost"}
                        onClick={() =>
                          setDeleteModal({ ...deleteModal, isOpen: false })
                        }
                      >
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
