import UserAvatar from "~/components/ui/user-avatar";
import type { UserAvatar as UserAvatarType } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import {
  SubmissionCard,
  SubmissionCardFooter,
  SubmissionCardImage,
} from "./submission-card";
import { Link } from "@remix-run/react";
import type { Reactions } from "~/lib/models/reactions.server";
import ReactionsButton from "../reactions/reactions-button";

type ChallengeSubmissionCardProps = {
  submissionImageUrl: string;
  avatar: UserAvatarType;
  challengeSlug?: string;
  reactions?: Reactions;
  challengeUserId: number;
  isSolution?: boolean;
};

export default function ChallengeSubmissionCard({
  submissionImageUrl,
  isSolution = false,
  avatar,
  reactions,
  challengeUserId,
  challengeSlug,
}: ChallengeSubmissionCardProps) {
  const submissionUrl = `/mini-projetos/${challengeSlug}/submissoes/${avatar.github_user}`;
  return (
    <SubmissionCard
      size="full"
      className="transition-colors dark:hover:border-brand hover:border-brand"
    >
      <Link to={submissionUrl} className="bg-black hover:bg-opacity-25">
        <SubmissionCardImage imageUrl={submissionImageUrl} />
      </Link>
      <SubmissionCardFooter>
        <ChallengeSubmissionCardFooter
          isSolution={isSolution}
          avatar={avatar}
          reactions={reactions}
          challengeUserId={challengeUserId}
        />
      </SubmissionCardFooter>
    </SubmissionCard>
  );
}

function ChallengeSubmissionCardFooter({
  avatar,
  isSolution,
  reactions,
  challengeUserId,
}: {
  avatar: UserAvatarType;
  isSolution: boolean;
  reactions?: Reactions;
  challengeUserId: number;
}) {
  return (
    <footer className="flex items-center justify-between gap-2 ">
      <div className="flex items-center gap-2">
        <UserAvatar avatar={avatar} className="w-10 h-10" />
        <UserFooterText isSolution={isSolution} userName={avatar.name} />
      </div>
      <ReactionsButton
        reactions={reactions!}
        reactableId={challengeUserId}
        reactableType="ChallengeUser"
      />
    </footer>
  );
}

function UserFooterText({
  isSolution,
  userName,
}: {
  isSolution: boolean;
  userName: string;
}) {
  return (
    <div className="flex-1 w-full text-xs ">
      {isSolution ? (
        <span className="text-xs text-brand-500">
          Resolução <b>oficial</b> de
        </span>
      ) : (
        <span className="text-xs dark:text-gray-400">Resolução de</span>
      )}

      <h3 className="text-base line-clamp-1" title={formatName(userName)}>
        {formatName(userName)}
      </h3>
    </div>
  );
}
