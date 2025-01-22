import type { ComponentPropsWithoutRef } from "react";
import LevelIcon from "~/components/ui/level-icon";
import type { ChallengeDifficulty } from "~/lib/models/challenge.server";

type CardItemLevelProps = ComponentPropsWithoutRef<"div"> & {
  difficulty: ChallengeDifficulty;
};

const difficultyMap: Record<ChallengeDifficulty, string> = {
  newbie: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

const difficultyLevelMap: Record<ChallengeDifficulty, 1 | 2 | 3> = {
  newbie: 1,
  intermediate: 2,
  advanced: 3,
};

export default function CardItemLevel({ difficulty }: CardItemLevelProps) {
  return (
    <span className="rounded-xl text-xs font-light flex items-center gap-1 border border-background-100 dark:border-background-700 p-2 text-gray-800 dark:text-gray-300">
      <div className="w-4 h-4">
        <LevelIcon level={difficultyLevelMap[difficulty]} />
      </div>

      {difficultyMap[difficulty]}
    </span>
  );
}
