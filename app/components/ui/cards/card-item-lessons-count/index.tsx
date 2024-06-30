import { MdOutlinePlayLesson } from "react-icons/md";

export default function CardItemLessonsCount({
  lessonsCount,
  className,
}: {
  lessonsCount: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <MdOutlinePlayLesson className="text-brand-400 w-4 h-4" />

      <span className="text-xs text-gray-500 dark:text-gray-400">
        {lessonsCount} aulas
      </span>
    </div>
  );
}
