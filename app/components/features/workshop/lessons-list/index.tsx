import { cn } from "~/lib/utils/cn";
import SidebarSection from "~/routes/_layout-raw/_player/components/sidebar/sidebar-section";
import { SidebarLesson } from "~/routes/_layout-raw/_player/components/sidebar/types";

type LessonsListProps = {
  lessons: SidebarLesson[];
  lessonSections?: {
    name: string;
    lesson_ids: number[];
  }[];
  nextLessonId?: number;
};

export default function LessonsList({
  lessonSections,
  lessons,
  nextLessonId,
}: LessonsListProps) {
  return (
    <ol className="">
      <div className={cn("inset-0", "flex flex-col gap-8")}>
        {lessonSections ? (
          lessonSections.map((section) => {
            const sectionLessons = section.lesson_ids.map((id) =>
              lessons.find((lesson) => lesson.id === id),
            );
            return (
              <SidebarSection
                key={section.name}
                name={section.name}
                lessons={sectionLessons.filter(
                  (lesson): lesson is SidebarLesson => lesson !== undefined,
                )}
                currentLessonId={nextLessonId ?? 0}
              />
            );
          })
        ) : (
          <SidebarSection
            name="Aulas"
            lessons={lessons}
            currentLessonId={nextLessonId ?? 0}
          />
        )}
      </div>
    </ol>
  );
}
