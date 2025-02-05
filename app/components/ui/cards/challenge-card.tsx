import { Link } from "@remix-run/react";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";

import classNames from "~/lib/utils/class-names";
import UserAvatar from "../user-avatar";
import CardItemLevel from "~/components/ui/cards/card-item-level";
import CardItemMainTechnology from "~/components/ui/cards/card-item-main-technology";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import Chip from "~/components/ui/chip";

export default function ChallengeCard({
  challenge,
  className = "",
  openInNewTab,
}: {
  challenge: ChallengeCardType;
  openInNewTab?: boolean;
  className?: string;
}) {
  return (
    <Link
      prefetch="intent"
      onClick={(e) => challenge?.status === "soon" && e.preventDefault()}
      target={openInNewTab ? "_blank" : "_self"}
      to={
        challenge?.status === "soon" ? `#` : `/mini-projetos/${challenge?.slug}`
      }
      className={classNames(
        "relative group block h-full max-w-[450px] w-full mx-auto",
        challenge?.status === "soon" ? "cursor-not-allowed" : "cursor-pointer",
      )}
    >
      <article
        className={`group
          relative flex flex-col w-full h-full bg-background-50 dark:bg-background-800 shadow-md rounded-2xl
          font-lexend border-[1.5px] border-background-200 dark:border-background-600
        hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow ${className}`}
      >
        <div className="flex m-1 flex-col items-center justify-center h-44 bg-opacity-20 rounded-t-xl dark:bg-opacity-40 bg-background-600">
          <div className="flex items-center justify-center w-full h-full pt-4 overflow-hidden">
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
        {challenge?.status === "soon" && <Chip text="Em breve" />}

        {!challenge?.is_premium && <Chip type="free" text="Gratuito" />}

        <div className="flex flex-col justify-between flex-grow h-full px-6 py-4">
          <div>
            <div className="mb-2 card-header">
              <h2 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-50 line-clamp-2">
                {challenge?.name}
              </h2>

              <div className="flex justify-start items-start gap-2">
                {challenge?.main_technology?.name && (
                  <CardItemMainTechnology
                    technologyName={challenge.main_technology?.name}
                    technologyImgSrc={challenge.main_technology?.image_url}
                  />
                )}
                <CardItemLevel difficulty={challenge?.difficulty} />
              </div>
            </div>
          </div>
          <div className="flex justify-between w-full mt-8 gap-2 border-t border-gray-200 dark:border-gray-800 pt-4">
            <section>
              <div className="flex -space-x-3 overflow-hidden">
                {challenge?.avatars?.map((avatar, index) => (
                  <UserAvatar
                    key={index}
                    avatar={avatar}
                    cursor="cursor-pointer"
                    className="w-7 h-7 m-[2px]"
                  />
                ))}
                {challenge.enrolled_users_count > 5 && (
                  <div className="relative w-7 h-7 text-[0.5rem] m-[2px] flex items-center justify-center rounded-full ring-2 ring-white dark:ring-background-800 bg-blue-300 text-blue-900 font-bold">
                    +{challenge.enrolled_users_count - 5}
                  </div>
                )}
              </div>
            </section>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center justify-center gap-2 rounded-xl font-light text-gray-500 dark:text-gray-400"
            >
              Ver projeto
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
