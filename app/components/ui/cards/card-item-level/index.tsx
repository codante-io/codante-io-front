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

export default function CardItemLevel({
  difficulty,
  ...classes
}: CardItemLevelProps) {
  return (
    <span className="rounded-full text-sm font-light flex items-center gap-1 border border-background-200 dark:border-background-600 px-2 py-1">
      <div className="w-6 h-6">
        <LevelIcon level={difficultyLevelMap[difficulty]} />
      </div>

      {difficultyMap[difficulty]}
    </span>
  );
}
