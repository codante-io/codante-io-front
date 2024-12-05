import { Link } from "@remix-run/react";
import SidebarItem from "./sidebar-item";
import { SidebarLesson } from "./types";

export default function SidebarSection({
  name,
  lessons,
  currentLessonId,
}: {
  name: string;
  lessons: SidebarLesson[];
  currentLessonId: number;
}) {
  return (
    <div key={name} className="last:pb-20  ">
      <h3 className="text-lg font-lexend  pb-2 font-semibold z-20 sticky top-0 text-background-700 dark:text-gray-300">
        {name}
      </h3>
      <ul className="list-none mr-4">
        {lessons?.map((lesson, index) => {
          return (
            <Link to={lesson.url} key={lesson.id}>
              <SidebarItem
                id={lesson.id}
                name={lesson.name}
                completed={lesson.user_completed}
                current={lesson.id == currentLessonId}
                isFirst={index === 0}
                isLast={index === lessons.length - 1}
              />
            </Link>
          );
        })}
      </ul>
    </div>
  );
}
