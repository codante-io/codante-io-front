import { useLoaderData, useOutletContext } from "@remix-run/react";
import makeTitles from "~/lib/features/player/makeTitles";
import { getLesson, Lesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import type { Workshop } from "~/lib/models/workshop.server";
import { getWorkshop, userJoinedWorkshop } from "~/lib/models/workshop.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { abort404 } from "~/lib/utils/responses.server";
import FullPlayer from "../../components/full-player/full-player";

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

  const activeIndex = workshop.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = workshop.lessons[activeIndex + 1];
  const nextLessonPath = nextLesson
    ? `/workshops/${workshop.slug}/${nextLesson.slug}`
    : "";

  return {
    workshop: workshop,
    lesson: lesson,
    titles,
    nextLessonPath,
  };
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User | null }>();
  const workshop: Workshop = loaderData.workshop;
  const lesson = loaderData.lesson;
  const titles = loaderData.titles;

  const lessons = workshop.lessons;
  const lessonSections = workshop.lesson_sections;

  return (
    <FullPlayer
      lesson={lesson as Lesson}
      lessonSections={lessonSections}
      lessons={lessons}
      titles={titles}
      user={user}
    />
  );
}
