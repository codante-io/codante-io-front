interface CardItemMainTechnologyProps {
  technologyName: string;
  technologyImgSrc: string;
}

export default function CardItemMainTechnology({
  technologyName,
  technologyImgSrc,
}: CardItemMainTechnologyProps) {
  return (
    <section className="flex text-gray-800 dark:text-gray-300 gap-3 flex-wrap text-xs">
      <span className="p-2 px-2 rounded-xl border border-background-100 dark:border-background-700 font-light flex items-center gap-1">
        <img
          className="w-4 h-4 rounded-md"
          src={technologyImgSrc}
          alt={`${technologyName} logo`}
        />
        {technologyName}
      </span>
    </section>
  );
}
