import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState, type MouseEvent } from "react";
import { BsArrowRight, BsSquare, BsXLg } from "react-icons/bs";
import invariant from "tiny-invariant";
import MarkdownRenderer from "~/components/markdown-renderer";
import ProfileMenu from "~/components/navbar/profile-menu";
import ToggleColorMode from "~/components/toggle-color-mode";
import VimeoPlayer from "~/components/vimeo-player";
import { useColorMode } from "~/contexts/color-mode-context";
import type { Lesson } from "~/models/lesson.server";
import type { User } from "~/models/user.server";
import type { Workshop } from "~/models/workshop.server";
import { getWorkshop } from "~/models/workshop.server";
import classNames from "~/utils/class-names";
import { fromSecondsToTimeString } from "~/utils/interval";
import { abort404 } from "~/utils/responses.server";
import { TiArrowBackOutline } from "react-icons/ti";
import { MdOutlineSkipNext } from "react-icons/md";
import { useClickOutside } from "@mantine/hooks";

// import styles from "./styles.css"
import styles from "./styles.css";
import LinkToLoginWithRedirect from "~/components/link-to-login-with-redirect";
import { user } from "~/services/auth.server";
import { Bars3Icon } from "@heroicons/react/24/solid";

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
  invariant(params.slug, `params.slug is required`);
  const slug: string = params.slug;
  // se não houver workshop com esse slug ou lesson com esse slug, aborta com 404
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
  // ${isSidebarOpen ? "grid-cols-[350px,1fr]" : "grid-cols-[0px,1fr]"}
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

function Sidebar({
  workshop,
  activeIndex,
  isSidebarOpen,
  setIsSidebarOpen,
  user,
}: {
  workshop: Workshop;
  activeIndex: number;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  user: User | null;
}) {
  const ref = useClickOutside(() => setIsSidebarOpen(false));

  return (
    <div
      ref={ref}
      className={`lg:sticky w-80 absolute overflow-y-auto left-0 z-10 bg-background-900 lg:bg-transparent top-0 flex-col duration-500 transition-all max-h-screen lg:opacity-100 lg:flex lg:translate-x-0 lg:visible ${
        isSidebarOpen ? "" : "-translate-x-80"
      }`}
    >
      <div className="px-4 lg:px-0">
        <div className="">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="">
              <CodanteLogoMinimal />
            </Link>

            {isSidebarOpen ? (
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <BsXLg className="text-gray-600 w-7 h-7 dark:text-white" />
              </button>
            ) : (
              <Link
                to={`/workshops/${workshop.slug}`}
                className="hidden px-2 py-1 text-2xl transition-colors rounded-lg lg:block hover:bg-gray-200 dark:hover:bg-background-700"
              >
                <TiArrowBackOutline className="text-gray-600 dark:text-gray-500" />
              </Link>
            )}
          </div>
        </div>
        <div className="">
          <WorkshopTitle isLoggedIn={!!user} workshop={workshop} />
        </div>
      </div>

      <div
        className="max-h-full pb-8 pr-4 lg:overflow-y-scroll lg:overscroll-contain"
        style={{}}
      >
        {workshop.lessons.length > 0 && (
          <>
            <WorkshopLessonsList
              workshop={workshop}
              activeIndex={activeIndex}
              isLoggedIn={!!user}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </>
        )}
      </div>
    </div>
  );
}

function Breadcrumbs({
  workshop,
  lesson,
}: {
  workshop: Workshop;
  lesson: Lesson;
}) {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      <Link to="/workshops" className=" hover:underline">
        Workshops
      </Link>
      <span className="mx-1 text-brand-500">{">"}</span>
      <Link to={`/workshops/${workshop.slug}`} className=" hover:underline">
        {workshop.name}
      </Link>
      <span className="mx-1 text-brand-500">{">"}</span>
      <span className="text-gray-800 dark:text-white ">{lesson.name}</span>
    </div>
  );
}

function WorkshopTitle({
  workshop,
  isLoggedIn = false,
}: {
  workshop: Workshop;
  isLoggedIn?: boolean;
}) {
  return (
    <div className="mb-4">
      <h3 className="mt-0 text-lg font-bold ">
        <Link className="hover:underline" to={`/workshops/${workshop.slug}`}>
          {workshop.name}
        </Link>
      </h3>
      <p className="mb-4 text-xs text-brand">Workshop</p>
      <span className="block mt-0 text-xs font-light text-gray-400 dark:text-gray-500">
        {workshop.lessons.length}{" "}
        {workshop.lessons.length > 1 ? "vídeos" : "vídeo"}{" "}
        <span className="font-light text-blue-500"> &#8226; </span>
        {fromSecondsToTimeString(
          workshop.lessons.reduce(
            (acc, lesson) => acc + lesson.duration_in_seconds,
            0
          )
        )}
      </span>
      {isLoggedIn && <ProgressBar lessons={workshop.lessons} />}
    </div>
  );
}

