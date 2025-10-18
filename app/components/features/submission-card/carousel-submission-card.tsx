import UserAvatar from "~/components/ui/user-avatar";
import type { UserAvatar as UserAvatarType } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import {
  SubmissionCard,
  SubmissionCardFooter,
  SubmissionCardImage,
} from "./submission-card";
import { Link } from "react-router";

type CarouselSubmissionCardProps = {
  submissionImageUrl: string;
  avatar?: UserAvatarType | null;
  challengeSlug?: string;
  user?: {
    name?: string | null;
    github_user?: string | null;
    avatar_url?: string | null;
  };
};

export default function CarouselSubmissionCard({
  submissionImageUrl,
  avatar,
  challengeSlug,
  user,
}: CarouselSubmissionCardProps) {
  const safeAvatar: UserAvatarType = avatar ?? {
    badge: null,
    avatar_url: user?.avatar_url ?? "",
    name: user?.name ?? "Codante Member",
    github_user: user?.github_user ?? undefined,
  };

  const githubUser = safeAvatar.github_user ?? user?.github_user ?? undefined;
  const submissionUrl =
    challengeSlug && githubUser
      ? `/mini-projetos/${challengeSlug}/submissoes/${githubUser}`
      : challengeSlug
        ? `/mini-projetos/${challengeSlug}`
        : undefined;
  return (
    <SubmissionCard size="sm">
      {submissionUrl ? (
        <Link to={submissionUrl}>
          <BlurImageWrapper>
            <SubmissionCardImage imageUrl={submissionImageUrl} />
          </BlurImageWrapper>
        </Link>
      ) : (
        <BlurImageWrapper>
          <SubmissionCardImage imageUrl={submissionImageUrl} />
        </BlurImageWrapper>
      )}
      <SubmissionCardFooter>
        <CarouselSubmissionCardFooter avatar={safeAvatar} />
      </SubmissionCardFooter>
    </SubmissionCard>
  );
}

function CarouselSubmissionCardFooter({ avatar }: { avatar: UserAvatarType }) {
  return (
    <footer className="flex items-center gap-3 text-gray-700 dark:bg-background-700 dark:text-white">
      <UserAvatar avatar={avatar} className="w-10 h-10" />
      <div className="flex-1 w-full">
        <p className="text-xs dark:text-gray-400">Resolução de</p>
        <h3 className=" line-clamp-1" title={formatName(avatar.name)}>
          {formatName(avatar.name)}
        </h3>
      </div>
    </footer>
  );
}

function BlurImageWrapper(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="transition-all bg-black opacity-20 hover:opacity-100 sm:blur-xs sm:hover:blur-none ">
      {props.children}
    </div>
  );
}
