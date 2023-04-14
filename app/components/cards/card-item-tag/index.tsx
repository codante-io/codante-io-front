type CardItemTagProps = {
  tagName: string;
  className?: string;
};

export default function CardItemTag({ tagName, className }: CardItemTagProps) {
  return (
    <span
      className={`mr-1 bg-gray-200 dark:bg-black rounded-full px-2 py-[0.20rem] text-xs font-light text-gray-500 capitalize ${className}`}
    >
      {tagName}
    </span>
  );
}
