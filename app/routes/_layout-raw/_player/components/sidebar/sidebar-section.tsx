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
        <SidebarSectionTitle className="border-b border-b-background-800 mb-4 pl-4">
          {name}
        </SidebarSectionTitle>
      )}
      {lessons?.map((lesson, index) => {
        return (
          <SidebarItem
            id={lesson.id}
            key={lesson.id}
            name={lesson.name}
            slug={lesson.slug}
            completed={lesson.user_completed}
            userCanView={lesson.user_can_view}
            current={lesson.id == currentLessonId}
            isFirst={index === 0}
            isLast={index === lessons.length - 1}
          />
        );
      })}
    </div>
  );
}
