import SidebarItem from "./sidebar-item";
import SidebarSectionTitle from "./sidebar-section-title";
import { SidebarLesson } from "./types";

type SidebarSectionProps = {
  name: string;
  lessons: SidebarLesson[];
  currentLessonId: number;
};

export default function SidebarSection({
  name,
  lessons,
  currentLessonId,
}: SidebarSectionProps) {
  return (
    <div className="last:pb-20  ">
      {name && (
        <SidebarSectionTitle className="border-b border-b-background-800 mb-4 pl-4 bg-transparent">
          {name}
        </SidebarSectionTitle>
      )}
      {lessons?.map((lesson, index) => {
        return (
          <SidebarItem
            id={lesson.id}
            key={lesson.id}
            name={lesson.name}
            href={lesson.url}
            completed={lesson.user_completed}
            current={lesson.id == currentLessonId}
            isFirst={index === 0}
            isLast={index === lessons.length - 1}
          />
        );
      })}
    </div>
  );
}
