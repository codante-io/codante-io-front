import { cn } from "~/lib/utils/cn";

const colors = {
  default: {
    lightTextColor: "text-blue-600",
    darkTextColor: "dark:text-blue-300",
    borderBottonColor: "via-brand-500",
    bgColor: "bg-brand-300/10",
    borderColor: "border-brand-500/20",
  },

  free: {
    lightTextColor: "text-green-600",
    darkTextColor: "dark:text-green-300",
    borderBottonColor: "via-emerald-500",
    bgColor: "bg-emerald-300/10",
    borderColor: "border-emerald-500/20",
  },

  unlisted: {
    lightTextColor: "text-red-600",
    darkTextColor: "dark:text-red-300",
    borderBottonColor: "via-red-500",
    bgColor: "bg-red-300/10",
    borderColor: "border-red-500/20",
  },
};

function Chip({
  text,
  className,
  type = "default",
}: {
  text: string;
  className?: string;
  type?: "default" | "free" | "unlisted";
}) {
  const lighTextColor = colors[type].lightTextColor;
  const darkTextColor = colors[type].darkTextColor;
  const borderBottonColor = colors[type].borderBottonColor;
  const bgColor = colors[type].bgColor;
  const borderColor = colors[type].borderColor;

  return (
    <div
      className={cn(
        "absolute right-4 top-4 bg-background-50  dark:bg-background-700 rounded-lg",
        className,
      )}
    >
      <div
        className={cn(
          "px-2 py-1 backdrop-blur-xs border text-white mx-auto text-center rounded-lg relative",
          bgColor,
          borderColor,
        )}
      >
        <span className={cn("text-sm", lighTextColor, darkTextColor)}>
          {text}
        </span>
        <div
          className={cn(
            "absolute inset-x-0 h-px -bottom-px bg-linear-to-r w-3/4 mx-auto from-transparent to-transparent",
            borderBottonColor,
          )}
        />
      </div>
    </div>
  );
}

export default Chip;
