import { Link, useNavigate, useOutletContext } from "@remix-run/react";
import CardItemMainTechnology from "~/components/ui/cards/card-item-main-technology";
import type { ChallengeUser, User } from "~/lib/models/user.server";

export default function ChallengeDashboard() {
  const user: User = useOutletContext();
  const challengeUser = user.challenge_users;
  const navigate = useNavigate();

  return (
    <>
      <div className="">
        <h1 className="text-2xl mb-3">
          Mini Projetos{" "}
          <span className="font-semibold text-brand-400">em andamento</span>
        </h1>
        <div className="flex flex-wrap gap-6 items-center">
          {challengeUser.length > 0
            ? challengeUser
                .filter((challenge) => challenge.completed === 0)
                .map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))
            : "não há"}
        </div>

        <div className="w-full h-[1px] bg-gray-200 dark:bg-gray-700 my-10" />
        <h1 className="text-2xl mb-3">
          Mini Projetos{" "}
          <span className="font-semibold text-brand-400">concluídos</span>
        </h1>
        <div className="flex flex-wrap gap-6 items-center">
          {challengeUser.length > 0
            ? challengeUser
                .filter((challenge) => challenge.completed === 1)
                .map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))
            : "não há"}
        </div>
      </div>
    </>
  );
}

function ChallengeCard({ challenge }: { challenge: ChallengeUser }) {
  return (
    <Link to={`/mini-projetos/${challenge.slug}`} className={"cursor-pointer"}>
      <article
        className={`group
          relative xl:max-w-[292px] max-w-[298px] sm:h-[255px] bg-background-50 dark:bg-background-800 shadow-md rounded-2xl
          font-lexend border-[1.5px] border-background-200 dark:border-background-600
        hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow`}
      >
        <div
          className={`flex m-1 items-center justify-center h-44 bg-opacity-20 rounded-t-xl dark:bg-opacity-40 bg-background-600 overflow-hidden`}
        >
          {/* {challenge?.main_technology?.name && (
            <CardItemMainTechnology
              technologyName={challenge.main_technology?.name}
              technologyImgSrc={challenge.main_technology?.image_url}
            />
          )} */}
          <img
            src={challenge.challenge_image}
            className={`inline-block -mb-3 h-full object-cover group-hover:animate-float`}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-between p-6 pt-3">
          <div>
            <div className="mb-2 card-header">
              <h2 className="mb-1 font-light leading-tight text-gray-700 dark:text-gray-50">
                {challenge.challenge_name}
              </h2>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
