import { Link } from "@remix-run/react";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import type { ChallengeCardInfo } from "~/models/challenge.server";
import CardItemDifficulty from "./card-item-difficulty";
import CardItemDuration from "./card-item-duration";
import CardItemTag from "./card-item-tag";
import { fromSecondsToTimeStringWithoutSeconds } from "~/utils/interval";

export default function ChallengeCard({
  challenge,
}: {
  challenge: ChallengeCardInfo;
}) {
  return (
    <Link
      onClick={(e) => challenge?.status === "soon" && e.preventDefault()}
      to={`/mini-projetos/${challenge?.slug}/overview`}
      className={
        challenge?.status === "soon" ? "cursor-not-allowed" : "cursor-pointer"
      }
    >
      <article
        className="
          relative max-w-[300px] h-[450px] bg-white dark:bg-gray-dark shadow-md rounded-2xl p-6 pt-3
          font-lexend border-[1.5px] border-gray-300 dark:border-slate-600
        hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg"
      >
        {challenge?.status === "soon" && <CardItemRibbon text="Em breve" />}
        <div className="flex flex-col justify-between h-full">
          <div>
            <CardItemDifficulty
              className="mb-3"
              difficulty={challenge?.difficulty}
            />
            <div className="flex items-center justify-center h-32 p-16 mb-6 bg-purple-200 dark:bg-purple-900 rounded-2xl">
              <img src={challenge.image_url} className="inline-block " alt="" />
            </div>
            <div className="mb-8 card-header">
              <h2 className="mb-1 text-lg font-bold text-slate-800 dark:text-white">
                {challenge?.name}
              </h2>
              <div className="tags">
                {challenge?.tags?.map((tag) => (
                  <CardItemTag
                    key={tag.id}
                    tagName={tag.name}
                    className="bg-blue-900 text-slate-300"
                  />
                ))}
              </div>
            </div>
            <p className="text-sm font-light line-clamp-4 slate-600 text-slate-600 dark:text-zinc-300">
              {challenge?.short_description}
            </p>
          </div>
          <div className="flex items-center justify-between card-footer">
            {challenge.enrolled_users_count > 0 && (
              <div className="text-xs text-zinc-400">
                {challenge?.enrolled_users_count}{" "}
                {challenge?.enrolled_users_count === 1
                  ? "participante"
                  : "participantes"}
              </div>
            )}
            {/* <CardItemDuration
              durationString={fromSecondsToTimeStringWithoutSeconds(
                challenge.duration_in_minutes * 60
              )}
            /> */}
          </div>
        </div>
      </article>
    </Link>
  );
}
