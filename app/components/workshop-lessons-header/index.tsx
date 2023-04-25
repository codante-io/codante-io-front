import { Link } from "@remix-run/react";
import type { Workshop } from "~/models/workshop.server";
import { fromSecondsToTimeString } from "~/utils/interval";

type WorkshopLessonsHeaderProps = {
  workshop: Workshop;
};

export default function WorkshopLessonsHeader({
  workshop,
}: WorkshopLessonsHeaderProps) {
  return (
    <div className="mb-4 lg:mb-8">
      {/* <span className="block -mb-1 text-xs text-slate-400 dark:text-slate-500">
        Vídeos de:
      </span> */}
      <h3 className="mt-0 text-lg font-bold ">
        <Link className="hover:underline" to={`/workshops/${workshop.slug}`}>
          {workshop.name}
        </Link>
      </h3>
      <span className="block mt-2 text-sm font-light text-slate-400">
        {workshop.lessons.length} aulas{" "}
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
