import { CodeBracketIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "@remix-run/react";
import React, { useState } from "react";
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
  is_solution?: boolean;
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
  challengeSlug,
}: {
  isEditing?: boolean;
  submission: Submission;
  user: SubmissionUser;
  reactions: Reactions;
  size?: "medium" | "large";
  showEditForm?: () => void;
  challengeSlug?: string;
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
        "relative overflow-hidden rounded-xl border-[1.5px] shadow-sm text-gray-800 dark:text-white transition-shadow",
        size === "medium" && "max-w-[377px]",
        submission.is_solution
          ? "border-amber-400"
          : "dark:border-background-600 border-background-200",
      )}
    >
      <section className="relative overflow-hidden group">
        <SubmissionButton
          href={submission.submission_url}
          size={size}
          position="right"
        >
          <BsGlobe className="text-4xl text-gray-800 dark:text-white" />
        </SubmissionButton>
        {submission.is_solution ? (
          <SubmissionButton
            link={`/mini-projetos/${challengeSlug}/resolucao/codigo`}
            size={size}
            position="left"
          >
            <CodeBracketIcon className="w-10 text-gray-800 dark:text-white" />
          </SubmissionButton>
        ) : (
          <SubmissionButton
            href={submission.fork_url}
            size={size}
            position="left"
          >
            <BsGithub className="text-4xl text-gray-800 dark:text-white" />
          </SubmissionButton>
        )}
        <img
          src={submission.submission_image_url}
          alt="Screenshot da aplicação submetida"
          className="w-full transition-all delay-75 opacity-40 aspect-video blur-xs md:blur-none md:group-hover:blur-sm md:opacity-100 md:group-hover:opacity-40"
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
            {submission.is_solution ? (
              <span className="text-amber-400">
                Resolução <b className="text-amber-400">oficial</b> de
              </span>
            ) : (
              <span>Resolução de</span>
            )}
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
          <ReactionsButton
            reactions={reactions}
            reactableId={submission.id}
            reactableType="ChallengeUser"
          />
        </div>
      </footer>
    </article>
  );
}

function SubmissionButton({
  size,
  href,
  children,
  position,
  link,
}: {
  size: "medium" | "large";
  href?: string;
  link?: string;
  children: React.ReactNode;
  position: "left" | "right";
}) {
  const navigate = useNavigate();

  function handleRedirect() {
    if (href) window.open(href, "_blank");
    if (link) navigate(link);
  }

  return (
    <button
      className={classNames(
        size === "medium"
          ? `md:w-14 md:h-14 md:${position}-32`
          : `md:w-28 md:h-24 md:${position}-44`,
        `absolute inset-0 ${position}-32 z-10 flex items-center justify-center w-20 h-16 p-6 m-auto transition-all shadow-lg opacity-100 md:w-14 md:h-14 md:p-4 bg-background-100 rounded-xl dark:bg-background-700 md:opacity-0 md:group-hover:opacity-100`,
      )}
      onClick={handleRedirect}
    >
      {children}
    </button>
  );
}
