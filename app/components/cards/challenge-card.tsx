import { Link } from "@remix-run/react";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import type { ChallengeCardInfo } from "~/models/challenge.server";
import CardItemDifficulty from "./card-item-difficulty";
import CardItemDuration from "./card-item-duration";
import CardItemTag from "./card-item-tag";

export default function ChallengeCard({
  challenge,
}: {
  challenge: ChallengeCardInfo;
}) {
  return (
    <Link
      onClick={(e) => challenge?.status === "soon" && e.preventDefault()}
      to={`mini-projetos/${challenge?.slug}`}
      className={
        challenge?.status === "soon" ? "cursor-not-allowed" : "cursor-pointer"
      }
    >
      <article
        className="
          relative max-w-[300px] h-[500px] bg-white dark:bg-gray-dark shadow-md rounded-2xl p-6 pt-3
          font-lexend border-[1.5px] border-gray-300 dark:border-slate-600
        hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg"
      >
        {challenge?.status === "soon" && <CardItemRibbon text="Em breve" />}
        <div className="h-full flex flex-col justify-between">
          <div>
            <CardItemDifficulty
              className="mb-3"
              difficulty={challenge?.difficulty}
            />
            <div className="p-16 bg-purple-200 dark:bg-purple-900 h-32 rounded-2xl flex items-center justify-center mb-6">
              <img
                src="/img/keyboard-icon.png"
                className=" inline-block"
                alt=""
              />
            </div>
            <div className="card-header mb-8">
              <h2 className="font-bold text-lg text-slate-800 dark:text-white mb-1">
                {challenge?.name}
              </h2>
              <div className="tags">
                {challenge?.tags?.map((tag) => (
                  <CardItemTag
                    key={tag.name}
                    tagName={tag.name}
                    className="bg-blue-900 text-white dark:bg-blue-900 dark:text-white"
                  />
                ))}
              </div>
            </div>
            <p className="slate-600 font-light text-sm mb-12 text-slate-600 dark:text-zinc-300">
              {challenge?.short_description}
            </p>
          </div>
          <div className="card-footer flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              {challenge?.enrolled_users_count}{" "}
              {challenge?.enrolled_users_count === 1
                ? "participante"
                : "participantes"}
            </div>
            <CardItemDuration durationString="3h30" />
          </div>
        </div>
      </article>
    </Link>
  );
}
