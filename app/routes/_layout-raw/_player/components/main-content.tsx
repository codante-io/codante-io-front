import { useLocation } from "@remix-run/react";
import CommentSection from "~/components/features/comments/comment-section";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import type { Lesson } from "~/lib/models/lesson.server";

type MainContentProps = {
  lesson: Lesson;
  handleVideoEnded: (lessonId: number) => void;
};

export default function MainContent({
  lesson,
  handleVideoEnded,
}: MainContentProps) {
  const pathname = useLocation().pathname;
  return (
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
          className="mt-12 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl font-lexend"
        >
          {lesson?.name}
        </h1>
        <p
          id="video-description"
          className="mt-2 sm:text-lg md:text-xl lg:mt-4 lg:text-[22px] lg:leading-snug font-light dark:text-gray-300 text-gray-500"
        >
          {lesson?.description}
        </p>
      </section>
      {lesson.content && (
        <div>
          <MarkdownRenderer markdown={lesson.content} />
        </div>
      )}
      <CommentSection
        comments={lesson.comments}
        commentableId={lesson.id}
        commentableType="Lesson"
        redirectTo={pathname}
      />
    </section>
  );
}
