import { Link } from "@remix-run/react";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import type { ChallengeCardInfo } from "~/models/challenge.server";
import CardItemDifficulty from "./card-item-difficulty";
import CardItemTag from "./card-item-tag";

export default function ChallengeCard({
  challenge,
}: {
  challenge: ChallengeCardInfo;
}) {
  return (
    <Link
      onClick={(e) => challenge?.status === "soon" && e.preventDefault()}
      to={
        challenge?.status === "soon"
          ? `#`
          : `/mini-projetos/${challenge?.slug}/overview`
      }
      className={
        challenge?.status === "soon" ? "cursor-not-allowed" : "cursor-pointer"
      }
    >
      <article
        className="group
          relative max-w-[300px] h-[450px] bg-background-50 dark:bg-background-800 shadow-md rounded-2xl p-6 pt-3
          font-lexend border-[1.5px] border-background-200 dark:border-background-600
        hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow"
      >
        {challenge?.status === "soon" && (
          <CardItemRibbon
            className="group-hover:animate-tada"
            text="Em breve"
          />
        )}
        <div className="flex flex-col justify-between h-full">
          <div>
            <CardItemDifficulty
              className="mb-3"
              difficulty={challenge?.difficulty}
            />
            <div
              className={`flex items-center justify-center h-32 p-16 mb-6 bg-opacity-20 dark:bg-opacity-40 rounded-2xl ${challenge.base_color} `}
            >
              <img
                src={challenge.image_url}
                className={`inline-block p-2 ${
                  challenge.status === "soon"
                    ? "group-hover:animate-tada"
                    : "group-hover:animate-float"
                }`}
                alt=""
              />
            </div>
            <div className="mb-4 card-header">
              <h2 className="mb-1 text-lg font-bold leading-tight text-gray-700 dark:text-gray-50">
                {challenge?.name}
              </h2>
              <div className="tags">
                {challenge?.tags?.map((tag) => (
                  <CardItemTag
                    key={tag.id ?? tag.name}
                    tagName={tag.name}
                    className="text-blue-900 bg-blue-200 dark:text-gray-300 dark:bg-blue-900"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm font-light text-gray-600 line-clamp-3 slate-600 dark:text-gray-300">
              {challenge?.short_description}
            </p>
          </div>
          <div className="flex flex-col items-end justify-center mt-4 card-footer">
            <section className="">
              <div className="flex -space-x-2 overflow-hidden">
                {challenge?.users?.map((user, index) => (
                  <img
                    key={index}
                    className="inline-block w-7 h-7 m-[2px] rounded-full ring-2 ring-white dark:ring-background-800"
                    src={user.avatar_url || "https://source.boringavatars.com/"}
                    alt="Avatar do usuário"
                  />
                ))}
                {challenge?.enrolled_users_count > 5 && (
                  <div className="w-7 h-7 text-[0.7rem] m-[2px] flex items-center justify-center rounded-full ring-2 ring-white dark:ring-background-800 bg-blue-300 text-blue-900 font-bold">
                    +{challenge?.enrolled_users_count - 5}
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
