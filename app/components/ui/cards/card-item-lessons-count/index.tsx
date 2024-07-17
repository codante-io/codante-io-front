import { MdOutlinePlayLesson } from "react-icons/md";

export default function CardItemLessonsCount({
  lessonsCount,
  className,
  completedLessonsCount,
}: {
  lessonsCount: number;
  className?: string;
  completedLessonsCount?: number | null;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <MdOutlinePlayLesson className="text-brand-400 w-4 h-4" />

      <span className="text-xs text-gray-500 dark:text-gray-400">
        {completedLessonsCount !== null &&
          completedLessonsCount !== undefined && (
            <>
              <span className="font-bold mr-0.5">{completedLessonsCount}</span>
              <span className="mr-0.5">/</span>
            </>
          )}
        {lessonsCount} aulas
      </span>
    </div>
  );
}
