export default function CardItemRibbon({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute z-10 overflow-hidden rounded-sm w-36 aspect-square -top-2 -right-2 ${className}`}
    >
      <div className="absolute top-0 left-0 w-2 h-2 bg-blue-500"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500"></div>
      <span className="w-[210px] px-8 py-1.5 bg-blue-300 text-blue-900 font-semibold uppercase text-xs tracking-wider block w-square-diagonal text-center absolute bottom-0 right-0 rotate-45 origin-bottom-right shadow-sm hover:bg-blue-300">
        {text}
      </span>
    </div>
  );
}
