import classNames from "~/utils/class-names";
import MarkCompletedButton from "./mark-completed-button";
import type { Lesson } from "~/models/lesson.server";
import { Link } from "@remix-run/react";
import { fromSecondsToTimeString } from "~/utils/interval";
import type { Workshop } from "~/models/workshop.server";
import type { Challenge } from "~/models/challenge.server";

type WorkshopLessonListProps = {
  workshop: Workshop;
  activeIndex: number;
  isChallengeResolution?: boolean;
  challenge?: Challenge | null;
  isLoggedIn?: boolean;
  isChallenge?: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

export default function WorkshopLessonList({
  isLoggedIn = false,
  workshop,
  isChallenge = false,
  challenge = null,
  activeIndex,
  setIsSidebarOpen,
}: WorkshopLessonListProps) {
  // if is challenge resolution, we need to add the challenge slug to the link
  // so we can navigate to the correct lesson
  const linkPrefix = isChallenge
    ? `/mini-projetos/${challenge?.slug}/resolucao`
    : `/workshops/${workshop.slug}`;

  return (
    <ol className="mt-4">
      {workshop.lessons.map((lesson: Lesson, id: number) => (
        <li
          key={lesson.id}
          className={classNames(
            activeIndex === id
              ? "bg-background-200 dark:bg-background-800 dark:text-white"
              : "text-gray-700 dark:text-gray-500",
            "flex items-center justify-between gap-3 px-3 py-3 font-light transition rounded-lg mb-1 dark:hover:bg-background-800 hover:bg-background-200"
          )}
        >
          <div className="flex items-center flex-1">
            {isLoggedIn && <MarkCompletedButton lesson={lesson} />}
            <span className={` text-xs dark:text-gray-600 mr-2`}>
              {id + 1}.
            </span>
            <Link
              onClick={() => setIsSidebarOpen(false)}
              to={`${linkPrefix}/${lesson.slug}`}
              className="hover:underline"
            >
              <h4
                className={`flex-1 font-normal inline-block w-full hover:underline decoration-brand`}
              >
                {lesson.name}
              </h4>
            </Link>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-600">
            {fromSecondsToTimeString(lesson.duration_in_seconds)}
          </span>
        </li>
      ))}
    </ol>
  );
}
