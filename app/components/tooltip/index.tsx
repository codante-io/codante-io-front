import * as Tooltip from "@radix-ui/react-tooltip";

export default function TooltipWrapper({
  children,
  text,
  side = "right",
  cursor = "cursor-pointer",
  padding,
  bgColor,
  textColor,
  arrowColor,
}: {
  children: React.ReactNode;
  text: string;
  side?: "left" | "right" | "top" | "bottom";
  cursor?: string;
  padding?: string;
  bgColor?: string;
  textColor?: string;
  arrowColor?: string;
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger className={cursor}>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            className={classNames(
              padding || "px-2 py-3",
              bgColor || "bg-gray-200 dark:bg-gray-600",
              textColor || "dark:text-white",
              "z-10 text-xs rounded shadow-lg TooltipContent"
            )}
            sideOffset={5}
          >
            {text}
            <Tooltip.Arrow
              className={`${
                arrowColor || "fill-gray-200 dark:fill-gray-600"
              }  bg-opacity-90 TooltipArrow`}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
