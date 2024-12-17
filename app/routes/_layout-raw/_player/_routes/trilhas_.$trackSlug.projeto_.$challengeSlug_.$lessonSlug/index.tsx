import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";
import { getLesson, Lesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import { abort404 } from "~/lib/utils/responses.server";
import MainContent from "../../components/main-content";
import Nav from "../../components/nav/nav";

import makeTitles from "~/lib/features/player/makeTitles";
import { ChallengeTrackable, getTrack, Track } from "~/lib/models/track.server";
import SidebarSection from "../../components/sidebar/sidebar-section";
import Sidebar from "../../components/sidebar/sidebar";
import { Challenge, getChallenge } from "~/lib/models/challenge.server";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import FaqItem from "~/components/ui/faq-item";
import SidebarSectionTitle from "../../components/sidebar/sidebar-section-title";
import SidebarItem from "../../components/sidebar/sidebar-item";

// export const meta = ({ data, params }: any) => {
//   if (!data?.workshop) return {};
//   const title = `${data.lesson?.name} | ${data.workshop?.name} | Codante.io`;
//   const description = data.lesson.description ?? "";
//   const imageUrl = getOgGeneratorUrl(
//     data.lesson?.name ?? "Codante",
//     "Workshop " + data.workshop?.name,
//   );

//   return [
//     { title },
//     {
//       name: "description",
//       content: `${description} | Workshop: ${data.workshop?.name}`,
//     },
//     { property: "og:title", content: title },
//     {
//       property: "og:description",
//       content: `${description} | Workshop: ${data.workshop?.name}`,
//     },
//     { property: "og:image", content: imageUrl },
//     { property: "og:type", content: "website" },
//     {
//       property: "og:url",
//       content: `https://codante.io/workshops/${params.workshopSlug}/${params.slug}`,
//     },
//     { property: "twitter:card", content: "summary_large_image" },
//     { property: "twitter:domain", content: "codante.io" },
//     {
//       property: "twitter:url",
//       content: `https://codante.io/workshops/${params.workshopSlug}/${params.slug}`,
//     },
//     { property: "twitter:title", content: title },
//     {
//       property: "twitter:description",
//       content: `${description} | Workshop: ${data.workshop?.name}`,
//     },
//     { property: "twitter:image", content: imageUrl },
//     { property: "twitter:image:alt", content: data.lesson?.name },
//   ];
// };

async function getManualLesson(
  lessonSlug: string,
  challengeSlug: string,
  request: Request,
) {
  if (lessonSlug === "01-informacoes-do-projeto") {
    const challenge = await getChallenge(challengeSlug, request);
    return {
      id: 9999,
      slug: "01-informacoes-do-projeto",
      name: "Informações do Projeto",
      content: challenge.description,
    };
  }

  if (lessonSlug === "02-participe-do-projeto") {
    return {
      id: 9999,
      slug: "02-participe-do-projeto",
      name: "Participe do Projeto",
      description: "Aqui você encontra informações sobre como participar.",
    };
  }

  if (lessonSlug === "03-submeta-sua-resolucao") {
    return {
      id: 9999,
      slug: "03-submeta-sua-resolucao",
      name: "Submeta sua Resolução",
    };
  }

  return null;
}

function checks(
  track: Track | null,
  challenge: ChallengeTrackable | null,
  lesson: Lesson | null,
) {
  if (!track || !challenge || !lesson) {
    return abort404();
  }

  // if challenge is not in track, return 404
  if (!track.trackables.find((t) => t.id === challenge.id)) {
    return abort404();
  }

  // if lesson is not in challenge, return 404
  if (
    "track_lessons" in challenge &&
    !challenge.solution.lessons.find((l) => l.id === lesson.id)
  ) {
    return abort404();
  }
}

export async function loader({
  params,
  request,
}: {
  params: any;
  request: any;
}) {
  const track = await getTrack(params.trackSlug, request);
  const lesson = await getLesson(params.lessonSlug, request);

  const challenge = track?.trackables.find(
    (t) => t.slug === params.challengeSlug,
  );

  const titles = makeTitles({ challenge, track });

  const manualLesson = await getManualLesson(
    params.lessonSlug,
    params.challengeSlug,
    request,
  );

  if (manualLesson) {
    return {
      challenge: challenge as ChallengeTrackable,
      track,
      titles,
      lesson: manualLesson,
    };
  }

  checks(track, challenge, lesson);

  return {
    challenge: challenge as ChallengeTrackable,
    track,
    lesson,
    titles,
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const challenge = loaderData.challenge;
  let lesson = loaderData.lesson!;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const titles = loaderData.titles;
  if (!titles) return null;

  const solutionLessons = challenge.solution.lessons;
  const solutionLessonSections = challenge.solution.lesson_sections;

  if (lesson.slug === "01-informacoes-do-projeto") {
    lesson = {
      id: 997,
      name: "Informações do Projeto",
      content: lesson.content,
    };
  }

  if (lesson.slug === "02-participe-do-projeto") {
    lesson = {
      id: 998,
      name: "Participe do Projeto",
      description: "Aqui você encontra informações sobre como participar.",
    };
  }

  if (lesson.slug === "03-submeta-sua-resolucao") {
    lesson = {
      id: 999,
      name: "Submeta sua Resolução",
      content: <FaqItem question="Oi" answer="tudobem" />,
    };
  }

  console.log(lesson.id);

  return (
    <div className="grid relative bg-background-900">
      <Nav user={user} titles={titles} />
      <MainArea>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <SidebarSection
            name="⭐ Resolva o Projeto"
            lessons={
              challenge && "track_lessons" in challenge
                ? challenge.track_lessons
                : []
            }
            currentLessonId={lesson.id}
          />

          <div>
            <SidebarSectionTitle className="border-b border-b-background-800 mb-4 pl-4 ">
              Resolução
            </SidebarSectionTitle>

            {solutionLessonSections &&
              solutionLessonSections.map((section) => {
                const sectionLessons = section.lesson_ids.map((id) =>
                  solutionLessons.find((l) => l.id === id),
                );
                return (
                  <div key={section.name} className="">
                    <h4 className="px-3 py-2 text-gray-600 dark:text-gray-500 mt-4 text-sm font-light">
                      {section.name}
                    </h4>
                    {sectionLessons &&
                      sectionLessons.map((sectionLesson, index) => {
                        if (!sectionLesson) return null;
                        return (
                          <SidebarItem
                            id={sectionLesson.id}
                            key={sectionLesson.id}
                            name={sectionLesson.name}
                            href={sectionLesson.url}
                            completed={sectionLesson.user_completed}
                            isFirst={index === 0}
                            current={lesson.id === sectionLesson.id}
                            isLast={index === sectionLessons.length - 1}
                          />
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </Sidebar>

        <div
          className={`pb-10 overscroll-y-contain transition-opacity ${
            isSidebarOpen ? "opacity-30" : "opacity-100"
          }`}
        >
          <MainContent
            handleVideoEnded={() => {}}
            isSidebarOpen={isSidebarOpen}
            lesson={lesson}
            user={user}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>
      </MainArea>
    </div>
  );
}

function MainArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`w-full min-h-screen  max-w-[1600px] flex lg:grid transition-all duration-500 lg:grid-cols-[350px,1fr] mx-auto lg:gap-8 justify-center  lg:min-h-[calc(100vh-200px)] relative lg:px-8`}
    >
      {children}
    </div>
  );
}
