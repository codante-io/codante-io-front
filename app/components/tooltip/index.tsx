import * as Tooltip from "@radix-ui/react-tooltip";

export default function TooltipWrapper({
  children,
  text,
  side = "right",
  cursor = "cursor-pointer",
}: {
  children: React.ReactNode;
  text: string;
  side?: "left" | "right" | "top" | "bottom";
  cursor?: string;
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger className={cursor}>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            className="px-2 py-3 text-xs bg-gray-200 rounded shadow-lg dark:text-white dark:bg-gray-600 TooltipContent"
            sideOffset={5}
          >
            {text}
            <Tooltip.Arrow className="fill-gray-200 bg-opacity-90 dark:fill-gray-600 TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
