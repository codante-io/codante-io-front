import { Bars3Icon } from "@heroicons/react/24/outline";
import { BsArrowRight } from "react-icons/bs";
import LinkToLoginWithRedirect from "~/components/link-to-login-with-redirect";
import ProfileMenu from "~/components/navbar/profile-menu";
import ToggleColorMode from "~/components/toggle-color-mode";
import type { Lesson } from "~/models/lesson.server";
import type { User } from "~/models/user.server";
import type { Workshop } from "~/models/workshop.server";
import Breadcrumbs from "./workshop-breadcrumbs";
import { Link } from "@remix-run/react";
import { MdOutlineSkipNext } from "react-icons/md";
import VimeoPlayer from "~/components/vimeo-player";
import MarkdownRenderer from "~/components/markdown-renderer";

type MainContentProps = {
  setIsSidebarOpen: (value: boolean) => void;
  isSidebarOpen: boolean;
  user: User | null;
  workshop: Workshop;
  isChallenge?: boolean;
  lesson: Lesson;
  challenge?: any;
  nextLessonPath: () => string | null;
  handleVideoEnded: (lessonId: string) => void;
};

export default function MainContent({
  setIsSidebarOpen,
  isSidebarOpen,
  isChallenge = false,
  challenge = null,
  user,
  workshop,
  lesson,
  nextLessonPath,
  handleVideoEnded,
}: MainContentProps) {
  return (
    <section className="relative">
      <div className="flex items-center justify-between h-20 lg:justify-end">
        <button className="" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <Bars3Icon className="w-8 h-8 text-gray-600 dark:text-white lg:invisible" />
        </button>
        <div className="flex items-center">
          <div className="mr-3">
            <ToggleColorMode />
          </div>
          {user ? (
            <div className="static inset-y-0 inset-auto right-0 flex items-center ">
              {/* Profile dropdown */}
              <ProfileMenu user={user} />
            </div>
          ) : (
            <LinkToLoginWithRedirect className="static inset-y-0 inset-auto right-0 flex items-center text-gray-700 dark:text-white gap-x-1">
              Login <BsArrowRight className="hidden md:inline" />
            </LinkToLoginWithRedirect>
          )}
        </div>
      </div>
      <div className="flex items-start justify-between h-8">
        <Breadcrumbs
          workshop={workshop}
          lesson={lesson}
          isChallenge={isChallenge}
          challenge={challenge}
        />
        {nextLessonPath() && (
          <Link to={nextLessonPath() ?? ""}>
            <div className="flex items-start px-1 pl-2 text-3xl text-gray-600 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-background-700 dark:text-gray-500">
              <MdOutlineSkipNext className="inline-block" />
            </div>
          </Link>
        )}
      </div>
      <div className="mt-2">
        <VimeoPlayer
          vimeoUrl={lesson.video_url || ""}
          onVideoEnded={() => handleVideoEnded(lesson.id)}
          autoplay={true}
        />
      </div>
      <h1 className="mt-12 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl font-lexend">
        {lesson?.name}
      </h1>
      <p className="mt-2 sm:text-lg md:text-xl lg:mt-4 lg:text-[22px] lg:leading-snug font-light dark:text-gray-300 text-gray-500">
        {lesson?.description}
      </p>
      {lesson.content && (
        <div>
          <MarkdownRenderer markdown={lesson.content} />
        </div>
      )}
    </section>
  );
}
