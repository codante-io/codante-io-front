type CardItemTagProps = {
  tagName: string;
  className?: string;
};

export default function CardItemTag({ tagName, className }: CardItemTagProps) {
  return (
    <span
      className={`mr-1 rounded-full px-2 py-[0.20rem] text-xs font-light capitalize ${className}`}
    >
      {tagName}
    </span>
  );
}
