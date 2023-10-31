import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";
import { useColorMode } from "~/contexts/color-mode-context";
import { getChallenge } from "~/models/challenge.server";
import type { Lesson } from "~/models/lesson.server";
import type { User } from "~/models/user.server";
import type { Workshop } from "~/models/workshop.server";
import { abort404 } from "~/utils/responses.server";
import MainContent from "../components/main-content";
import Sidebar from "../components/sidebar";
import styles from "../styles.css";
import { getOgGeneratorUrl } from "~/utils/path-utils";
import type { MetaFunction } from "@remix-run/node";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data?.challenge) return {};
  const title = `${data.lesson?.name} | ${data.challenge?.name} | Codante.io`;
  const description = data.lesson.description ?? "";
  const imageUrl = getOgGeneratorUrl(
    data.lesson?.name ?? "Codante",
    "Mini Projeto " + data.challenge?.name
  );

  return {
    title: title,
    description: `${description} | Mini Projeto: ${data.challenge?.name}`,
    "og:title": title,
    "og:description": `${description} | Mini Projeto: ${data.challenge?.name}`,
    "og:image": imageUrl,
    "og:type": "website",
    "og:url": `https://codante.io/mini-projetos/${params.challengeSlug}/${params.lessonSlug}`,

    "twitter:card": "summary_large_image",
    "twitter:domain": "codante.io",
    "twitter:url": `https://codante.io/mini-projetos/${params.challengeSlug}/${params.lessonSlug}`,
    "twitter:title": title,
    "twitter:description": `${description} | Workshop: ${data.challenge?.name}`,
    "twitter:image": imageUrl,
    "twitter:image:alt": data.lesson?.name,
  };
};

export async function loader({
  params,
  request,
}: {
  params: any;
  request: any;
}) {
  const challenge = await getChallenge(params.challengeSlug, request);
  const workshop = challenge?.workshop;
  if (!challenge || !workshop || workshop.status !== "published") {
    return abort404();
  }

  const lesson = workshop.lessons.find(
    (lesson) => lesson.slug === params.lessonSlug
  );

  if (!lesson) {
    return abort404();
  }

  return {
    challenge: challenge,
    workshop: workshop,
    lesson: lesson,
    activeIndex: workshop.lessons.findIndex(
      (lesson: Lesson) => lesson.slug === params.lessonSlug
    ),
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const workshop: Workshop = loaderData.workshop;
  const activeIndex = loaderData.activeIndex;
  const lesson = loaderData.lesson;
  const challenge = loaderData.challenge;
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
      return `/mini-projetos/${challenge.slug}/resolucao/${nextLesson.slug}`;
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
        isChallenge={true}
        challenge={challenge}
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
        <MainContent
          handleVideoEnded={handleVideoEnded}
          isSidebarOpen={isSidebarOpen}
          lesson={lesson}
          nextLessonPath={nextLessonPath}
          user={user}
          isChallenge={true}
          challenge={challenge}
          workshop={workshop}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      </div>
    </div>
  );
}
