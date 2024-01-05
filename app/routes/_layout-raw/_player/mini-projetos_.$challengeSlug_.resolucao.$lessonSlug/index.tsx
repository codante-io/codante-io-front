import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import { getChallenge } from "~/lib/models/challenge.server";
import type { Lesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import type { Workshop } from "~/lib/models/workshop.server";
import { abort404 } from "~/lib/utils/responses.server";
import MainContent from "../components/main-content";
import Sidebar from "../components/sidebar";
import styles from "../styles.css";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}

export const meta = ({ data, params }: any) => {
  if (!data?.challenge) return {};
  const title = `${data.lesson?.name} | ${data.challenge?.name} | Codante.io`;
  const description = data.lesson.description ?? "";
  const imageUrl = getOgGeneratorUrl(
    data.lesson?.name ?? "Codante",
    "Mini Projeto " + data.challenge?.name,
  );

  return [
    { title },
    {
      name: "description",
      content: `${description} | Mini Projeto: ${data.challenge?.name}`,
    },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: `${description} | Mini Projeto: ${data.challenge?.name}`,
    },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/mini-projetos/${params.challengeSlug}/${params.lessonSlug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/mini-projetos/${params.challengeSlug}/${params.lessonSlug}`,
    },
    { property: "twitter:title", content: title },
    {
      property: "twitter:description",
      content: `${description} | Workshop: ${data.challenge?.name}`,
    },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.lesson?.name },
  ];
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
    (lesson) => lesson.slug === params.lessonSlug,
  );

  if (!lesson) {
    return abort404();
  }

  return {
    challenge: challenge,
    workshop: workshop,
    lesson: lesson,
    activeIndex: workshop.lessons.findIndex(
      (lesson: Lesson) => lesson.slug === params.lessonSlug,
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
        { method: "post", action: "/api/set-watched?index" },
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
      className={`min-h-screen max-w-[1600px] flex  lg:grid transition-all duration-500 lg:grid-cols-[350px,1fr] mx-auto lg:gap-8 justify-center  lg:min-h-[calc(100vh-200px)] relative lg:px-8 
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
        className={`pb-10 w-full px-4 transition-opacity ${
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
