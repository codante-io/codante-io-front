type CardItemTagProps = {
  tagName: string;
  className?: string;
};

export default function WorkshopCardTag({
  tagName,
  className,
}: CardItemTagProps) {
  return (
    <span
      className={`text-[10px] font-light whitespace-nowrap capitalize ${className}`}
    >
      {tagName}
    </span>
  );
}
