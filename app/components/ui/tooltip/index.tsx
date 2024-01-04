import * as Tooltip from "@radix-ui/react-tooltip";
import classNames from "~/lib/utils/class-names";

export default function TooltipWrapper({
  children,
  text,
  side = "right",
  cursor = "cursor-pointer",
  padding,
  bgColor,
  textColor,
  arrowColor,
  maxWidth,
}: {
  children: React.ReactNode;
  text: string;
  side?: "left" | "right" | "top" | "bottom";
  cursor?: string;
  padding?: string;
  bgColor?: string;
  textColor?: string;
  arrowColor?: string;
  maxWidth?: string;
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
              bgColor ||
                "bg-gray-50 dark:bg-background-800 border border-background-300 dark:border-background-600",
              textColor || "dark:text-white",
              maxWidth || "max-w-xs",
              "z-10 text-xs rounded shadow-lg TooltipContent",
            )}
            sideOffset={5}
          >
            {text}
            <Tooltip.Arrow
              className={`${
                arrowColor || "dark:fill-background-600 fill-background-300"
              }  bg-opacity-90 TooltipArrow`}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
