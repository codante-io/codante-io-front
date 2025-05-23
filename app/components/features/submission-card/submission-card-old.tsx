import { useNavigate, useOutletContext } from "react-router";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import ReactionsButton from "~/components/features/reactions/reactions-button";
import Chip from "~/components/ui/chip";
import TooltipWrapper from "~/components/ui/tooltip";
import UserAvatar from "~/components/ui/user-avatar";
import type {
  UserAvatar as UserAvatarType,
  ChallengeUser,
  User,
} from "~/lib/models/user.server";
import classNames from "~/lib/utils/class-names";
import { formatName } from "~/lib/utils/format-name";

type RequiredChallengeUserProps = {
  avatar: UserAvatarType;
  id: number;
  user: User;
};

export default function SubmissionCard({
  challengeUser,
  size = "large",
  showEditForm,
  isEditing,
  challengeSlug,
  showReactions = true,
  className,
  isHomePage = false,
  footerPadding = "px-4 py-4",
  listed = true,
}: {
  footerPadding?: string;
  showReactions?: boolean;
  isEditing?: boolean;
  challengeUser: RequiredChallengeUserProps & Partial<ChallengeUser>;
  size?: "medium" | "large" | "small";
  showEditForm?: () => void;
  challengeSlug?: string;
  className?: string;
  isHomePage?: boolean;
  listed: boolean;
}) {
  const { user } = useOutletContext<{ user: User }>();
  const [editSubmition, setEditSubmition] = useState(false);

  function handleEditSubmition() {
    if (showEditForm) {
      showEditForm();
      setEditSubmition(!editSubmition);
    }
  }
  const navigate = useNavigate();
  return (
    <article
      className={classNames(
        "relative overflow-hidden rounded-xl border-[1.5px] shadow-2xs text-gray-800 dark:text-white transition-shadow",
        size === "medium" && "max-w-[377px]",
        !listed && (!user || user.id !== challengeUser.user.id) && "hidden",
        challengeUser.is_solution
          ? "border-brand-500"
          : "dark:border-background-600 border-background-200",
        size === "small" && "max-w-[275px]",
        className,
      )}
    >
      <a
        className="overflow-hidden group relative"
        onClick={(event) => {
          if (!challengeUser.is_solution) return;
          event.preventDefault();
          navigate(`/mini-projetos/${challengeSlug}/codigo`);
        }}
        href={`/mini-projetos/${challengeSlug}/submissoes/${challengeUser.user?.github_user}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={classNames(listed ? "hover:opacity-80" : "opacity-30")}>
          <img
            src={challengeUser.submission_image_url}
            alt="Screenshot da aplicação submetida"
            className={classNames(
              "w-full transition-all delay-75 aspect-video",
              isHomePage
                ? "opacity-40 md:blur-xs lg:group-hover:blur-none group-hover:opacity-100"
                : "",
            )}
          />
        </div>
        {!listed && <Chip text="Não listado" type="unlisted" />}
      </a>

      <footer
        className={classNames(
          footerPadding,
          "flex items-center justify-between gap-4 dark:bg-background-700",
        )}
      >
        <div className="w-10 h-10 flex-none">
          <UserAvatar
            avatar={challengeUser.avatar}
            className="w-10 h-10 shrink-0"
          />
        </div>
        <div className="w-full">
          <h4 className="text-xs dark:text-gray-400 font-regular">
            {challengeUser.is_solution ? (
              <span className="text-brand-500">
                Resolução <b>oficial</b> de
              </span>
            ) : (
              <span>Resolução de</span>
            )}
          </h4>
          <h3
            className="font-semibold line-clamp-1 text-gray-700 dark:text-white"
            title={formatName(challengeUser.avatar.name)}
          >
            {formatName(challengeUser.avatar.name)}
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
          {showReactions && challengeUser.reactions && (
            <ReactionsButton
              reactions={challengeUser.reactions}
              reactableId={challengeUser.id}
              reactableType="ChallengeUser"
            />
          )}
        </div>
      </footer>
    </article>
  );
}
