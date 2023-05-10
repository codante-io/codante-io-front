import { BsTools } from "react-icons/bs";

export default function CardItemWorkshop({
  workshopsCount,
  className,
}: {
  workshopsCount: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BsTools size={12} className="text-gray-500 dark:text-zinc-400" />
      <span className="text-xs text-gray-500 dark:text-zinc-400">
        {workshopsCount} {workshopsCount === 1 ? "workshop" : "workshops"}
      </span>
    </div>
  );
}
