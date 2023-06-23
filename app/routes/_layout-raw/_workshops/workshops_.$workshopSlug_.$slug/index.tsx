import { Bars3Icon } from "@heroicons/react/24/solid";
import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { MdOutlineSkipNext } from "react-icons/md";
import LinkToLoginWithRedirect from "~/components/link-to-login-with-redirect";
import MarkdownRenderer from "~/components/markdown-renderer";
import ProfileMenu from "~/components/navbar/profile-menu";
import ToggleColorMode from "~/components/toggle-color-mode";
import VimeoPlayer from "~/components/vimeo-player";
import { useColorMode } from "~/contexts/color-mode-context";
import type { Lesson } from "~/models/lesson.server";
import type { User } from "~/models/user.server";
import type { Workshop } from "~/models/workshop.server";
import { getWorkshop } from "~/models/workshop.server";
import { abort404 } from "~/utils/responses.server";
import Sidebar from "./components/sidebar";
import Breadcrumbs from "./components/workshop-breadcrumbs";
import styles from "./styles.css";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export async function loader({
  params,
  request,
}: {
  params: any;
  request: any;
}) {
  const workshop = await getWorkshop(params.workshopSlug, request);
  const lesson = workshop?.lessons.find(
    (lesson) => lesson.slug === params.slug
  );

  if (!workshop || !lesson) {
    return abort404();
  }

  return {
    workshop: workshop,
    lesson: lesson,
    activeIndex: workshop.lessons.findIndex(
      (lesson: Lesson) => lesson.slug === params.slug
    ),
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const workshop: Workshop = loaderData.workshop;
  const activeIndex = loaderData.activeIndex;
  const lesson = loaderData.lesson;
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  async function handleVideoEnded(lessonId: string) {
    if (user) {
      fetcher.submit(
        { lessonId, markCompleted: "true" },
        { method: "post", action: "/api/set-watched?index" }
      );
    }
    if (nextLessonPath()) {
      navigate(nextLessonPath());
    }
  }

  function nextLessonPath() {
    const nextLesson = workshop.lessons[activeIndex + 1];
    if (nextLesson) {
      return `/workshops/${workshop.slug}/${nextLesson.slug}`;
    } else {
      return "";
    }
  }

  const { colorMode } = useColorMode();
  return (
    <div
      className={` min-h-screen max-w-[1600px] flex  lg:grid transition-all duration-500 lg:grid-cols-[350px,1fr] mx-auto lg:gap-8 justify-center  lg:min-h-[calc(100vh-200px)] relative lg:px-8 
      ${colorMode === "dark" ? "darkScroll" : "lightScroll"}
      $

    `}
    >
      <Sidebar
        workshop={workshop}
        activeIndex={activeIndex}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
      />

      <div
        className={`pb-10 px-4 transition-opacity ${
          isSidebarOpen ? "opacity-30" : "opacity-100"
        }`}
      >
        <section className="relative">
          <div className="flex items-center justify-between h-20 lg:justify-end">
            <button
              className=""
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Bars3Icon className="w-8 h-8 text-gray-600 dark:text-white" />
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
            <Breadcrumbs workshop={workshop} lesson={lesson} />
            {nextLessonPath() && (
              <Link to={nextLessonPath()}>
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
      </div>
    </div>
  );
}
