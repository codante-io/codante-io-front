import { cn } from "~/lib/utils/cn";

const colors = {
  default: {
    bgColorDark: "bg-blue-500",
    bgColorLight: "bg-blue-300",
    textColor: "text-blue-900 hover:bg-blue-300",
  },

  "live-now": {
    bgColorDark: "bg-red-500",
    bgColorLight: "bg-red-300",
    textColor: "text-red-900",
  },

  "black-friday": {
    bgColorDark: "bg-black",
    bgColorLight: "bg-black",
    textColor: "text-amber-400",
  },

  success: {
    bgColorDark: "bg-green-500",
    bgColorLight: "bg-green-300",
    textColor: "text-green-900",
  },
};

export default function CardItemRibbon({
  text,
  className,
  type = "default",
}: {
  text: string;
  className?: string;
  type?: "default" | "live-now" | "black-friday" | "success";
}) {
  const bgColorDark = colors[type].bgColorDark;
  const bgColorLight = colors[type].bgColorLight;
  const textColor = colors[type].textColor;

  return (
    <div
      className={cn(
        "absolute z-10 overflow-hidden rounded-sm w-36 aspect-square -top-2 -right-2",
        className,
      )}
    >
      <div className={cn("absolute top-0 left-0 w-2 h-2", bgColorDark)}></div>
      <div
        className={cn("absolute bottom-0 right-0 w-2 h-2", bgColorDark)}
      ></div>
      <span
        className={cn(
          "w-[210px] px-8 py-1.5 font-semibold uppercase text-xs tracking-wider block w-square-diagonal text-center absolute bottom-0 right-0 rotate-45 origin-bottom-right shadow-sm",
          bgColorLight,
          textColor,
        )}
      >
        {text}
      </span>
    </div>
  );
}
