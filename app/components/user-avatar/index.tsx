import TooltipWrapper from "../tooltip";

export default function UserAvatar({
  avatarUrl,
  className = "w-7 h-7 m-[2px]",
  role,
  showTooltip = true,
  cursor = "cursor-default",
}: {
  key?: number;
  avatarUrl?: string;
  className?: string;
  role?: "pro" | "admin";
  showTooltip?: boolean;
  cursor?: string;
}) {
  if (role) {
    return (
      <>
        {showTooltip ? (
          <TooltipWrapper
            text={role === "pro" ? "PRO" : "Equipe"}
            side="bottom"
            cursor={cursor}
            padding="px-2 py-1"
            bgColor={`bg-gray-50 dark:bg-background-800 border ${
              role === "pro" ? "border-amber-400" : "border-brand-500"
            }`}
            arrowColor={`${
              role === "pro" ? "fill-amber-400" : "fill-brand-500"
            }`}
          >
            <img
              className={`${className} ${
                role === "pro" ? "ring-amber-400" : "ring-brand-500"
              } ring-2 rounded-full`}
              src={avatarUrl || "https://source.boringavatars.com/"}
              alt="Avatar do usuário"
            />
          </TooltipWrapper>
        ) : (
          <img
            className={`${className} ring-2 ${
              role === "pro" ? "ring-amber-400" : "ring-brand-500"
            } rounded-full`}
            src={avatarUrl || "https://source.boringavatars.com/"}
            alt="Avatar do usuário"
          />
        )}
      </>
    );
  }
  return (
    <img
      className={`${className} rounded-full ring-2 ring-white dark:ring-gray-800`}
      src={avatarUrl || "https://source.boringavatars.com/"}
      alt="Avatar do usuário"
    />
  );
}
