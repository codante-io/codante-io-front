import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { BsCheck } from "react-icons/bs";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils/cn";
import { SidebarLesson } from "~/routes/_layout-raw/_player/components/sidebar/types";

interface WorkshopLessonsProps {
  lessons: SidebarLesson[];
  workshopSlug: string;
  lesson_sections?: { name: string; lesson_ids: number[] }[];
}

function findNextLessonId(lessons: SidebarLesson[]) {
  const lessonsArray = Object.values(lessons).flat();

  const nextLesson = lessonsArray.find(
    (lesson, index, array) =>
      !lesson.user_completed && array[index - 1]?.user_completed,
  );

  const lastCompletedLesson = lessonsArray.find(
    (lesson) => lesson.user_completed,
  );

  return {
    nextLessonId: nextLesson?.id || lessonsArray[0]?.id || null,
    lastCompletedLessonId: lastCompletedLesson?.id || null,
  };
}

export function WorkshopLessons({
  lessons,
  lesson_sections,
}: WorkshopLessonsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { nextLessonId, lastCompletedLessonId } = findNextLessonId(lessons);

  useEffect(() => {
    if (lastCompletedLessonId) {
      ref.current?.scrollTo({ top: ref.current.offsetTop, behavior: "smooth" });
    }
  }, [lastCompletedLessonId]);

  return (
    <div className="relative h-full group/lessons">
      <div
        ref={ref}
        className={cn(
          "inset-0",
          isOpen
            ? "flex flex-col gap-8"
            : "group-hover/lessons:overflow-y-auto overflow-y-hidden h-80 lg:h-auto lg:absolute group-hover/lessons:dark:scrollbar scrollbar-transparent flex flex-col gap-8",
        )}
      >
        {lesson_sections && lesson_sections.length > 0
          ? lesson_sections.map((section) => {
              const sectionLessons = section.lesson_ids.map((id) =>
                lessons.find((lesson) => lesson.id === id),
              );
              return (
                <div key={section.name} className="last:pb-20">
                  <h3 className="text-lg font-lexend font-semibold mb-2 text-background-700 dark:text-gray-300">
                    {section.name}
                  </h3>
                  <ul className="list-none mr-4">
                    {sectionLessons
                      .filter(
                        (lesson): lesson is SidebarLesson =>
                          lesson !== undefined,
                      )
                      .map((lesson, index) => (
                        <Link to={lesson.url} key={lesson.id}>
                          <li
                            id={`lesson-${lesson.id}`}
                            className="flex items-center gap-4 dark:hover:bg-background-700 hover:bg-background-150 rounded-xl px-2 group/lesson"
                          >
                            <div className="relative py-[1.2rem]">
                              {index > 0 && (
                                <div
                                  className={cn(
                                    `absolute h-[23%] top-0 left-[calc(50%-1px)] w-[2px] rounded-b-full dark:bg-background-600 bg-background-600`,
                                  )}
                                />
                              )}

                              {lesson.user_completed ? (
                                <BsCheck className="w-3 h-3 text-emerald-600 scale-150" />
                              ) : (
                                <div className="relative">
                                  {lesson.id === nextLessonId && (
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full dark:bg-white bg-background-600 opacity-75"></span>
                                  )}

                                  <div
                                    className={cn(
                                      "w-3 h-3 rounded-full dark:bg-background-600 bg-background-600",
                                      lesson.user_completed &&
                                        "dark:bg-emerald-600 bg-emerald-600",
                                      lesson.id === nextLessonId &&
                                        "dark:bg-white bg-background-600 scale-125 ",
                                    )}
                                  />
                                </div>
                              )}

                              {index < sectionLessons.length - 1 && (
                                <div
                                  className={cn(
                                    `absolute h-[23%] bottom-0 left-[calc(50%-1px)] w-[2px] rounded-t-full dark:bg-background-600 bg-background-600`,
                                  )}
                                />
                              )}
                            </div>
                            <span
                              className={cn(
                                "dark:text-gray-400 text-gray-600 dark:group-hover/lesson:text-white group-hover/lesson:text-background-700 decoration-[1px] underline-offset-1",
                                lesson.id === nextLessonId &&
                                  "font-semibold dark:text-white text-background-700",
                              )}
                            >
                              {lesson.name}
                            </span>
                          </li>
                        </Link>
                      ))}
                  </ul>
                </div>
              );
            }) // abaixo, quando não há sections. vamos fazer o map direto nas lessons.
          : lessons.map((lesson) => (
              <Link to={lesson.url} key={lesson.id}>
                <li
                  id={`lesson-${lesson.id}`}
                  className="flex items-center gap-4 dark:hover:bg-background-700 hover:bg-background-150 rounded-xl px-2 group/lesson"
                >
                  <div className="relative py-[1.2rem]">
                    <div
                      className={cn(
                        `absolute h-[23%] top-0 left-[calc(50%-1px)] w-[2px] rounded-b-full dark:bg-background-600 bg-background-600`,
                      )}
                    />
                    {lesson.user_completed ? (
                      <BsCheck className="w-3 h-3 text-emerald-600 scale-150" />
                    ) : (
                      <div className="relative">
                        {lesson.id === nextLessonId && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full dark:bg-white bg-background-600 opacity-75"></span>
                        )}
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full dark:bg-background-600 bg-background-600",
                            lesson.user_completed &&
                              "dark:bg-emerald-600 bg-emerald-600",
                            lesson.id === nextLessonId &&
                              "dark:bg-white bg-background-600 scale-125 ",
                          )}
                        />
                      </div>
                    )}
                    <div
                      className={cn(
                        `absolute h-[23%] bottom-0 left-[calc(50%-1px)] w-[2px] rounded-t-full dark:bg-background-600 bg-background-600`,
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      "dark:text-gray-400 text-gray-600 dark:group-hover/lesson:text-white group-hover/lesson:text-background-700 decoration-[1px] underline-offset-1",
                      lesson.id === nextLessonId &&
                        "font-semibold dark:text-white text-background-700",
                    )}
                  >
                    {lesson.name}
                  </span>
                </li>
              </Link>
            ))}
      </div>
      <div className="flex absolute bottom-0 left-0 w-full h-24 bg-linear-to-t dark:from-background-800 from-background-50 to-transparent items-end justify-end pb-4 pr-8 pointer-events-none">
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          size="sm"
          variant="outline"
          className="rounded-full text-xs dark:bg-background-700 bg-background-100 dark:hover:bg-background-600 hover:bg-background-150 dark:text-background-200 opacity-0 group-hover/lessons:opacity-100 transition-all duration-300 pointer-events-auto"
        >
          {isOpen ? (
            <>
              Esconder <MdExpandLess className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Expandir <MdExpandMore className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
