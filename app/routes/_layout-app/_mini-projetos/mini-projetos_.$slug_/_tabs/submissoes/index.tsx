import { Link, useOutletContext } from "@remix-run/react";
import { Send } from "lucide-react";
import { Card, CardContent, CardFooter } from "~/components/ui/cards/card";
import { Button } from "~/components/ui/button";
import UserAvatar from "~/components/ui/user-avatar";
import type { Challenge } from "~/lib/models/challenge.server";
import type { ChallengeUser, User } from "~/lib/models/user.server";
import classNames from "~/lib/utils/class-names";
import { formatName } from "~/lib/utils/format-name";
import WaitingIcon from "../../components/waiting-icon";
import ChallengeSubmissionCard from "~/components/features/submission-card/challenge-submission-card";

export default function Submissions() {
  const { challengeUsers, challenge, user } = useOutletContext<{
    challengeUsers: ChallengeUser[];
    challenge: Challenge;
    user: User;
  }>();

  const userStatus = challenge.current_user_status;

  return (
    <>
      <div className="container grid justify-center gap-6 xl:gap-10 lg:grid-cols-3 md:grid-cols-2">
        {/* If user joined challenge */}
        {userStatus === "joined" ||
        userStatus === "forked" ||
        userStatus === "joined-discord" ? (
          <WaitingSubmissionBanner user={user} challenge={challenge} />
        ) : null}
        {challengeUsers.map((challengeUser) => (
          <ChallengeSubmissionCard
            submissionImageUrl={challengeUser.submission_image_url}
            avatar={challengeUser.user.avatar}
            challengeSlug={challenge.slug}
            isSolution={challengeUser.is_solution}
            key={challengeUser.id}
            challengeUserId={challengeUser.id}
            reactions={challengeUser.reactions}
          />
        ))}
      </div>
    </>
  );
}

function WaitingSubmissionBanner({
  user,
  challenge,
}: {
  user: User;
  challenge: Challenge;
}) {
  return (
    <Card className="flex flex-col justify-between ">
      <CardContent className="flex items-center flex-1 gap-4 pt-6 bg-gray-100 md:justify-center dark:bg-transparent">
        <div className="md:flex-1">
          <WaitingIcon />
        </div>
        <div className="w-3/5">
          <h3 className="font-extrabold text-gray-600 dark:text-gray-400">
            Psiu...
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Estamos aguardando a sua submissão 👀
          </p>
          <Button asChild size="sm" className="mt-4">
            <Link to={`/mini-projetos/${challenge.slug}#submit-challenge`}>
              <Send className="w-4 h-4 mr-2" />
              Submeter
            </Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <footer
          className={classNames(
            "flex items-center justify-between gap-4 dark:bg-background-700 p-4 w-full",
          )}
        >
          <div className="flex-none w-10 h-10">
            <UserAvatar avatar={user.avatar} className="shrink-0 w-10 h-10" />
          </div>
          <div className="w-full">
            <h4 className="text-xs dark:text-gray-400 font-regular">
              <span>Resolução de</span>
            </h4>
            <h3
              className="font-semibold text-gray-700 line-clamp-1 dark:text-white"
              title={formatName(user.name)}
            >
              {formatName(user.name)}
            </h3>
          </div>
          <div className="flex items-center gap-x-4"></div>
        </footer>
      </CardFooter>
    </Card>
  );
}
