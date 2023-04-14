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
    <article className="w-[300px] bg-white dark:bg-gray-dark shadow-md rounded-2xl p-6 pt-3 font-lexend border-[1.5px] border-gray-300 dark:border-slate-600">
      <CardItemDifficulty className="mb-3" difficulty={challenge?.difficulty} />
      <div className="p-16 bg-purple-200 dark:bg-purple-900 h-32 rounded-2xl flex items-center justify-center mb-6">
        <img src="/img/keyboard-icon.png" className=" inline-block" alt="" />
      </div>
      <div className="card-header mb-8">
        <h2 className="font-bold text-lg text-slate-800 dark:text-white mb-1">
          {challenge?.name}
        </h2>
        <div className="tags">
          {challenge?.tags?.map((tag) => (
            <CardItemTag
              key={tag}
              tagName={tag}
              className="bg-blue-900 text-white dark:bg-blue-900 dark:text-white"
            />
          ))}
        </div>
      </div>
      <p className="slate-600 font-light text-sm mb-12 text-slate-600 dark:text-zinc-300">
        {challenge?.short_description}
      </p>
      <div className="card-footer flex items-center justify-between">
        <div className="text-xs text-zinc-400">
          {challenge?.enrolled_users_count}{" "}
          {challenge?.enrolled_users_count === 1
            ? "participante"
            : "participantes"}
        </div>
        <CardItemDuration durationString="3h30" />
      </div>
    </article>
  );
}
