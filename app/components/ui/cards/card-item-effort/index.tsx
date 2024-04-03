import type { ComponentPropsWithoutRef } from "react";
import LevelIcon from "~/components/ui/level-icon";

type CardItemEffortProps = ComponentPropsWithoutRef<"div"> & {
  effort: ChallengeEstimatedEffort;
};

type ChallengeEstimatedEffort = "1_day" | "2_days" | "1_week";

const effortMap: Record<ChallengeEstimatedEffort, string> = {
  "1_day": "1 dia",
  "2_days": "2 dias",
  "1_week": "1 semana",
};

const effortLevelMap: Record<ChallengeEstimatedEffort, 1 | 2 | 3> = {
  "1_day": 1,
  "2_days": 2,
  "1_week": 3,
};

export default function CardItemEffort({
  effort,
  ...classes
}: CardItemEffortProps) {
  return (
    <span className="rounded-full text-sm font-light flex items-center gap-1 border border-background-200 dark:border-background-600 px-2 py-1">
      <div className="w-6 h-6">
        <LevelIcon level={effortLevelMap[effort]} color="orange" />
      </div>

      {effortMap[effort]}
    </span>
  );
}
