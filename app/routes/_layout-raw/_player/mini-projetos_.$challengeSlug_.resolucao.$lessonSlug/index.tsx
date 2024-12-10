import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";
import { getLesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import { userJoinedWorkshop } from "~/lib/models/workshop.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { abort404 } from "~/lib/utils/responses.server";
import MainContent from "~/routes/_layout-raw/_player/components/main-content";
import Nav from "~/routes/_layout-raw/_player/components/nav/nav";
import Sidebar from "~/routes/_layout-raw/_player/components/sidebar/sidebar";

import makeTitles from "~/lib/features/player/makeTitles";
import { Challenge, getChallenge } from "~/lib/models/challenge.server";
import SidebarItem from "../components/sidebar/sidebar-item";
import { SidebarLesson } from "../components/sidebar/types";
import SidebarSectionTitle from "../components/sidebar/sidebar-section-title";

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
      content: `${description} | Workshop: ${data.workshop?.name}`,
    },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: `${description} | Workshop: ${data.workshop?.name}`,
    },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/mini-projetos/${params.challengeSlug}/resolucao/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/mini-projetos/${params.challengeSlug}/resolucao/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    {
      property: "twitter:description",
      content: `${description} | Mini Projeto: ${data.challenge?.name}`,
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
  const lesson = await getLesson(params.lessonSlug, request);

  if (!challenge || !lesson) {
    return abort404();
  }

  const titles = makeTitles({ challenge });
  userJoinedWorkshop(challenge.slug, request);

  return {
    challenge,
    lesson: lesson,
    titles,
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const challenge: Challenge = loaderData.challenge;
  const lesson = loaderData.lesson;
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const titles = loaderData.titles;
  if (!titles) return null;

  const activeIndex = challenge.solution.lessons.findIndex(
    (l) => l.id === lesson.id,
  );

  async function handleVideoEnded(lessonId: number) {
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
    const nextLesson = challenge.solution.lessons[activeIndex + 1];
    if (nextLesson) {
      return `/mini-projetos/${challenge.slug}/resolucao/${nextLesson.slug}`;
    } else {
      return "";
    }
  }

  const lessons = challenge.solution.lessons;
  const sectionsWithLessons = challenge.solution.lesson_sections?.map(
    (section) => {
      const sectionLessons = section.lesson_ids.map((id) =>
        challenge.solution.lessons.find((lesson) => lesson.id === id),
      ) as SidebarLesson[];
      return {
        sectionName: section.name,
        lessons: sectionLessons,
      };
    },
  );

  return (
    <div className="bg-background-900">
      <Nav user={user} titles={titles} />
      <MainArea>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          {/* Se não há sections, vamos listar as aulas sem os títulos das sections */}
          {!sectionsWithLessons && (
            <div>
              <LessonsList currentLessonId={lesson.id} lessons={lessons} />
            </div>
          )}

          {/* Se há sections, vamos listar os títulos das sections com as aulas */}
          {sectionsWithLessons &&
            sectionsWithLessons.map((section) => {
              return (
                <div key={section.sectionName}>
                  <SidebarSectionTitle className="border-b border-b-background-800 mb-4 pl-4 bg-transparent">
                    {section.sectionName}
                  </SidebarSectionTitle>
                  <LessonsList
                    lessons={section.lessons}
                    currentLessonId={lesson.id}
                  />
                </div>
              );
            })}
        </Sidebar>

        <div
          className={`pb-10  transition-opacity ${
            isSidebarOpen ? "opacity-30" : "opacity-100"
          }`}
        >
          <MainContent handleVideoEnded={handleVideoEnded} lesson={lesson} />
        </div>
      </MainArea>
    </div>
  );
}

function MainArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`min-h-screen max-w-[1600px] flex  lg:grid transition-all duration-500 lg:grid-cols-[350px,1fr] mx-auto lg:gap-8 justify-center  lg:min-h-[calc(100vh-200px)] relative lg:px-8`}
    >
      {children}
    </div>
  );
}

function LessonsList({
  lessons,
  currentLessonId,
}: {
  lessons: SidebarLesson[];
  currentLessonId: number;
}) {
  return (
    <div>
      {lessons.map((lesson, index) => {
        return (
          <SidebarItem
            id={lesson.id}
            key={lesson.id}
            name={lesson.name}
            href={lesson.url}
            completed={lesson.user_completed}
            current={lesson.id === currentLessonId}
            isFirst={index === 0}
            isLast={index === lessons.length - 1}
          />
        );
      })}
    </div>
  );
}
