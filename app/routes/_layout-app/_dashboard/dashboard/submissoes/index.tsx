import { Link, useOutletContext } from "@remix-run/react";
import Chip from "~/components/ui/chip";
import { Separator } from "~/components/ui/separator";
import type {
  ChallengeUserDashboard,
  Dashboard,
} from "~/lib/models/dashboard.server";
import type { User } from "~/lib/models/user.server";

export default function SubmissionsDashboard() {
  const { dashboardData, user }: { dashboardData: Dashboard; user: User } =
    useOutletContext();
  const challengeUsers = dashboardData.challenge_users;

  let listedChallengeUsers;
  let unlistedChallengeUsers;

  if (challengeUsers) {
    listedChallengeUsers = challengeUsers.filter(
      (challengeUser) => challengeUser.listed && challengeUser.submission_url,
    );

    unlistedChallengeUsers = challengeUsers.filter(
      (challengeUser) => !challengeUser.listed && challengeUser.submission_url,
    );
  }

  return (
    <div className="text-center md:text-start">
      <div className="">
        {unlistedChallengeUsers && unlistedChallengeUsers.length > 0 && (
          <>
            <h1 className="text-2xl mb-8 mt-8 md:mt-0">
              Submissões{" "}
              <span className="font-semibold text-brand-400">não listadas</span>
            </h1>
            <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
              {unlistedChallengeUsers && unlistedChallengeUsers.length > 0
                ? unlistedChallengeUsers.map((challengeUser) => (
                    <SubmissonCard
                      key={challengeUser.id}
                      challenge={challengeUser}
                      user={user}
                    />
                  ))
                : null}
            </div>

            <Separator orientation="horizontal" className="my-5" />
          </>
        )}

        <h1 className="text-2xl mb-8">
          Minhas{" "}
          <span className="font-semibold text-brand-400">Submissões</span>
        </h1>
        <div className="flex flex-wrap gap-6 items-center justify-center md:justify-start">
          {listedChallengeUsers && listedChallengeUsers.length > 0 ? (
            listedChallengeUsers.map((challengeUser) => (
              <SubmissonCard
                key={challengeUser.id}
                challenge={challengeUser}
                user={user}
              />
            ))
          ) : (
            <h2 className="dark:text-gray-600 text-gray-400">
              Você não possui nenhuma{" "}
              <span className="font-semibold">submissão</span>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
}

function SubmissonCard({
  challenge,
  user,
}: {
  challenge: ChallengeUserDashboard;
  user: User;
}) {
  return (
    <Link
      to={`/mini-projetos/${challenge.challenge_slug}/submissoes/${user.github_user}`}
      className={"cursor-pointer"}
    >
      <article
        className={`group sm:w-[292px] max-w-[298px] sm:h-[245px] bg-background-50 dark:bg-background-800 shadow-md rounded-2xl
          font-lexend border-[1.5px] border-background-200 dark:border-background-600 hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow overflow-hidden flex flex-col relative`}
      >
        <img
          src={challenge.submission_image_url}
          alt={`Submissão projeto ${challenge.challenge_name}`}
          className={`${challenge.listed ? "opacity-100" : "opacity-70"}`}
        />

        {!challenge.listed && <Chip text="Não listado" type="unlisted" />}
        <div className="p-4">
          <h2 className="font-light leading-tight text-gray-700 dark:text-gray-50">
            {challenge.challenge_name}
          </h2>
        </div>
      </article>
    </Link>
  );
}
