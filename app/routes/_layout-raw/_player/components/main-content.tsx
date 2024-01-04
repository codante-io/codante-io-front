import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineSkipNext } from "react-icons/md";
import LinkToLoginWithRedirect from "~/components/features/link-to-login-with-redirect";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import ProfileMenu from "~/components/_layouts/navbar/profile-menu";
import ToggleColorMode from "~/components/ui/toggle-color-mode";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import type { Lesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import type { Workshop } from "~/lib/models/workshop.server";
import Breadcrumbs from "./workshop-breadcrumbs";
import WorkshopResourcesMenuButton from "./workshop-resources-menu-button";

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
      <div className="flex items-center justify-between h-8">
        <Breadcrumbs
          workshop={workshop}
          lesson={lesson}
          isChallenge={isChallenge}
          challenge={challenge}
        />
        <div className="flex items-center gap-2">
          <div>
            {workshop.resources && workshop.resources.length > 0 && (
              <WorkshopResourcesMenuButton resources={workshop.resources} />
            )}
          </div>
          {nextLessonPath() && (
            <Link to={nextLessonPath() ?? ""}>
              <div className="flex items-center p-2 text-3xl text-gray-500 transition-colors rounded-lg hover:bg-gray-200 dark:hover:bg-background-700 dark:text-gray-500 hover:text-brand dark:hover:text-brand">
                <MdOutlineSkipNext className="inline-block" />
              </div>
            </Link>
          )}
        </div>
      </div>
      <div className="mt-3">
        <VimeoPlayer
          vimeoUrl={lesson.video_url || ""}
          available_to={lesson.available_to}
          onVideoEnded={() => handleVideoEnded(lesson.id)}
          thumbnailURL={lesson.thumbnail_url}
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
