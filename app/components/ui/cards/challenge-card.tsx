import { Link } from "@remix-run/react";
import CardItemRibbon from "~/components/ui/cards/card-item-ribbon";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import PlayIcon from "./icons/playIcon.svg";
import TooltipWrapper from "~/components/ui/tooltip";
import classNames from "~/lib/utils/class-names";
import UserAvatar from "../user-avatar";
import CardItemLevel from "~/components/ui/cards/card-item-level";
import CardItemEffort from "~/components/ui/cards/card-item-effort";
import CardItemMainTechnology from "~/components/ui/cards/card-item-main-technology";

export default function ChallengeCard({
  challenge,
  className = "",
}: {
  challenge: ChallengeCardType;
  className?: string;
}) {
  return (
    <Link
      onClick={(e) => challenge?.status === "soon" && e.preventDefault()}
      to={
        challenge?.status === "soon" ? `#` : `/mini-projetos/${challenge?.slug}`
      }
      className={classNames(
        "h-full",
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
        {challenge?.status === "soon" && (
          <CardItemRibbon
            className="group-hover:animate-tada"
            text="Em breve"
          />
        )}
        <div className="flex flex-col justify-between py-4 px-6 h-full flex-grow">
          <div>
            <div className="mb-2 card-header">
              <h2 className="mb-4 text-2xl font-medium text-gray-700 dark:text-gray-50">
                {challenge?.name}
              </h2>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-300">Nível: </span>
                <CardItemLevel difficulty={challenge?.difficulty} />
              </div>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-xs text-gray-300">Para fazer em: </span>
                <CardItemEffort estimatedEffort={challenge?.estimated_effort} />
              </div>

              <div className="border-t border-gray-300 dark:border-gray-800 my-4 px-2"></div>

              <div>
                <span className="text-xs text-gray-300">
                  O que você vai aprender:
                </span>
                <div className="pb-1 overflow-x-auto overflow-scrollbar scrollbar-thumb tags">
                  {challenge?.tags?.map((tag, index) => (
                    <span key={tag.id} className="inline-block text-xs mr-1">
                      <span className="font-bold">{tag.name}</span>
                      {index === challenge?.tags.length - 2 && " e"}
                      {index < challenge?.tags.length - 2 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-sm font-light text-gray-600 line-clamp-3 slate-600 dark:text-gray-300">
              {challenge?.short_description}
            </p>
          </div>
          <div className="flex items-center justify-between w-full mt-8">
            <section className="flex justify-end">
              {challenge?.has_solution && (
                <TooltipWrapper text="Resolução disponível">
                  <img className="h-9" src={PlayIcon} alt="Ícone de vídeo" />
                </TooltipWrapper>
              )}
            </section>
            <section>
              <div className="flex -space-x-3 overflow-hidden">
                {challenge?.avatars?.map((avatar, index) => (
                  <UserAvatar
                    key={index}
                    avatar={avatar}
                    cursor="cursor-pointer"
                    className="w-9 h-9 m-[2px]"
                  />
                ))}
                {challenge.enrolled_users_count > 5 && (
                  <div className="relative w-9 h-9 text-[0.7rem] m-[2px] flex items-center justify-center rounded-full ring-2 ring-white dark:ring-background-800 bg-blue-300 text-blue-900 font-bold">
                    +{challenge.enrolled_users_count - 5}
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </article>
    </Link>
  );
}
