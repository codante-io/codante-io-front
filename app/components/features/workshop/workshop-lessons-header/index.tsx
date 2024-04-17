import { Link } from "@remix-run/react";
import { FiExternalLink } from "react-icons/fi";
import type { Workshop } from "~/lib/models/workshop.server";
import { fromSecondsToTimeString } from "~/lib/utils/interval";

type WorkshopLessonsHeaderProps = {
  workshop: Workshop;
  title?: string;
  showResources?: boolean;
};

export default function WorkshopLessonsHeader({
  workshop,
  title,
  showResources = false,
}: WorkshopLessonsHeaderProps) {
  return (
    <div className="mb-3 lg:mb-8">
      {/* <span className="block -mb-1 text-xs text-gray-400 dark:text-gray-300">
        Vídeos de:
      </span> */}
      <h3 className="mt-0 text-lg font-bold ">
        <Link className="hover:underline" to={`/workshops/${workshop.slug}`}>
          {title || workshop.name}
        </Link>
      </h3>
      <span className="block mt-1 text-xs font-light text-gray-400 dark:text-gray-500">
        {workshop.lessons.length}{" "}
        {workshop.lessons.length > 1 ? "vídeos" : "vídeo"}{" "}
        <span className="font-light text-blue-500"> &#8226; </span>
        {fromSecondsToTimeString(
          workshop.lessons.reduce(
            (acc, lesson) => acc + lesson.duration_in_seconds,
            0,
          ),
        )}
      </span>

      {showResources && (
        <ul className="mt-4 font-light">
          {workshop.resources.map((resource) => {
            return (
              <li
                key={resource.url}
                className="list-none text-gray-400 dark:text-gray-500"
              >
                {/* <span className="mr-2 dark:text-gray-700">-</span> */}
                <span className="font-light text-blue-500"> &#8226; </span>
                <Link
                  to={resource.url}
                  target="_blank"
                  className=" inline-flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500 hover:underline hover:dark:text-gray-400 hover:text-gray-500"
                >
                  {resource.name}
                  <FiExternalLink className="w-3 h-3 dark:text-gray-700" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
