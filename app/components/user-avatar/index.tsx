import { FaCrown } from "react-icons/fa";

export default function UserAvatar({
  avatarUrl,
  className = "w-7 h-7 m-[2px]",
  isPro = 0,
}: {
  key?: number;
  avatarUrl?: string;
  className?: string;
  isPro?: number;
}) {
  return (
    <div className="relative">
      <img
        className={`${className} ${
          isPro && "border-2 border-amber-400"
        } rounded-full ring-2 ring-white dark:ring-gray-800`}
        src={avatarUrl || "https://source.boringavatars.com/"}
        alt="Avatar do usuário"
      />
      {isPro === 1 && (
        <FaCrown className="absolute overflow-hidden text-xs bottom-0.5 left-1.5 text-amber-400" />
      )}
    </div>
  );
}
