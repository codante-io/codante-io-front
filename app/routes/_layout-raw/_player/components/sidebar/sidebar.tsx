import { useClickOutside } from "@mantine/hooks";
import { cn } from "~/lib/utils/cn";
import type {
  SidebarLesson,
  SidebarSection as SidebarSectionType,
} from "./types";
import SidebarSection from "./sidebar-section";

type SidebarProps = {
  sections?: SidebarSectionType[];
  sidebarLessons: SidebarLesson[] | null;
  currentLessonId: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

export default function Sidebar({
  sections,
  sidebarLessons,
  currentLessonId,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const ref = useClickOutside(() => setIsSidebarOpen(false));

  return (
    <div
      ref={ref}
      className={`sticky top-6 w-80 max-h-screen overflow-y-auto left-0 z-10 bg-background-100 dark:bg-background-900 lg:dark:bg-transparent lg:bg-transparent duration-500 transition-all  lg:opacity-100 lg:flex lg:translate-x-0 lg:visible flex flex-col gap-10 ${
        isSidebarOpen ? "" : "-translate-x-80"
      }`}
    >
      <div className=" lg:overflow-y-scroll overscroll-y-contain  dark:scrollbar">
        <div className="relative  group/lessons">
          <div ref={ref} className="inset-0 flex flex-col gap-8 ">
            {sections && sections.length > 0 && sidebarLessons
              ? sections.map((section) => {
                  const sectionLessons = section.lesson_ids.map((id) =>
                    sidebarLessons.find((lesson) => lesson.id === id),
                  );
                  return (
                    <SidebarSection
                      key={section.name}
                      name={section.name}
                      lessons={sectionLessons.filter(
                        (lesson): lesson is SidebarLesson =>
                          lesson !== undefined,
                      )}
                      currentLessonId={currentLessonId}
                    />
                  );
                })
              : sidebarLessons && (
                  <SidebarSection
                    name="Aulas"
                    lessons={sidebarLessons}
                    currentLessonId={currentLessonId}
                  />
                )}
          </div>
        </div>
      </div>
    </div>
  );
}
