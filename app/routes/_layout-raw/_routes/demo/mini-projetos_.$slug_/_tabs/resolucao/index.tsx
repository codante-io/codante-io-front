import { useNavigate, useOutletContext } from "react-router";
import type { Challenge } from "~/lib/models/challenge.server";
import LessonsList from "~/components/features/workshop/lessons-list";
import NextLessonPreview from "~/components/features/workshop/next-lesson-preview";
import type { User } from "~/lib/models/user.server";

export default function Solution() {
  const context = useOutletContext<{ challenge: Challenge; user: User }>();
  // const user = useUserFromOutletContext();
  const navigate = useNavigate();
  const challenge = context?.challenge;

  if (!challenge?.has_solution) {
    return navigate(`/mini-projetos/${challenge?.slug}`);
  }

  const lessons = challenge.solution.lessons;
  const lessonSections = challenge.solution.lesson_sections;
  const nextLesson = challenge.solution.first_unwatched_lesson;

  return (
    <div className="container">
      <div className="flex flex-wrap md:flex-nowrap md:gap-5 lg:gap-14">
        {/* left Side */}
        <div className="w-full mb-6 lb:mt-12 pointer-events-none">
          {/* Video */}
          <NextLessonPreview
            lessonName={nextLesson.name}
            lessonNumber={lessons.findIndex((l) => l.id === nextLesson.id) + 1}
            lessonUrl={nextLesson.url}
            thumbnailUrl={nextLesson.thumbnail_url}
            type={
              lessons[0].id === nextLesson.id ? "watch-now" : "keep-watching"
            }
          />
        </div>
        {/* Right Side */}
        <div className="mx-auto space-y-12 md:w-3/5 pointer-events-none">
          {/* Aulas */}
          <LessonsList
            lessons={lessons}
            lessonSections={lessonSections}
            nextLessonId={nextLesson.id}
          />
        </div>
      </div>
    </div>
  );
}
