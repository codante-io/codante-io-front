import type { ComponentPropsWithoutRef } from "react";
import type { ChallengeDifficulty } from "~/lib/models/challenge.server";
import { cn } from "~/lib/utils/cn";

type CardItemLevelProps = ComponentPropsWithoutRef<"div"> & {
  difficulty: ChallengeDifficulty;
};

const colorMap: Record<ChallengeDifficulty, string> = {
  newbie: "bg-gradient-to-tr from-emerald-600 to-lime-600",
  intermediate: "bg-gradient-to-tr from-orange-600 to-yellow-600",
  advanced: "bg-gradient-to-tr from-blue-600 to-purple-600",
};

const difficultyMap: Record<ChallengeDifficulty, string> = {
  newbie: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

export default function CardItemLevel({
  difficulty,
  ...classes
}: CardItemLevelProps) {
  return (
    <span className=" rounded-full text-sm font-light flex items-center gap-2 border border-background-600 px-2 py-1">
      <div
        className={cn(
          "w-3 h-3 text-xs rounded-md flex justify-center items-center font-medium",
          colorMap[difficulty],
        )}
      />

      {difficultyMap[difficulty]}
    </span>
  );
}
