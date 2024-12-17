import { useLocation } from "@remix-run/react";
import CommentSection from "~/components/features/comments/comment-section";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import type { Lesson } from "~/lib/models/lesson.server";
import { cn } from "~/lib/utils/cn";

type MainContentProps = {
  lesson: Lesson & {
    content: string | JSX.Element;
  };
  handleVideoEnded: (lessonId: number) => void;
  isSidebarOpen: boolean;
};

export default function MainContent({
  lesson,
  handleVideoEnded,
  isSidebarOpen,
}: MainContentProps) {
  const pathname = useLocation().pathname;
  return (
    <div
      className={`pb-10  transition-opacity ${
        isSidebarOpen ? "opacity-30" : "opacity-100"
      }`}
    >
      <section className="relative  flex flex-col gap-10 pb-10">
        <section>
          <div>
            {lesson.type === "video" && (
              <VimeoPlayer
                vimeoUrl={lesson.video_url || ""}
                available_to={lesson.available_to}
                onVideoEnded={() => handleVideoEnded(lesson.id)}
                thumbnailURL={lesson.thumbnail_url}
                autoplay={true}
                title={lesson.name}
                labelledBy="video-title"
                describedBy="video-description"
              />
            )}
          </div>
          <h1
            id="video-title"
            className={cn(
              "mt-12 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl font-lexend",
              !lesson.video_url && "mt-0",
            )}
          >
            {lesson?.name}
          </h1>
          <p
            id="video-description"
            className="mt-2 sm:text-lg md:text-xl lg:mt-4 lg:text-[22px] lg:leading-snug font-light dark:text-gray-300 text-gray-500"
          >
            {lesson?.description}
          </p>
          <LessonContent content={lesson.content} />
        </section>
        <CommentSection
          comments={lesson.comments}
          commentableId={lesson.id}
          commentableType="Lesson"
          redirectTo={pathname}
        />
      </section>
    </div>
  );
}

// Componente responsável por renderizar o conteúdo da lição (seja ele markdown ou JSX).
function LessonContent({ content }: { content: JSX.Element | string }) {
  return (
    <div>
      {typeof content === "string" ? (
        <MarkdownRenderer markdown={content} />
      ) : (
        content
      )}
    </div>
  );
}
