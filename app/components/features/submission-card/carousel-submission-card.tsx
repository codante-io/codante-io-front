import UserAvatar from "~/components/ui/user-avatar";
import type { UserAvatar as UserAvatarType } from "~/lib/models/user.server";
import { formatName } from "~/lib/utils/format-name";
import {
  SubmissionCard,
  SubmissionCardFooter,
  SubmissionCardImage,
} from "./submission-card";
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
