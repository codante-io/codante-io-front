import type { UserAvatar } from "~/lib/models/user.server";
import TooltipWrapper from "../tooltip";

export default function UserAvatar({
  avatar,
  className = "w-7 h-7 m-[2px]",
  showTooltip = true,
  cursor = "cursor-default",
}: {
  key?: number;
  avatar: UserAvatar;
  className?: string;
  showTooltip?: boolean;
  cursor?: string;
}) {
  if (avatar.badge) {
    return (
      <>
        {showTooltip ? (
          <TooltipWrapper
            text={avatar.badge === "pro" ? "PRO" : "Equipe"}
            side="bottom"
            cursor={cursor}
            padding="px-2 py-1"
            bgColor={`bg-gray-50 dark:bg-background-800 border ${
              avatar.badge === "pro" ? "border-amber-400" : "border-brand-500"
            }`}
            arrowColor={`${
              avatar.badge === "pro" ? "fill-amber-400" : "fill-brand-500"
            }`}
          >
            <img
              className={`${className} ${
                avatar.badge === "pro" ? "ring-amber-400" : "ring-brand-500"
              } ring-2 rounded-full bg-background-400`}
              src={avatar.avatar_url || "https://source.boringavatars.com/"}
              alt="Avatar do usuário"
            />
          </TooltipWrapper>
        ) : (
          <img
            className={`${className} ring-2 ${
              avatar.badge === "pro" ? "ring-amber-400" : "ring-brand-500"
            } rounded-full bg-background-400`}
            src={avatar.avatar_url || "https://source.boringavatars.com/"}
            alt="Avatar do usuário"
          />
        )}
      </>
    );
  }
  return (
    <img
      className={`${className} rounded-full ring-2 ring-white dark:ring-gray-800 bg-background-400`}
      src={avatar.avatar_url || "https://source.boringavatars.com/"}
      alt="Avatar do usuário"
    />
  );
}
