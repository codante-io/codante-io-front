import { Link } from "@remix-run/react";
import type { Workshop } from "~/models/workshop.server";
import { fromSecondsToTimeString } from "~/utils/interval";

type WorkshopLessonsHeaderProps = {
  workshop: Workshop;
  title?: string;
};

export default function WorkshopLessonsHeader({
  workshop,
  title,
}: WorkshopLessonsHeaderProps) {
  return (
    <div className="mb-4 lg:mb-8">
      {/* <span className="block -mb-1 text-xs text-gray-400 dark:text-gray-300">
        Vídeos de:
      </span> */}
      <h3 className="mt-0 text-lg font-bold ">
        <Link className="hover:underline" to={`/workshops/${workshop.slug}`}>
          {title || workshop.name}
        </Link>
      </h3>
      <span className="block mt-2 text-sm font-light text-gray-400 dark:text-gray-300">
        {workshop.lessons.length}{" "}
        {workshop.lessons.length > 1 ? "vídeos" : "vídeo"}{" "}
        <span className="font-light text-blue-500"> &#8226; </span>
        {fromSecondsToTimeString(
          workshop.lessons.reduce(
            (acc, lesson) => acc + lesson.duration_in_seconds,
            0
          )
        )}
      </span>
    </div>
  );
}
