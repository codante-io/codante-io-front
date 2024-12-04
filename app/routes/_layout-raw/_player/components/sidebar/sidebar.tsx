import { useClickOutside } from "@mantine/hooks";
import { cn } from "~/lib/utils/cn";
import type {
  SidebarLesson,
  SidebarSection as SidebarSectionType,
} from "./types";
import SidebarSection from "./sidebar-section";

type SidebarProps = {
  sections: SidebarSectionType[];
  sidebarLessons: SidebarLesson[];
  currentLessonId: string;
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
      className={`lg:sticky w-80 py-10 absolute overflow-y-auto left-0 z-10 bg-background-100 dark:bg-background-900 lg:dark:bg-transparent lg:bg-transparent top-0 duration-500 transition-all max-h-screen lg:opacity-100 lg:flex lg:translate-x-0 lg:visible flex flex-col gap-10 ${
        isSidebarOpen ? "" : "-translate-x-80"
      }`}
    >
      <div className="max-h-full pb-8 px-2 lg:overflow-y-scroll lg:overscroll-contain dark:scrollbar ">
        <div className="relative h-full group/lessons">
          <div ref={ref} className={cn("inset-0", "flex flex-col gap-8")}>
            {sections.map((section) => {
              const sectionLessons = section.lesson_ids.map((id) =>
                sidebarLessons.find((lesson) => lesson.id === id),
              );
              return (
                <SidebarSection
                  key={section.name}
                  name={section.name}
                  lessons={sectionLessons.filter(
                    (lesson): lesson is SidebarLesson => lesson !== undefined,
                  )}
                  currentLessonId={currentLessonId}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
