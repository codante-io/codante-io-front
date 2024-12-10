import {
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "@remix-run/react";
import { useState } from "react";
import { getLesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import type { Workshop } from "~/lib/models/workshop.server";
import { getWorkshop, userJoinedWorkshop } from "~/lib/models/workshop.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { abort404 } from "~/lib/utils/responses.server";
import MainContent from "../components/main-content";
import Nav from "../components/nav/nav";
import Sidebar from "../components/sidebar/sidebar";

import makeTitles from "~/lib/features/player/makeTitles";
import { getTrack } from "~/lib/models/track.server";

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

export async function loader({
  params,
  request,
}: {
  params: any;
  request: any;
}) {
  const track = await getTrack(params.trackSlug, request);
  // const workshop = await getWorkshop(params.workshopSlug, request);
  const lesson = await getLesson(params.lessonSlug, request);

  const workshop = track?.trackables.find(
    (t) => t.slug === params.workshopSlug,
  );

  if (!track || !workshop || !lesson) {
    return abort404();
  }

  // if workshop is not in track, return 404
  if (!track.trackables.find((t) => t.id === workshop.id)) {
    return abort404();
  }

  // if lesson is not in workshop, return 404
  if (!workshop.lessons.find((l) => l.id === lesson.id)) {
    return abort404();
  }

  const titles = makeTitles({ workshop, track });
  userJoinedWorkshop(workshop.slug, request);

  return {
    workshop,
    track,
    lesson,
    titles,
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const track = loaderData.track;
  const workshop: Workshop = loaderData.workshop;
  const lesson = loaderData.lesson;
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentWorkshop = track.trackables.find(
    (t) => t.slug === workshop.slug,
  );

  console.log(currentWorkshop);

  const titles = loaderData.titles;
  if (!titles) return null;

  const activeIndex = workshop.lessons.findIndex((l) => l.id === lesson.id);

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
      return `/workshops/${workshop.slug}/${nextLesson.slug}`;
    } else {
      return "";
    }
  }

  return (
    <div className="grid relative bg-background-900">
      <Nav user={user} titles={titles} />
      <MainArea>
        <div className="relative">
          {/* <div className="h-10 sticky top-0 bg-red-50"></div> */}
          <Sidebar
            sections={workshop.lesson_sections ?? []}
            sidebarLessons={workshop.lessons}
            currentLessonId={lesson.id}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div
          className={`pb-10 overscroll-y-contain transition-opacity ${
            isSidebarOpen ? "opacity-30" : "opacity-100"
          }`}
        >
          <MainContent
            handleVideoEnded={handleVideoEnded}
            isSidebarOpen={isSidebarOpen}
            lesson={lesson}
            // nextLessonPath={nextLessonPath}
            user={user}
            workshop={workshop}
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
