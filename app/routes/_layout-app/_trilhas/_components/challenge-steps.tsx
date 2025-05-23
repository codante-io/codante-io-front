import { useRef } from "react";
import { cn } from "~/lib/utils/cn";
import SidebarItem from "~/routes/_layout-raw/_player/components/sidebar/sidebar-item";
import { SidebarLesson } from "~/routes/_layout-raw/_player/components/sidebar/types";

interface ChallengeLessonsProps {
  challengeSlug: string;
  trackLessons: SidebarLesson[];
}

// function findNextLessonId(lessons: LessonsGroupedBySection) {
//   const lessonsArray = Object.values(lessons).flat();

//   const nextLesson = lessonsArray.find(
//     (lesson, index, array) =>
//       !lesson.user_completed && array[index - 1]?.user_completed,
//   );

//   const lastCompletedLesson = lessonsArray.find(
//     (lesson) => lesson.user_completed,
//   );

//   return {
//     nextLessonId: nextLesson?.id || lessonsArray[0]?.id || null,
//     lastCompletedLessonId: lastCompletedLesson?.id || null,
//   };
// }

export function ChallengeSteps({ trackLessons }: ChallengeLessonsProps) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="relative h-full group/lessons">
      <div
        ref={ref}
        className={cn(
          "inset-0",
          "group-hover/lessons:overflow-y-auto overflow-y-hidden lg:h-auto lg:absolute group-hover/lessons:dark:scrollbar scrollbar-transparent flex flex-col gap-8",
        )}
      >
        <ul className="list-none mr-4">
          {trackLessons.map((lesson, index) => {
            return (
              <SidebarItem
                id={lesson.id}
                name={lesson.name}
                userCanView={lesson.user_can_view}
                current={false}
                completed={lesson.user_completed}
                url={lesson.url}
                isFirst={index === 0}
                isLast={index === trackLessons.length - 1}
              />
            );
          })}
        </ul>

        {/* Aulas do Challenge */}
        {/* <ul className="list-none mr-4">
          {solution.lessons.map((lesson, index) => (
            <SidebarItem
              key={lesson.id}
              id={lesson.id}
              name={lesson.name}
              current={lesson.id === nextLessonId}
              completed={lesson.user_completed}
              href={`/mini-projetos/${challengeSlug}/aula/${lesson.id}`}
              isFirst={index === 0}
              isLast={index === solution.lessons.length - 1}
            />
          ))}
        </ul> */}
      </div>
      {/* <div className="flex absolute bottom-0 left-0 w-full h-24 bg-linear-to-t dark:from-background-800 from-background-50 to-transparent items-end justify-end pb-4 pr-8 pointer-events-none">
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          size="sm"
          variant="outline"
          className="rounded-full text-xs dark:bg-background-700 bg-background-100 dark:hover:bg-background-600 hover:bg-background-150 dark:text-background-200 opacity-0 group-hover/lessons:opacity-100 transition-all duration-300 pointer-events-auto"
        >
          {isOpen ? (
            <>
              Esconder <MdExpandLess className="w-4 h-4 ml-2" />
            </>
          ) : (
            <>
              Expandir <MdExpandMore className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div> */}
    </div>
  );
}
