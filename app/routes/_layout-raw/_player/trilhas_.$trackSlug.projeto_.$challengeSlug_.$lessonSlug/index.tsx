import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";
import { getLesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import { abort404 } from "~/lib/utils/responses.server";
import MainContent from "../components/main-content";
import Nav from "../components/nav/nav";

import makeTitles from "~/lib/features/player/makeTitles";
import { getTrack } from "~/lib/models/track.server";
import SidebarSection from "../components/sidebar/sidebar-section";
import Sidebar from "../components/sidebar/sidebar";
import { getChallenge } from "~/lib/models/challenge.server";

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

function Readme() {
  return <div>Olá mundo</div>;
}

async function getManualLesson(
  lessonSlug: string,
  challengeSlug: any,
  request,
) {
  if (lessonSlug === "01-informacoes-do-projeto") {
    const challenge = await getChallenge(challengeSlug, request);
    return {
      id: 9999,
      name: "Informações do Projeto",
      content: challenge.description,
    };
  }

  if (lessonSlug === "02-participe-do-projeto") {
    return {
      id: 9999,
      name: "Participe do Projeto",
      description: "Aqui você encontra informações sobre como participar.",
    };
  }

  if (lessonSlug === "03-submeta-sua-resolucao") {
    return {
      id: 9999,
      name: "Submeta sua Resolução",
      content:
        "Aqui você encontra informações sobre como submeter sua resolução.",
    };
  }

  return null;
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
    challenge?.slug,
    request,
  );

  if (manualLesson) {
    return {
      challenge,
      track,
      titles,
      lesson: manualLesson,
    };
  }

  if (!track || !challenge || !lesson) {
    return abort404();
  }

  if (!track || !challenge) {
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
    console.log(lesson.id, l);
    return abort404();
  }

  return {
    challenge,
    track,
    lesson,
    titles,
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const challenge = loaderData.challenge;
  const lesson = loaderData.lesson;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const titles = loaderData.titles;
  if (!titles) return null;

  return (
    <div className="grid relative bg-background-900">
      <Nav user={user} titles={titles} />
      <MainArea>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        >
          <SidebarSection
            name="Resolva o Projeto"
            lessons={
              challenge && "track_lessons" in challenge
                ? challenge.track_lessons
                : []
            }
            currentLessonId={90909}
          />

          <SidebarSection
            currentLessonId={90909}
            lessons={challenge.solution.lessons}
            name="Resolução"
          />
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
            // nextLessonPath={nextLessonPath}
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
