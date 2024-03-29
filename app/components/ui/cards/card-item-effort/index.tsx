import type { ComponentPropsWithoutRef } from "react";
import { cn } from "~/lib/utils/cn";

type CardItemEffortProps = ComponentPropsWithoutRef<"div"> & {
  estimatedEffort: ChallengeEstimatedEffort;
};

type ChallengeEstimatedEffort = "1_day" | "2_days" | "1_week";

const colorMap: Record<ChallengeEstimatedEffort, string> = {
  "1_day": "bg-gradient-to-bl from-rose-500 to-pink-500",
  "2_days": "bg-gradient-to-bl from-cyan-500 to-teal-500",
  "1_week": "bg-gradient-to-bl from-violet-500 to-indigo-500",
};

const difficultyMap: Record<ChallengeEstimatedEffort, string> = {
  "1_day": "1 dia",
  "2_days": "2 dias",
  "1_week": "1 semana",
};

export default function CardItemEffort({
  estimatedEffort,
}: CardItemEffortProps) {
  return (
    <span className=" rounded-full text-sm font-light flex items-center gap-2 border border-background-600 px-2 py-1">
      <div
        className={cn(
          "w-3 h-3 text-xs rounded-md flex justify-center items-center font-medium",
          colorMap[estimatedEffort],
        )}
      />
      {difficultyMap[estimatedEffort]}
    </span>
  );
}
