import { MdOutlineWatchLater } from "react-icons/md";

export default function CardItemDuration({
  durationString,
  className,
}: {
  durationString: string | null;
  className?: string;
}) {
  if (!durationString) return null;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <MdOutlineWatchLater className="text-brand-400 w-4 h-4" />

      <span className="text-xs text-gray-500 dark:text-gray-400">
        {durationString}
      </span>
    </div>
  );
}
