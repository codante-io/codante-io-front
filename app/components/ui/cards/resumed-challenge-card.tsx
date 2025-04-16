import { Link } from "react-router";
import type { Challenge } from "~/lib/models/challenge.server";

import classNames from "~/lib/utils/class-names";
import CardItemMainTechnology from "~/components/ui/cards/card-item-main-technology";

export default function ResumedChallengeCard({
  challenge,
  className = "",
}: {
  challenge: Challenge;
  className?: string;
}) {
  return (
    <Link
      onClick={(e) => challenge?.status === "soon" && e.preventDefault()}
      to={
        challenge?.status === "soon" ? `#` : `/mini-projetos/${challenge?.slug}`
      }
      className={classNames(
        "relative group block h-full w-full",
        challenge?.status === "soon" ? "cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <article
        className={`group
          relative flex flex-col w-full h-full bg-background-50 dark:bg-background-800 shadow-md rounded-2xl
          font-lexend border-[1.5px] border-background-200 dark:border-background-600
        hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow ${className}`}
      >
        <div
          className={`flex m-1 flex-col items-center justify-center h-44 bg-opacity-20 rounded-t-xl dark:bg-opacity-40 bg-background-600`}
        >
          {challenge?.main_technology?.name && (
            <CardItemMainTechnology
              technologyName={challenge.main_technology?.name}
              technologyImgSrc={challenge.main_technology?.image_url}
            />
          )}

          <div className="h-full w-full overflow-hidden flex justify-center items-center pt-4">
            <img
              src={challenge.image_url}
              className={`inline-block -mb-3 h-44 object-cover ${
                challenge.status === "soon"
                  ? "group-hover:animate-tada"
                  : "group-hover:animate-float"
              }`}
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col justify-between py-4 px-6 h-full grow">
          <div>
            <div className="mb-2 card-header">
              <h2 className="text-lg font-medium text-gray-700 dark:text-gray-50 line-clamp-2">
                {challenge?.name}
              </h2>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
