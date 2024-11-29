import { useClickOutside } from "@mantine/hooks";
import { Link } from "@remix-run/react";
import { BsCheck, BsXLg } from "react-icons/bs";
import type { User } from "~/lib/models/user.server";
import type { Workshop } from "~/lib/models/workshop.server";
import CodanteLogoMinimal from "./codante-logo-minimal";
import WorkshopTitle from "./workshop-title";
import WorkshopLessonList from "./workshop-lesson-list";
import type { Challenge } from "~/lib/models/challenge.server";
import { HiMiniArrowSmallLeft } from "react-icons/hi2";
import { cn } from "~/lib/utils/cn";

export default function Sidebar({
  workshop,
  currentLessonId,
  isSidebarOpen,
  isChallenge = false,
  challenge = null,
  setIsSidebarOpen,
  user,
}: {
  workshop: Workshop;
  currentLessonId: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  isChallenge?: boolean;
  challenge?: Challenge | null;
  user: User | null;
}) {
  const ref = useClickOutside(() => setIsSidebarOpen(false));

  return (
    <div
      ref={ref}
      className={`lg:sticky w-80 absolute overflow-y-auto left-0 z-10 bg-background-100 dark:bg-background-900 lg:dark:bg-transparent lg:bg-transparent top-0 flex-col duration-500 transition-all max-h-screen lg:opacity-100 lg:flex lg:translate-x-0 lg:visible flex flex-col gap-10 ${
        isSidebarOpen ? "" : "-translate-x-80"
      }`}
    >
      <div className="px-4 lg:px-0">
        <div className="">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="">
              <CodanteLogoMinimal />
            </Link>

            {isSidebarOpen ? (
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <BsXLg className="text-gray-600 w-7 h-7 dark:text-white" />
              </button>
            ) : (
              <Link
                to={`/${isChallenge ? "mini-projetos" : "workshops"}/${
                  isChallenge ? `${challenge?.slug}/tutorial` : workshop.slug
                }`}
                className="hidden px-2 py-1 text-2xl transition-colors rounded-lg lg:flex lg:items-center hover:bg-gray-200 dark:hover:bg-background-700"
              >
                <span className="flex items-center gap-1 text-sm font-light text-gray-600 dark:text-gray-500 font-lexend">
                  <span className="text-lg">
                    <HiMiniArrowSmallLeft />
                  </span>
                  Voltar
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="max-h-full pb-8 px-2 lg:overflow-y-scroll lg:overscroll-contain scrollbar">
        <div className="relative h-full group/lessons">
          <div ref={ref} className={cn("inset-0", "flex flex-col gap-8")}>
            {Object.entries(workshop.lessons).map(
              ([section, sectionLessons]) => (
                <div key={section} className="last:pb-20">
                  <h3 className="text-lg font-lexend font-semibold mb-2 text-background-700 dark:text-gray-300">
                    {section}
                  </h3>
                  <ul className="list-none mr-4">
                    {sectionLessons.map((lesson, index) => (
                      <Link
                        to={`/workshops/${workshop.slug}/${lesson.slug}`}
                        key={lesson.id}
                      >
                        <li
                          id={`lesson-${lesson.id}`}
                          className=" flex items-center gap-4 dark:hover:bg-background-700 hover:bg-background-150 rounded-xl px-2 group/lesson"
                        >
                          <div className="relative py-[1.4rem]">
                            {index > 0 && (
                              <div
                                className={
                                  "absolute h-[23%] top-0 left-[calc(50%-1px)] w-[2px] rounded-b-full dark:bg-background-600 bg-background-600"
                                }
                              />
                            )}

                            {lesson.user_completed ? (
                              <BsCheck className="w-3 h-3 text-emerald-600 scale-150" />
                            ) : (
                              <div className="relative">
                                {lesson.id === currentLessonId && (
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full dark:bg-white bg-background-600 opacity-75"></span>
                                )}

                                <div
                                  className={cn(
                                    "w-3 h-3 rounded-full dark:bg-background-600 bg-background-600",
                                    lesson.user_completed &&
                                      "dark:bg-emerald-600 bg-emerald-600",
                                    lesson.id === currentLessonId &&
                                      "dark:bg-white bg-background-600 scale-125 ",
                                  )}
                                />
                              </div>
                            )}

                            {index < sectionLessons.length - 1 && (
                              <div
                                className={
                                  "absolute h-[23%] bottom-0 left-[calc(50%-1px)] w-[2px] rounded-t-full dark:bg-background-600 bg-background-600"
                                }
                              />
                            )}
                          </div>
                          <span
                            className={cn(
                              "dark:text-gray-400 text-gray-600 dark:group-hover/lesson:text-white group-hover/lesson:text-background-700 decoration-[1px] underline-offset-1",
                              lesson.id === currentLessonId &&
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
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
