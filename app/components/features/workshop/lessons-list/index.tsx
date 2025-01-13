import { cn } from "~/lib/utils/cn";
import SidebarItem from "~/routes/_layout-raw/_player/components/sidebar/sidebar-item";
import SidebarSectionTitle from "~/routes/_layout-raw/_player/components/sidebar/sidebar-section-title";
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
  const sectionsWithLessons = lessonSections?.map((section) => {
    const sectionLessons = section.lesson_ids.map((id) =>
      lessons.find((lesson) => lesson.id === id),
    );
    return {
      sectionName: section.name,
      lessons: sectionLessons,
    };
  });

  return (
    <ol className="">
      <div className={cn("inset-0", "flex flex-col gap-8")}>
        {sectionsWithLessons?.map((section) => {
          return (
            <div>
              {section.sectionName && (
                <SidebarSectionTitle
                  className="relative pl-4 mb-4 bg-transparent border-b dark:bg-transparent border-b-background-800"
                  key={section.sectionName}
                >
                  {section.sectionName}
                </SidebarSectionTitle>
              )}
              {section.lessons.map((lesson, index) => {
                if (!lesson) return null;
                return (
                  <SidebarItem
                    id={lesson.id}
                    key={lesson.id}
                    name={lesson.name}
                    href={lesson.url}
                    completed={lesson.user_completed}
                    current={lesson.id == nextLessonId}
                    isFirst={index === 0}
                    isLast={index === section.lessons.length - 1}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </ol>
  );
}
