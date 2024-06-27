import { Card } from "~/components/ui/cards/card";
import UserAvatar from "~/components/ui/user-avatar";
import type { UserAvatar as UserAvatarType } from "~/lib/models/user.server";
import { cn } from "~/lib/utils";
import { formatName } from "~/lib/utils/format-name";

type HomeSubmissionCardProps = {
  submissionImageUrl: string;
  avatar: UserAvatarType;
  challengeSlug?: string;
  className?: string;
};

export default function HomeSubmissionCard({
  submissionImageUrl,
  avatar,
  challengeSlug,
  className,
}: HomeSubmissionCardProps) {
  return (
    <Card
      className={cn(
        "flex-shrink-0 max-w-[275px] shadow-sm text-gray-800",
        className,
      )}
    >
      <HomeSubmissionCardImage
        submissionUrl={`/mini-projetos/${challengeSlug}/submissoes/${avatar.github_user}`}
        submissionImageUrl={submissionImageUrl}
      />
      <HomeSubmissionCardFooter avatar={avatar} />
    </Card>
  );
}

function HomeSubmissionCardFooter({ avatar }: { avatar: UserAvatarType }) {
  return (
    <footer className="flex items-center justify-between gap-4 dark:bg-background-700 px-2 py-2">
      <div className="w-10 h-10 flex-none">
        <UserAvatar avatar={avatar} className="w-10 h-10 flex-shrink-0" />
      </div>
      <div className="w-full">
        <h4 className="text-xs dark:text-gray-400 font-regular">
          <span>Resolução de</span>
        </h4>
        <h3
          className="font-semibold line-clamp-1 text-gray-700 dark:text-white"
          title={formatName(avatar.name)}
        >
          {formatName(avatar.name)}
        </h3>
      </div>
    </footer>
  );
}

function HomeSubmissionCardImage({
  submissionUrl,
  submissionImageUrl,
}: {
  submissionUrl: string;
  submissionImageUrl: string;
}) {
  return (
    <a className="overflow-hidden group relative" href={submissionUrl}>
      <div className="hover:opacity-80">
        <img
          src={submissionImageUrl}
          alt="Screenshot da aplicação submetida"
          className={cn(
            "w-full transition-all delay-75 aspect-video opacity-40 md:blur-sm lg:group-hover:blur-none group-hover:opacity-100",
          )}
        />
      </div>
    </a>
  );
}
