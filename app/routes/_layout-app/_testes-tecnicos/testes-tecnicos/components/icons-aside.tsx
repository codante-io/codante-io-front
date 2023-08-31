import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { LuFileCheck } from "react-icons/lu";
import { TbSquareRoundedLetterB, TbSquareRoundedLetterF } from "react-icons/tb";
import TooltipWrapper from "~/components/tooltip";
import type { Assessment } from "~/models/assessments.server";

export default function IconsAside({ assessment }: { assessment: Assessment }) {
  return (
    <div className="flex flex-col justify-start w-4 min-h-full gap-2">
      {(assessment.type === "frontend" || assessment.type === "fullstack") && (
        <TooltipWrapper text="Frontend">
          <TbSquareRoundedLetterF className="text-brand-500 dark:text-brand-500 dark:opacity-70 dark:hover:opacity-100 hover:text-brand-500" />
        </TooltipWrapper>
      )}
      {(assessment.type === "backend" || assessment.type === "fullstack") && (
        <TooltipWrapper text="Backend">
          <TbSquareRoundedLetterB className="text-yellow-500 dark:opacity-70 dark:text-yellow-500 hover:text-yellow-500 dark:hover:opacity-100" />
        </TooltipWrapper>
      )}

      {assessment.has_challenge && (
        <TooltipWrapper text="Mini Projeto Disponível">
          <LuFileCheck className="text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-300" />
        </TooltipWrapper>
      )}

      {assessment.status === "outdated" && (
        <TooltipWrapper text="Teste Desatualizado">
          <ExclamationTriangleIcon className="text-red-400 hover:text-red-500 dark:hover:text-red-300" />
        </TooltipWrapper>
      )}
    </div>
  );
}
