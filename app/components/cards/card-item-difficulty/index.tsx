import type { ComponentPropsWithoutRef } from "react";
import React from "react";

type CardItemDifficultyProps = ComponentPropsWithoutRef<"div"> & {
  difficulty: number;
};

export default function CardItemDifficulty({
  difficulty,
  ...classes
}: CardItemDifficultyProps) {
  return (
    <div {...classes}>
      <span className="text-xs text-gray-600 dark:text-zinc-300 tracking-wide mr-3">
        Dificuldade
      </span>
      <span
        className={`h-[0.6rem] w-[0.6rem] inline-block rounded-full mr-1 ${
          difficulty >= 1
            ? "bg-blue-500"
            : "bg-white dark:bg-neutral-900 border-[1.5px] border-blue-500"
        }`}
      ></span>
      <span
        className={`h-[0.6rem] w-[0.6rem] inline-block rounded-full mr-1 ${
          difficulty >= 2
            ? "bg-blue-500"
            : "bg-white dark:bg-neutral-900 border-[1.5px] border-blue-500"
        }`}
      ></span>
      <span
        className={`h-[0.6rem] w-[0.6rem] inline-block rounded-full ${
          difficulty >= 3
            ? "bg-blue-500"
            : "bg-white dark:bg-neutral-900 border-[1.5px] border-blue-500"
        }`}
      ></span>
    </div>
  );
}
