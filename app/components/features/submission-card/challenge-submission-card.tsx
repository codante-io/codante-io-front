import UserAvatar from "~/components/ui/user-avatar";
import type { UserAvatar as UserAvatarType } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import {
  SubmissionCard,
  SubmissionCardFooter,
  SubmissionCardImage,
} from "./submission-card-v2";
import { Link } from "@remix-run/react";

type ChallengeSubmissionCardProps = {
  submissionImageUrl: string;
  avatar: UserAvatarType;
  challengeSlug?: string;
  isSolution?: boolean;
};

export default function ChallengeSubmissionCard({
  submissionImageUrl,
  isSolution = false,
  avatar,
  challengeSlug,
}: ChallengeSubmissionCardProps) {
  const submissionUrl = `/mini-projetos/${challengeSlug}/submissoes/${avatar.github_user}`;
  return (
    <SubmissionCard size="full">
      <Link to={submissionUrl}>
        <SubmissionCardImage imageUrl={submissionImageUrl} />
      </Link>
      <SubmissionCardFooter>
        <ChallengeSubmissionCardFooter
          isSolution={isSolution}
          avatar={avatar}
        />
      </SubmissionCardFooter>
    </SubmissionCard>
  );
}

function ChallengeSubmissionCardFooter({
  avatar,
  isSolution,
}: {
  avatar: UserAvatarType;
  isSolution: boolean;
}) {
  return (
    <footer className="flex items-center gap-3 ">
      <UserAvatar avatar={avatar} className="w-10 h-10" />
      <div className="w-full flex-1">
        {isSolution ? (
          <span className="text-brand-500 text-xs">
            Resolução <b>oficial</b> de
          </span>
        ) : (
          <p className="text-xs dark:text-gray-400">Resolução de</p>
        )}

        <h3 className=" line-clamp-1" title={formatName(avatar.name)}>
          {formatName(avatar.name)}
        </h3>
      </div>
    </footer>
  );
}
