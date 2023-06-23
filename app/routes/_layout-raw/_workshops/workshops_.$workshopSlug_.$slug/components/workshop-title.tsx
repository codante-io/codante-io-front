import { Link } from "@remix-run/react";
import type { Workshop } from "~/models/workshop.server";
import { fromSecondsToTimeString } from "~/utils/interval";
import ProgressBar from "./progress-bar";

export default function WorkshopTitle({
  workshop,
  isLoggedIn = false,
}: {
  workshop: Workshop;
  isLoggedIn?: boolean;
}) {
  return (
    <div className="mb-4">
      <h3 className="mt-0 text-lg font-bold ">
        <Link className="hover:underline" to={`/workshops/${workshop.slug}`}>
          {workshop.name}
        </Link>
      </h3>
      <p className="mb-4 text-xs text-brand">Workshop</p>
      <span className="block mt-0 text-xs font-light text-gray-400 dark:text-gray-500">
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
      {isLoggedIn && <ProgressBar lessons={workshop.lessons} />}
    </div>
  );
}
