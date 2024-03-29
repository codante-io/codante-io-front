interface CardItemMainTechnologyProps {
  technologyName: string;
  technologyImgSrc: string;
}

export default function CardItemMainTechnology({
  technologyName,
  technologyImgSrc,
}: CardItemMainTechnologyProps) {
  return (
    <section className="flex w-full p-2 text-gray-300 gap-2 flex-wrap text-sm">
      <span className="p-1 px-2 rounded-full border border-background-600 font-light flex items-center gap-1">
        <img
          className="w-6 h-6"
          src={technologyImgSrc}
          alt={`${technologyName} logo`}
        />
        {technologyName}
      </span>
    </section>
  );
}
