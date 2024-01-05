export default function CardItemRibbon({
  text,
  className,
  type = "default",
}: {
  text: string;
  className?: string;
  type?: "default" | "live-now" | "black-friday";
}) {
  const bgColorDark =
    type === "live-now"
      ? "bg-red-500"
      : type === "black-friday"
      ? "bg-black"
      : "bg-blue-500";
  const bgColorLight =
    type === "live-now"
      ? "bg-red-300"
      : type === "black-friday"
      ? "bg-black"
      : "bg-blue-300";
  const textColor =
    type === "live-now"
      ? "text-red-900"
      : type === "black-friday"
      ? "text-amber-400"
      : "text-blue-900 hover:bg-blue-300";

  return (
    <div
      className={`absolute z-10 overflow-hidden rounded-sm w-36 aspect-square -top-2 -right-2 ${className}`}
    >
      <div
        className={`absolute top-0 left-0 w-2 h-2 ${
          type === "live-now" ? "bg-red-500" : "bg-blue-500"
        }`}
      ></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 ${bgColorDark}`}></div>
      <span
        className={`w-[210px] px-8 py-1.5   font-semibold uppercase text-xs tracking-wider block w-square-diagonal text-center absolute bottom-0 right-0 rotate-45 origin-bottom-right shadow-sm  ${bgColorLight} ${textColor}`}
      >
        {text}
      </span>
    </div>
  );
}
