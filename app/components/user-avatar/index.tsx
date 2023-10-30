import TooltipWrapper from "../tooltip";

export default function UserAvatar({
  avatarUrl,
  className = "w-7 h-7 m-[2px]",
  isPro = false,
  showTooltip = true,
  cursor = "cursor-default",
}: {
  key?: number;
  avatarUrl?: string;
  className?: string;
  isPro?: boolean;
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
              className={`${className} ring-amber-400 ring-2 rounded-full`}
              src={avatarUrl || "https://source.boringavatars.com/"}
              alt="Avatar do usuário"
            />
          </TooltipWrapper>
        ) : (
          <img
            className={`${className} ring-2 ring-amber-400 rounded-full`}
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
