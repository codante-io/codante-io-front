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
          <TooltipWrapper
            text="PRO"
            side="bottom"
            cursor={cursor}
            padding="px-2 py-1"
            bgColor="bg-gray-50 dark:bg-background-800 border border-amber-400"
            arrowColor="fill-amber-400"
          >
            <img
              className={`${className} border-amber-400 border-2 rounded-full`}
              src={avatarUrl || "https://source.boringavatars.com/"}
              alt="Avatar do usuário"
            />
          </TooltipWrapper>
        ) : (
          <img
            className={`${className} border-2 border-amber-400 rounded-full`}
            src={avatarUrl || "https://source.boringavatars.com/"}
            alt="Avatar do usuário"
          />
        )}
      </>
    );
  }
  return (
    <img
      className={`${className} rounded-full border-2 border-white dark:border-gray-800`}
      src={avatarUrl || "https://source.boringavatars.com/"}
      alt="Avatar do usuário"
    />
  );
}
