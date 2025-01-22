import { Link } from "@remix-run/react";
import LevelIcon from "~/components/ui/level-icon";
import { ChallengeDifficulty } from "~/lib/models/challenge.server";
import { cn } from "~/lib/utils/cn";

type DifficultyFilterProps = {
  selectedDifficulty?: string | null;
  baseUrl: string;
  difficultiesToDisplay?: string[];
};

const difficultyLevelMap: Record<ChallengeDifficulty, 1 | 2 | 3> = {
  newbie: 1,
  intermediate: 2,
  advanced: 3,
};

const difficultyMap: Record<ChallengeDifficulty, string> = {
  newbie: "Iniciante",
  intermediate: "Intermediário",
  advanced: "Avançado",
};

function getUrl(
  baseUrl: string,
  isSelected: boolean | undefined,
  difficulty: ChallengeDifficulty,
) {
  if (typeof window === "undefined") {
    return baseUrl;
  }

  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (isSelected) {
    searchParams.delete("dificuldade");
  } else {
    searchParams.set("dificuldade", difficulty);
  }
  return `${url.pathname}?${searchParams.toString()}`;
}

export default function DifficultyFilter({
  selectedDifficulty,
  baseUrl,
  difficultiesToDisplay = ["newbie", "intermediate", "advanced"],
}: DifficultyFilterProps) {
  const filteredDifficulties = Object.entries(difficultyMap).filter(
    ([difficulty]) => difficultiesToDisplay.includes(difficulty),
  );

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {filteredDifficulties.map(([difficulty, name]) => {
        const isSelected = selectedDifficulty?.includes(difficulty);
        return (
          <Link
            to={getUrl(baseUrl, isSelected, difficulty as ChallengeDifficulty)}
            preventScrollReset
            prefetch="intent"
            key={difficulty}
            className={cn(
              "flex items-center gap-2 p-3 md:py-3 py-2 text-xs text-gray-500 dark:text-gray-400 font-light transition-colors border-[1.5px] rounded-xl cursor-pointer group dark:border-background-700 border-background-300 hover:border-brand-300 hover:dark:border-brand-300",
              isSelected &&
                "border-brand-300 dark:border-brand-300 dark:text-white text-gray-700 bg-background-100 dark:bg-background-800",
            )}
          >
            <span
              className={cn(
                "w-4 h-4 transition transtition-color scale-90 group-hover:text-brand-400 group-hover:scale-105 group-hover:grayscale-0 grayscale",
                isSelected && "scale-105 grayscale-0",
              )}
            >
              <LevelIcon
                level={difficultyLevelMap[difficulty as ChallengeDifficulty]}
              />
            </span>
            {name}
          </Link>
        );
      })}
    </div>
  );
}
