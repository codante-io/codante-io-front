export default function CardItemRibbon({ text }: { text: string }) {
  return (
    <div className="w-36 aspect-square absolute -top-2 -right-2 overflow-hidden rounded-sm">
      <div className="absolute top-0 left-0 bg-blue-500 h-2 w-2"></div>
      <div className="absolute bottom-0 right-0 bg-blue-500 h-2 w-2"></div>
      <span className="w-[210px] px-8 py-1.5 bg-blue-300 text-blue-900 font-semibold uppercase text-xs tracking-wider block w-square-diagonal text-center absolute bottom-0 right-0 rotate-45 origin-bottom-right shadow-sm hover:bg-blue-300">
        {text}
      </span>
    </div>
  );
}