function ProgressBar({ lessons }: { lessons: Lesson[] }) {
  return (
    <div className="pr-4 mt-4">
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-green-600 h-2.5 rounded-full"
          style={{
            width: `${
              (lessons.filter((l) => l.user_completed).length * 100) /
              lessons.length
            }%`,
          }}
        ></div>
      </div>
    </div>
  );
}

function CodanteLogoMinimal() {
  return (
    <svg
      width="39"
      height="17"
      viewBox="0 0 39 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.67289 0L9.67498 2.37007L4.8732 8.45233L9.67498 14.5346L6.67289 16.9047L0 8.45233L6.67289 0Z"
        fill="#5282FF"
      />
      <path
        className="dark:fill-white fill-gray-800"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.4564 4.89722L14.3226 0L17.3247 2.37007L13.4585 7.26729C12.9099 7.9621 12.9099 8.94255 13.4585 9.63736L17.3247 14.5346L14.3226 16.9047L10.4564 12.0074C8.81077 9.92301 8.81077 6.98165 10.4564 4.89722Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.3271 0L29.325 2.37007L34.1268 8.45233L29.325 14.5346L32.3271 16.9047L39 8.45233L32.3271 0Z"
        fill="#5282FF"
      />
      <path
        className="dark:fill-white fill-gray-800"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.5436 4.89722L24.6774 0L21.6753 2.37007L25.5415 7.26729C26.0901 7.9621 26.0901 8.94255 25.5415 9.63736L21.6753 14.5346L24.6774 16.9047L28.5436 12.0074C30.1892 9.92301 30.1892 6.98165 28.5436 4.89722Z"
      />
    </svg>
  );
}

type WorkshopLessonsListProps = {
  workshop: Workshop;
  activeIndex: number;
  isChallengeResolution?: boolean;
  challengeSlug?: string;
  isLoggedIn?: boolean;
  setIsSidebarOpen: (value: boolean) => void;
};

function WorkshopLessonsList({
  isLoggedIn = false,
  workshop,
  activeIndex,
  isChallengeResolution = false,
  challengeSlug = "",
  setIsSidebarOpen,
}: WorkshopLessonsListProps) {
  // if is challenge resolution, we need to add the challenge slug to the link
  // so we can navigate to the correct lesson
  const linkPrefix = isChallengeResolution
    ? `/mini-projetos/${challengeSlug}/resolucao`
    : `/workshops/${workshop.slug}`;

  return (
    <ol className="mt-4">
      {workshop.lessons.map((lesson: Lesson, id: number) => (
        <li
          key={lesson.id}
          className={classNames(
            activeIndex === id
              ? "bg-background-200 dark:bg-background-800 dark:text-white"
              : "text-gray-700 dark:text-gray-500",
            "flex items-center justify-between gap-3 px-3 py-3 font-light transition rounded-lg mb-1 dark:hover:bg-background-800 hover:bg-background-200"
          )}
        >
          <div className="flex items-center flex-1">
            {isLoggedIn && <MarkCompletedButton lesson={lesson} />}
            <span className={` text-xs dark:text-gray-600 mr-2`}>
              {id + 1}.
            </span>
            <Link
              onClick={() => setIsSidebarOpen(false)}
              to={`${linkPrefix}/${lesson.slug}`}
              className="hover:underline"
            >
              <h4
                className={`flex-1 font-normal inline-block w-full hover:underline decoration-brand`}
              >
                {lesson.name}
              </h4>
            </Link>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-600">
            {fromSecondsToTimeString(lesson.duration_in_seconds)}
          </span>
        </li>
      ))}
    </ol>
  );
}

function MarkCompletedButton({ lesson }: { lesson: Lesson }) {
  const fetcher = useFetcher();

  function handleCheckClick(
    event: MouseEvent<HTMLButtonElement>,
    lessonId: string,
    markCompleted: boolean
  ) {
    event.preventDefault();
    fetcher.submit(
      { lessonId, markCompleted: markCompleted.toString() },
      {
        method: "POST",
        action: "/api/set-watched?index",
      }
    );
  }

  return (
    <button
      onClick={(event) =>
        handleCheckClick(event, lesson.id, lesson.user_completed ? false : true)
      }
      className="mr-4"
    >
      {lesson.user_completed ? (
        <BsCheckSquare />
      ) : (
        <BsSquare className="transition-all hover:text-brand hover:scale-110" />
      )}
    </button>
  );
}

function BsCheckSquare() {
  return (
    <svg
      className="transition-all hover:text-brand group hover:scale-110"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
    >
      <g fill="currentColor">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
        <path
          className="fill-green-700 group-hover:fill-brand"
          d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093l3.473-4.425a.235.235 0 0 1 .02-.022z"
        ></path>
      </g>
    </svg>
  );
}
