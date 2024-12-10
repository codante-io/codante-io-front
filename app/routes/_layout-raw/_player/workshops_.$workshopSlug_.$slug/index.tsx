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
import SidebarSectionTitle from "../components/sidebar/sidebar-section-title";
import SidebarItem from "../components/sidebar/sidebar-item";

export const meta = ({ data, params }: any) => {
  if (!data?.workshop) return {};
  const title = `${data.lesson?.name} | ${data.workshop?.name} | Codante.io`;
  const description = data.lesson.description ?? "";
  const imageUrl = getOgGeneratorUrl(
    data.lesson?.name ?? "Codante",
    "Workshop " + data.workshop?.name,
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
      content: `https://codante.io/workshops/${params.workshopSlug}/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/workshops/${params.workshopSlug}/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    {
      property: "twitter:description",
      content: `${description} | Workshop: ${data.workshop?.name}`,
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
  const workshop = await getWorkshop(params.workshopSlug, request);
  const lesson = await getLesson(params.slug, request);

  if (!workshop || !lesson) {
    return abort404();
  }

  const titles = makeTitles({ workshop });
  userJoinedWorkshop(workshop.slug, request);

  return {
    workshop: workshop,
    lesson: lesson,
    titles,
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const workshop: Workshop = loaderData.workshop;
  const currentLesson = loaderData.lesson;
  const fetcher = useFetcher();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const titles = loaderData.titles;
  if (!titles) return null;

  const activeIndex = workshop.lessons.findIndex(
    (l) => l.id === currentLesson.id,
  );

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
    <div className="grid max-w-[1600px] mx-auto bg-background-900 grid-cols-1">
      <Nav user={user} titles={titles} />
      <MainArea>
        <div className="relative">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          >
            {workshop.lesson_sections &&
              workshop.lesson_sections.map((section) => {
                const sectionLessons = section.lesson_ids.map((id) =>
                  workshop.lessons.find((l) => l.id === id),
                );
                return (
                  <div key={section.name} className="">
                    <SidebarSectionTitle className="border-b border-b-background-800 mb-4 pl-4">
                      {section.name}
                    </SidebarSectionTitle>
                    {sectionLessons.map((sectionLesson, index) => {
                      return (
                        <SidebarItem
                          id={sectionLesson.id}
                          key={sectionLesson.id}
                          name={sectionLesson.name}
                          href={sectionLesson.url}
                          completed={sectionLesson.user_completed}
                          isFirst={index === 0}
                          current={currentLesson.id === sectionLesson.id}
                          isLast={index === sectionLessons.length - 1}
                        />
                      );
                    })}
                  </div>
                );
              })}
          </Sidebar>
        </div>

        <div
          className={`pb-10  transition-opacity ${
            isSidebarOpen ? "opacity-30" : "opacity-100"
          }`}
        >
          <MainContent
            handleVideoEnded={handleVideoEnded}
            isSidebarOpen={isSidebarOpen}
            lesson={currentLesson}
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
      className={`w-full relative min-h-screen flex lg:grid transition-all duration-500 lg:grid-cols-[350px,1fr] gap-6   justify-center  lg:min-h-[calc(100vh-200px)]  `}
    >
      {children}
    </div>
  );
}
