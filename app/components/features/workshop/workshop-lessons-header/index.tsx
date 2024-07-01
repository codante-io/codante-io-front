import { Link } from "@remix-run/react";
import { FiExternalLink } from "react-icons/fi";
import type { Workshop } from "~/lib/models/workshop.server";

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
      {showResources && (
        <ul className="font-light">
          {workshop?.resources?.map((resource) => {
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
