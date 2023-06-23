import { useClickOutside } from "@mantine/hooks";
import { Link } from "@remix-run/react";
import { BsXLg } from "react-icons/bs";
import { TiArrowBackOutline } from "react-icons/ti";
import type { User } from "~/models/user.server";
import type { Workshop } from "~/models/workshop.server";
import CodanteLogoMinimal from "./codante-logo-minimal";
import WorkshopTitle from "./workshop-title";
import WorkshopLessonList from "./workshop-lesson-list";

export default function Sidebar({
  workshop,
  activeIndex,
  isSidebarOpen,
  setIsSidebarOpen,
  user,
}: {
  workshop: Workshop;
  activeIndex: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  user: User | null;
}) {
  const ref = useClickOutside(() => setIsSidebarOpen(false));

  return (
    <div
      ref={ref}
      className={`lg:sticky w-80 absolute overflow-y-auto left-0 z-10 bg-background-900 lg:bg-transparent top-0 flex-col duration-500 transition-all max-h-screen lg:opacity-100 lg:flex lg:translate-x-0 lg:visible ${
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
                to={`/workshops/${workshop.slug}`}
                className="hidden px-2 py-1 text-2xl transition-colors rounded-lg lg:block hover:bg-gray-200 dark:hover:bg-background-700"
              >
                <TiArrowBackOutline className="text-gray-600 dark:text-gray-500" />
              </Link>
            )}
          </div>
        </div>
        <div className="">
          <WorkshopTitle isLoggedIn={!!user} workshop={workshop} />
        </div>
      </div>

      <div
        className="max-h-full pb-8 pr-4 lg:overflow-y-scroll lg:overscroll-contain"
        style={{}}
      >
        {workshop.lessons.length > 0 && (
          <>
            <WorkshopLessonList
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
