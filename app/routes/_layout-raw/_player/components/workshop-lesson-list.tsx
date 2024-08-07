import { LockClosedIcon } from "@heroicons/react/24/solid";
// import { LockOpenIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import type { Challenge } from "~/lib/models/challenge.server";
import type { Lesson } from "~/lib/models/lesson.server";
import type { Workshop } from "~/lib/models/workshop.server";
import classNames from "~/lib/utils/class-names";
import { fromSecondsToTimeString } from "~/lib/utils/interval";
import MarkCompletedButton from "./mark-completed-button";
import React from "react";

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
    ? `/mini-projetos/${challenge?.slug}/tutorial`
    : `/workshops/${workshop.slug}`;

  return (
    <>
      {workshop.lesson_sections &&
        workshop.lesson_sections.map((section, id) => (
          <React.Fragment key={id}>
            <h3 className="text-xs dark:text-gray-300 text-gray-800  border-b  dark:border-background-600 border-gray-300  px-4 py-3 mt-4">
              <span className="text-xs">
                Seção {(id + 1).toString().padStart(2, "0")}
              </span>{" "}
              <span className="dark:text-gray-500 text-gray-300 mx-1">|</span>{" "}
              {section.name}
            </h3>
            <ol className="mt-2">
              {workshop.lessons
                .filter((lesson) => section.lessons.includes(lesson.id))
                .map((lesson: Lesson, id: number) => (
                  <WorkshopLessonListItem
                    key={lesson.id}
                    id={id}
                    lesson={lesson}
                    activeIndex={activeIndex}
                    linkPrefix={linkPrefix}
                    setIsSidebarOpen={setIsSidebarOpen}
                    workshop={workshop}
                    isLoggedIn={isLoggedIn}
                  ></WorkshopLessonListItem>
                ))}
            </ol>
          </React.Fragment>
        ))}
      {!workshop.lesson_sections && (
        <ol className="mt-4">
          {workshop.lessons.map((lesson: Lesson, id: number) => (
            <WorkshopLessonListItem
              key={lesson.id}
              id={id}
              lesson={lesson}
              activeIndex={activeIndex}
              linkPrefix={linkPrefix}
              setIsSidebarOpen={setIsSidebarOpen}
              workshop={workshop}
              isLoggedIn={isLoggedIn}
            ></WorkshopLessonListItem>
          ))}
        </ol>
      )}
    </>
  );
}

function WorkshopLessonListItem({
  lesson,
  id,
  activeIndex,
  linkPrefix,
  setIsSidebarOpen,
  workshop,
  isLoggedIn,
}: {
  lesson: Lesson;
  id: number;
  activeIndex: number;
  linkPrefix: string;
  setIsSidebarOpen: (value: boolean) => void;
  workshop: Workshop;
  isLoggedIn: boolean;
}) {
  function getLessonIconPrefix(lesson: Lesson) {
    if (
      (lesson.available_to === "pro" && !isLoggedIn) ||
      (lesson.available_to === "pro" && !lesson.user_can_view)
    ) {
      return <LockClosedIcon className="w-4 h-4 text-gray-400 basis-5" />;
    }

    if (!isLoggedIn && lesson.available_to !== "pro") {
      return <span className="w-4 h-4 text-green-600 basis-5 ml-0.5" />;
    }

    if (isLoggedIn && lesson.user_can_view) {
      return <MarkCompletedButton lesson={lesson} />;
    }

    return <LockClosedIcon className="w-4 h-4 text-gray-400 basis-5" />;
  }
  return (
    <li
      key={lesson.id}
      className={classNames(
        activeIndex === workshop.lessons.indexOf(lesson)
          ? "  dark:text-white  bg-gray-200 dark:bg-background-700 "
          : "text-gray-500 dark:text-gray-500",
        "flex items-center justify-between gap-3 px-3 py-3 font-light transition rounded-lg mb-1 dark:hover:bg-background-800 hover:bg-gray-200",
      )}
    >
      <div className="flex items-center flex-1 gap-1 ">
        <div className="flex items-center gap-3">
          {getLessonIconPrefix(lesson)}
          <span className="mr-1 text-xs text-gray-400 font- ">
            {workshop.lessons.indexOf(lesson) + 1}.
          </span>{" "}
        </div>
        <Link
          onClick={() => setIsSidebarOpen(false)}
          to={`${linkPrefix}/${lesson.slug}`}
          className="group"
        >
          <h4 className={` max-w-[180px] font-normal inline-block w-full `}>
            <span className="group-hover:underline decoration-brand">
              {lesson.name}
            </span>
          </h4>
        </Link>
      </div>
      <span className="text-sm text-gray-500 dark:text-gray-600">
        {fromSecondsToTimeString(lesson.duration_in_seconds)}
      </span>
    </li>
  );
}
