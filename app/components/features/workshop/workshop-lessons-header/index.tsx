import { Link } from "@remix-run/react";
import React from "react";
import { FiExternalLink } from "react-icons/fi";
import type { Workshop } from "~/lib/models/workshop.server";

type WorkshopLessonsHeaderProps = {
  workshop: Workshop;
  showResources?: boolean;
};

export default function WorkshopLessonsHeader({
  workshop,
  showResources = false,
}: WorkshopLessonsHeaderProps) {
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  return (
    <div className="mb-3 lg:mb-8 mt-4">
      {showResources && (
        <ul className="font-light">
          {workshop?.resources?.map((resource, index) => {
            return (
              <li
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
                key={resource.url}
                className={`flex items-center justify-between gap-3 px-3 py-3 font-light transition rounded-lg cursor-pointer hover:bg-background-200 dark:hover:bg-background-800 mb-1 ${
                  activeIndex === index
                    ? "bg-background-200 dark:bg-background-800"
                    : ""
                }`}
              >
                <Link
                  to={resource.url}
                  target="_blank"
                  className="inline-flex items-center gap-2 w-full"
                >
                  <span
                    className={`mr-3 text-sm text-brand-400`}
                  >{`${index + 1}.`}</span>
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
