import { BsCodeSlash } from "react-icons/bs";

export default function CardItemChallenge({
  challengesCount,
  className,
}: {
  challengesCount: number;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <BsCodeSlash size={12} className="text-gray-500 dark:text-gray-400" />
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {challengesCount}{" "}
        {challengesCount === 1 ? "mini projeto" : "mini projetos"}
      </span>
    </div>
  );
}
