import { LockClosedIcon } from "@heroicons/react/24/solid";
import { LockOpenIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import type { Challenge } from "~/models/challenge.server";
import type { Lesson } from "~/models/lesson.server";
import type { Workshop } from "~/models/workshop.server";
import classNames from "~/utils/class-names";
import { fromSecondsToTimeString } from "~/utils/interval";
import MarkCompletedButton from "./mark-completed-button";

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

  function getLessonIconPrefix(lesson: Lesson) {
    if (isLoggedIn && lesson.user_can_view) {
      return <MarkCompletedButton lesson={lesson} />;
    }

    if (!isLoggedIn && lesson.user_can_view) {
      return <LockOpenIcon className="w-4 h-4 text-green-600 basis-5 ml-0.5" />;
    }

    return <LockClosedIcon className="w-4 h-4 text-gray-400 basis-5" />;
  }

  return (
    <ol className="mt-4">
      {workshop.lessons.map((lesson: Lesson, id: number) => (
        <li
          key={lesson.id}
          className={classNames(
            activeIndex === id
              ? "bg-background-200 dark:bg-background-800 dark:text-white"
              : "text-gray-500 dark:text-gray-500",
            "flex items-center justify-between gap-3 px-3 py-3 font-light transition rounded-lg mb-1 dark:hover:bg-background-800 hover:bg-background-200"
          )}
        >
          <div className="flex items-center flex-1 gap-1 ">
            <div className="flex items-center gap-3">
              {getLessonIconPrefix(lesson)}
              {/* <span className={` text-xs dark:text-gray-600 mr-2`}>
                {id + 1}.
              </span> */}
              <span className="mr-1 text-xs text-gray-400 font- ">
                {id + 1}.
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
      ))}
    </ol>
  );
}

// Aula Aberta  - Se estou logado, mostra o botão de marcar como concluída | Deslogado, não mostra o botão, mas não mostra o cadeado
// Aula Fechada - Se estou logado, mostra o botão de marcar como concluída | Deslogado, não mostra o botão, mas mostra o cadeado
