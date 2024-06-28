import UserAvatar from "~/components/ui/user-avatar";
import type { UserAvatar as UserAvatarType } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import {
  SubmissionCard,
  SubmissionCardFooter,
  SubmissionCardImage,
} from "./submission-card-v2";
import { Link } from "@remix-run/react";

type CarouselSubmissionCardProps = {
  submissionImageUrl: string;
  avatar: UserAvatarType;
  challengeSlug?: string;
};

export default function CarouselSubmissionCard({
  submissionImageUrl,
  avatar,
  challengeSlug,
}: CarouselSubmissionCardProps) {
  const submissionUrl = `/mini-projetos/${challengeSlug}/submissoes/${avatar.github_user}`;
  return (
    <SubmissionCard size="sm">
      <Link to={submissionUrl}>
        <BlurImageWrapper>
          <SubmissionCardImage imageUrl={submissionImageUrl} />
        </BlurImageWrapper>
      </Link>
      <SubmissionCardFooter>
        <CarouselSubmissionCardFooter avatar={avatar} />
      </SubmissionCardFooter>
    </SubmissionCard>
  );
}

function CarouselSubmissionCardFooter({ avatar }: { avatar: UserAvatarType }) {
  return (
    <footer className="flex items-center gap-3 dark:bg-background-700 p-3 dark:text-white text-gray-700">
      <UserAvatar avatar={avatar} className="w-10 h-10" />
      <div className="w-full flex-1">
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
    <div className="opacity-20 bg-black hover:opacity-100 sm:blur-sm sm:hover:blur-none transition-all ">
      {props.children}
    </div>
  );
}
