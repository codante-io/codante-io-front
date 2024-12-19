import { useLocation } from "@remix-run/react";
import CommentSection from "~/components/features/comments/comment-section";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import type { Lesson } from "~/lib/models/lesson.server";
import { cn } from "~/lib/utils/cn";
import { ManualLesson } from "../_routes/trilhas_.$trackSlug.projeto_.$challengeSlug_.$lessonSlug";

type MainContentProps = {
  lesson: Lesson | ManualLesson;
  handleVideoEnded: (lessonId: number) => void;
  isSidebarOpen: boolean;
  showCommentSection?: boolean;
};

export default function MainContent({
  lesson,
  handleVideoEnded,
  isSidebarOpen,
  showCommentSection = true,
}: MainContentProps) {
  const pathname = useLocation().pathname;
  return (
    <div
      className={cn(
        `pb-10 transition-opacity ${
          isSidebarOpen ? "opacity-30" : "opacity-100"
        }`,
        "w-full",
      )}
    >
      <section className="relative flex flex-col gap-10 pb-10">
        <section>
          <div>
            {"type" in lesson && lesson.type === "video" && (
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
              "type" in lesson && lesson.type !== "video" && "mt-0",
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
          <LessonContent content={lesson.content!} />
        </section>
        {"comments" in lesson && showCommentSection && (
          <CommentSection
            comments={lesson.comments}
            commentableId={lesson.id}
            commentableType="Lesson"
            redirectTo={pathname}
          />
        )}
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
