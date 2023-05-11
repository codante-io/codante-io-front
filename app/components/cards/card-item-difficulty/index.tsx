import type { ComponentPropsWithoutRef } from "react";

type CardItemDifficultyProps = ComponentPropsWithoutRef<"div"> & {
  difficulty: number;
};

export default function CardItemDifficulty({
  difficulty,
  ...classes
}: CardItemDifficultyProps) {
  return (
    <div {...classes}>
      <span className="mr-3 text-xs font-bold tracking-wide text-gray-600 dark:text-gray-400">
        Nível
      </span>
      <span
        className={`h-[0.6rem] w-[0.6rem] inline-block rounded-full mr-1 ${
          difficulty >= 1
            ? "bg-blue-500"
            : "bg-transparent  border-[1.5px] border-blue-500"
        }`}
      ></span>
      <span
        className={`h-[0.6rem] w-[0.6rem] inline-block rounded-full mr-1 ${
          difficulty >= 2
            ? "bg-blue-500"
            : "bg-transparent border-[1.5px] border-blue-500"
        }`}
      ></span>
      <span
        className={`h-[0.6rem] w-[0.6rem] inline-block rounded-full ${
          difficulty >= 3
            ? "bg-blue-500"
            : "bg-transparent border-[1.5px] border-blue-500"
        }`}
      ></span>
    </div>
  );
}
