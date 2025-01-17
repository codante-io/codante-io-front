import { useLoaderData, useOutletContext } from "@remix-run/react";
import { getLesson, Lesson } from "~/lib/models/lesson.server";
import type { User } from "~/lib/models/user.server";
import { userJoinedWorkshop } from "~/lib/models/workshop.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { abort404 } from "~/lib/utils/responses.server";

import makeTitles from "~/lib/features/player/makeTitles";
import { Challenge, getChallenge } from "~/lib/models/challenge.server";
import FullPlayer from "../../components/full-player/full-player";

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
  const titles = loaderData.titles;
  const lesson = loaderData.lesson;
  const lessons = challenge.solution.lessons;
  const lessonSections = challenge.solution.lesson_sections;

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
