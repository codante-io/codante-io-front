import { useState } from "react";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import ReactionsButton from "~/components/reactions-button";
import TooltipWrapper from "~/components/tooltip";
import UserAvatar from "~/components/user-avatar";
import type { Reactions } from "~/models/reactions.server";
import classNames from "~/utils/class-names";

type Submission = {
  submission_url: string;
  fork_url: string;
  submission_image_url: string;
  id: string;
};

type SubmissionUser = {
  is_pro: boolean;
  avatar_url?: string;
  name: string;
};

export default function SubmissionCard({
  submission,
  user,
  reactions,
  size = "large",
  showEditForm,
  isEditing,
  showReactions = true,
  className,
  isHomePage = false,
}: {
  showReactions?: boolean;
  isEditing?: boolean;
  submission: Submission;
  user: SubmissionUser;
  reactions?: Reactions;
  size?: "medium" | "large";
  showEditForm?: () => void;
  className?: string;
  isHomePage?: boolean;
}) {
  const [editSubmition, setEditSubmition] = useState(false);

  function handleEditSubmition() {
    if (showEditForm) {
      showEditForm();
      setEditSubmition(!editSubmition);
    }
  }
  function formatName(name: string) {
    return name
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  return (
    <article
      className={classNames(
        "relative overflow-hidden rounded-xl border-[1.5px] dark:border-background-600 border-background-200 shadow-sm text-gray-800 dark:text-white transition-shadow",
        size === "medium" && "max-w-[377px]",
        className,
      )}
    >
      <section className="relative overflow-hidden group">
        <button
          className={classNames(
            size === "medium"
              ? "md:w-14 md:h-14 md:right-32"
              : "md:w-28 md:h-24 md:right-44",
            "absolute inset-0 z-10 flex items-center justify-center w-20 h-16 p-6 m-auto transition-all right-32 shadow-lg opacity-100 md:p-4 bg-background-100 rounded-xl dark:bg-background-700 md:opacity-0 md:group-hover:opacity-100",
          )}
          onClick={() => window.open(submission.submission_url, "_blank")}
        >
          <BsGlobe className="text-4xl text-gray-800 dark:text-white" />{" "}
        </button>
        <button
          className={classNames(
            size === "medium"
              ? "md:w-14 md:h-14 md:left-32"
              : "md:w-28 md:h-24 md:left-44",
            "absolute inset-0 left-32 z-10 flex items-center justify-center w-20 h-16 p-6 m-auto transition-all shadow-lg opacity-100 md:w-14 md:h-14 md:p-4 bg-background-100 rounded-xl dark:bg-background-700 md:opacity-0 md:group-hover:opacity-100",
          )}
          onClick={() => window.open(submission.fork_url, "_blank")}
        >
          <BsGithub className="text-4xl text-gray-800 dark:text-white" />{" "}
        </button>
        <img
          src={submission.submission_image_url}
          alt="Screenshot da aplicação submetida"
          className={classNames(
            "w-full transition-all delay-75 aspect-video",
            isHomePage
              ? "opacity-40 blur-sm group-hover:blur-none group-hover:opacity-100"
              : "opacity-40 blur-xs md:blur-none md:group-hover:blur-sm md:opacity-100 md:group-hover:opacity-40",
          )}
        />
      </section>

      <footer className="flex items-center justify-between gap-4 px-4 py-4 dark:bg-background-700">
        <div className="w-10 h-10 flex-none">
          <UserAvatar
            isPro={user.is_pro}
            avatarUrl={user.avatar_url}
            className="w-10 h-10 flex-shrink-0"
          />
        </div>
        <div className="w-full">
          <h4 className="text-xs dark:text-gray-400 font-regular">
            Resolução de
          </h4>
          <h3
            className="font-semibold line-clamp-1"
            title={formatName(user.name)}
          >
            {formatName(user.name)}
          </h3>
        </div>
        <div className="flex items-center gap-x-4">
          {showEditForm && (
            <TooltipWrapper text="Editar" side="bottom">
              <FiEdit
                onClick={handleEditSubmition}
                className={`w-4 h-4 font-thin transition-all hover:text-brand-500 hover:scale-110 ${
                  isEditing
                    ? "text-brand-500 scale-110"
                    : "text-current scale-100"
                }`}
              />
            </TooltipWrapper>
          )}
          {showReactions && reactions && (
            <ReactionsButton
              reactions={reactions}
              reactableId={submission.id}
              reactableType="ChallengeUser"
            />
          )}
        </div>
      </footer>
    </article>
  );
}
