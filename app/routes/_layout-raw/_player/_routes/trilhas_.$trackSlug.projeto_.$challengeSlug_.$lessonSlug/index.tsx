import { useLoaderData, useOutletContext } from "react-router";
import axios from "axios";
import { useState } from "react";

import { getLesson, Lesson } from "~/lib/models/lesson.server";
import type { ChallengeUser, User } from "~/lib/models/user.server";
import { abort404 } from "~/lib/utils/responses.server";
import MainContent from "../../components/main-content";
import Nav from "../../components/nav/nav";

import makeTitles from "~/lib/features/player/makeTitles";
import {
  Challenge,
  getChallenge,
  userJoinedChallenge,
} from "~/lib/models/challenge.server";
import { ChallengeTrackable, getTrack, Track } from "~/lib/models/track.server";
import { user as getUser } from "~/lib/services/auth.server";
import {
  UserStep,
  userSteps,
} from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/build-steps.server";
import Sidebar from "../../components/sidebar/sidebar";
import SidebarItem from "../../components/sidebar/sidebar-item";
import SidebarSection from "../../components/sidebar/sidebar-section";
import SidebarSectionTitle from "../../components/sidebar/sidebar-section-title";
import LessonSubmitSolution from "./lesson-submit-solution";

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

export type ManualLesson = {
  id: number;
  name: string;
  slug?: string;
  content: string | React.JSX.Element;
  description: string;
};

async function getManualLesson(lessonSlug: string) {
  if (lessonSlug === "01-informacoes-do-projeto") {
    return {
      id: 990,
      slug: "01-informacoes-do-projeto",
      name: "Informações do Projeto",
    };
  }

  if (lessonSlug === "02-submeta-sua-resolucao") {
    return {
      id: 991,
      slug: "02-submeta-sua-resolucao",
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

  const trackableChallenge = track?.trackables.find(
    (t) => t.slug === params.challengeSlug,
  );

  const titles = makeTitles({ challenge: trackableChallenge, track });
  const manualLesson = await getManualLesson(params.lessonSlug);

  if (manualLesson) {
    const user = (await getUser({ request })) as User | null;

    let challengeUser: ChallengeUser | undefined = undefined;
    if (user) {
      try {
        challengeUser = await userJoinedChallenge(
          params.challengeSlug,
          request,
        );
      } catch (err: any) {
        if (axios.isAxiosError(err)) {
          if (err?.response?.status) challengeUser = undefined;
        }
      }
    }

    const challenge = await getChallenge(params.challengeSlug, request);

    const steps = userSteps(user, challengeUser);
    return {
      challenge,
      steps,
      trackableChallenge,
      track,
      titles,
      lesson: manualLesson,
    };
  }

  checks(track, trackableChallenge as ChallengeTrackable, lesson);

  return {
    challenge: null,
    steps: null,
    trackableChallenge: trackableChallenge as ChallengeTrackable,
    track,
    lesson,
    titles,
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const trackableChallenge =
    loaderData.trackableChallenge as ChallengeTrackable;
  let lesson = loaderData.lesson as Lesson | ManualLesson;
  const challenge = loaderData.challenge as Challenge;
  const steps = loaderData.steps as UserStep[];
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const titles = loaderData.titles;
  if (!titles) return null;

  const solutionLessons = trackableChallenge.solution.lessons;
  const solutionLessonSections = trackableChallenge.solution.lesson_sections;

  // ================= Manual Lessons =================
  if (lesson.slug === "01-informacoes-do-projeto") {
    lesson = {
      id: 990,
      slug: "01-informacoes-do-projeto",
      name: "Informações do Projeto",
      content: challenge.description,
      description: "",
    } as ManualLesson;
  }

  if (lesson.slug === "02-submeta-sua-resolucao") {
    lesson = {
      id: 991,
      name: "Submeta sua Resolução",
      content: <LessonSubmitSolution challenge={challenge} steps={steps} />,
      description: "Siga os passos para participar e submeter seu projeto.",
    };
  }
  // ===================================================

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
              trackableChallenge && "track_lessons" in trackableChallenge
                ? trackableChallenge.track_lessons
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
                            url={sectionLesson.url}
                            userCanView={sectionLesson.user_can_view}
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
            showCommentSection={false}
          />
        </div>
      </MainArea>
    </div>
  );
}

function MainArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`w-full min-h-screen  max-w-[1600px] flex lg:grid transition-all duration-500 lg:grid-cols-[350px_1fr] mx-auto lg:gap-8 justify-center  lg:min-h-[calc(100vh-200px)] relative lg:px-8`}
    >
      {children}
    </div>
  );
}
