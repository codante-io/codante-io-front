import { useClickOutside } from "@mantine/hooks";
import { Link } from "@remix-run/react";
import { BsXLg } from "react-icons/bs";
import type { User } from "~/models/user.server";
import type { Workshop } from "~/models/workshop.server";
import CodanteLogoMinimal from "./codante-logo-minimal";
import WorkshopTitle from "./workshop-title";
import WorkshopLessonList from "./workshop-lesson-list";
import type { Challenge } from "~/models/challenge.server";

export default function Sidebar({
  workshop,
  activeIndex,
  isSidebarOpen,
  isChallenge = false,
  challenge = null,
  setIsSidebarOpen,
  user,
}: {
  workshop: Workshop;
  activeIndex: number;
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
      className={`lg:sticky w-80 absolute overflow-y-auto left-0 z-10 bg-background-100 dark:bg-background-900 lg:dark:bg-transparent lg:bg-transparent top-0 flex-col duration-500 transition-all max-h-screen lg:opacity-100 lg:flex lg:translate-x-0 lg:visible ${
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
                  isChallenge ? `${challenge?.slug}/resolucao` : workshop.slug
                }`}
                className="hidden px-2 py-1 text-2xl transition-colors rounded-lg lg:flex lg:items-center hover:bg-gray-200 dark:hover:bg-background-700"
              >
                {/* <TiArrowBackOutline className="text-gray-600 dark:text-gray-500 text-xl" /> */}

                <span className="flex items-center gap-1 text-sm font-light text-gray-600 dark:text-gray-500 font-lexend">
                  <span className="text-lg">&larr;</span>
                  Voltar
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="">
          <WorkshopTitle
            isLoggedIn={!!user}
            workshop={workshop}
            isChallenge={isChallenge}
            challenge={challenge}
          />
        </div>
      </div>

      <div
        className="max-h-full pb-8 px-2 lg:overflow-y-scroll lg:overscroll-contain"
        style={{}}
      >
        {workshop.lessons.length > 0 && (
          <>
            <WorkshopLessonList
              isChallenge={isChallenge}
              challenge={challenge}
              workshop={workshop}
              activeIndex={activeIndex}
              isLoggedIn={!!user}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </>
        )}
      </div>
    </div>
  );
}
