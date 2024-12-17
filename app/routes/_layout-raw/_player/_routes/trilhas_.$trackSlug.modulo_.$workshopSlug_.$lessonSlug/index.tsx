import { useLoaderData, useOutletContext } from "@remix-run/react";
import makeTitles from "~/lib/features/player/makeTitles";
import { getLesson } from "~/lib/models/lesson.server";
import { getTrack, isWorkshopTrackable } from "~/lib/models/track.server";
import type { User } from "~/lib/models/user.server";
import { userJoinedWorkshop } from "~/lib/models/workshop.server";
// import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { abort404 } from "~/lib/utils/responses.server";
import FullPlayer from "../../components/full-player/full-player";

export const meta = ({ data, params }: any) => {
  if (!data?.workshop) return {};
  const title = `${data.lesson?.name} | ${data.workshop?.name} | Codante.io`;
  const description = data.lesson.description ?? "";
  // const imageUrl = getOgGeneratorUrl(
  //   data.lesson?.name ?? "Codante",
  //   "Trilha " + data.track?.name,
  // );

  return [
    { title },
    {
      name: "description",
      content: `${description} | Trilha: ${data.track?.name}`,
    },
    { property: "og:title", content: title },
    {
      property: "og:description",
      content: `${description} | Trilha: ${data.track?.name}`,
    },
    // { property: "og:image", content: imageUrl },
    // { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/trilhas/${params.trackSlug}/modulo/${params.workshopSlug}/${params.lessonSlug}`,
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
  const track = await getTrack(params.trackSlug, request);
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
  if (
    !isWorkshopTrackable(workshop) ||
    !workshop.lessons.find((l) => l.id === lesson.id)
  ) {
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
  const workshop = loaderData.workshop;
  const lesson = loaderData.lesson;
  const titles = loaderData.titles;
  if (!titles) return null;

  return (
    <FullPlayer
      lesson={lesson}
      lessons={workshop.lessons}
      lessonSections={workshop.lesson_sections}
      user={user}
      titles={titles}
    />
  );
}
