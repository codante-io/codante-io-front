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
      <BsTools size={12} className="dark:text-zinc-300 text-gray-500" />
      <span className="text-xs dark:text-zinc-300 text-gray-500">
        {workshopsCount} {workshopsCount === 1 ? "workshop" : "workshops"}
      </span>
    </div>
  );
}
