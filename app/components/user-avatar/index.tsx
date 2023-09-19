import TooltipWrapper from "../tooltip";

export default function UserAvatar({
  avatarUrl,
  className = "w-7 h-7 m-[2px]",
  isPro = 0,
  showTooltip = true,
  cursor = "cursor-default",
}: {
  key?: number;
  avatarUrl?: string;
  className?: string;
  isPro?: number;
  showTooltip?: boolean;
  cursor?: string;
}) {
  if (isPro) {
    return (
      <>
        {showTooltip ? (
          <TooltipWrapper text="PRO" side="bottom" cursor={cursor}>
            <img
              className={`${className} border-2 border-amber-400 rounded-full ring-2 ring-white dark:ring-gray-800`}
              src={avatarUrl || "https://source.boringavatars.com/"}
              alt="Avatar do usuário"
            />
          </TooltipWrapper>
        ) : (
          <img
            className={`${className} border-2 border-amber-400 rounded-full ring-2 ring-white dark:ring-gray-800`}
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
