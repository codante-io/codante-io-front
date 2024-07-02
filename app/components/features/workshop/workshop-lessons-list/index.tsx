import { Link } from "@remix-run/react";
import { IoLockClosed } from "react-icons/io5";
import { Fragment } from "react/jsx-runtime";
import BecomeProDialog from "~/components/ui/become-pro-dialog";
import type { Lesson } from "~/lib/models/lesson.server";
import type { Workshop } from "~/lib/models/workshop.server";
import { fromSecondsToTimeString } from "~/lib/utils/interval";

type WorkshopLessonsListProps = {
  workshop: Workshop;
  activeIndex: number;
  isChallengeResolution?: boolean;
  challengeSlug?: string;
};

export default function WorkshopLessonsList({
  workshop,
  activeIndex,
  isChallengeResolution = false,
  challengeSlug = "",
}: WorkshopLessonsListProps) {
  // if is challenge resolution, we need to add the challenge slug to the link
  // so we can navigate to the correct lesson
  const linkPrefix = isChallengeResolution
    ? `/mini-projetos/${challengeSlug}/resolucao`
    : `/workshops/${workshop.slug}`;

  return (
    <ol className="mt-4">
      {workshop.lesson_sections
        ? workshop.lesson_sections.map((section, index) => (
            <Fragment key={index}>
              <li className="px-3 py-2 text-gray-600 dark:text-gray-500 mt-4 text-sm font-light">
                {section.name}
              </li>
              <div className="w-full border-b dark:border-b-background-800 border-background-100" />
              {section.lessons.map((lessonId: string, id: number) => (
                <LessonLink
                  key={lessonId}
                  workshop={workshop}
                  lessonId={lessonId}
                  linkPrefix={linkPrefix}
                  index={workshop.lessons.findIndex((l) => l.id === lessonId)}
                  activeIndex={activeIndex}
                />
              ))}
            </Fragment>
          ))
        : workshop.lessons.map((lesson: Lesson, id: number) => (
            <LessonLink
              key={lesson.id}
              workshop={workshop}
              lessonId={lesson.id}
              linkPrefix={linkPrefix}
              index={id}
              activeIndex={activeIndex}
            />
          ))}
    </ol>
  );
}

function LessonLink({
  workshop,
  lessonId,
  linkPrefix,
  index,
  activeIndex,
}: {
  workshop: Workshop;
  lessonId: string;
  linkPrefix: string;
  index: number;
  activeIndex: number;
}) {
  const lesson = workshop.lessons.find((l) => l.id === lessonId)!;

  return (
    <Link key={lessonId} to={`${linkPrefix}/${lesson.slug}`}>
      <li
        className={`flex items-center justify-between gap-3 px-3 py-3 font-light transition rounded-lg cursor-pointer hover:bg-background-200 dark:hover:bg-background-800 mb-1 ${
          activeIndex === index
            ? "bg-background-200 dark:bg-background-800 font-semibold"
            : ""
        }`}
      >
        <span className={`mr-3 text-sm text-brand-400`}>
          {lesson.user_can_view ? (
            `${index + 1}.`
          ) : (
            <IoLockClosed className="w-3 h-3" />
          )}
        </span>
        <h4
          className={`flex-1 inline-block mr-2 text-gray-700 dark:text-gray-50`}
        >
          {lesson.name}
        </h4>
        <span className="text-sm text-gray-500 dark:text-gray-400 ">
          {fromSecondsToTimeString(lesson.duration_in_seconds)}
        </span>
      </li>
    </Link>
  );
}
