import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import MarkdownRenderer from "~/components/markdown-renderer";
import VimeoPlayer from "~/components/vimeo-player";
import WorkshopLessonsHeader from "~/components/workshop-lessons-header";
import WorkshopLessonsList from "~/components/workshop-lessons-list";
import type { Lesson } from "~/models/lesson.server";
import { setCompleted } from "~/models/lesson.server";
import type { Workshop } from "~/models/workshop.server";
import { getWorkshop } from "~/models/workshop.server";
import { abort404 } from "~/utils/responses.server";

export async function loader({
  params,
  request,
}: {
  params: any;
  request: any;
}) {
  invariant(params.slug, `params.slug is required`);
  const slug: string = params.slug;
  // se não houver workshop com esse slug ou lesson com esse slug, aborta com 404
  const workshop = await getWorkshop(params.workshopSlug, request);
  const lesson = workshop?.lessons.find(
    (lesson) => lesson.slug === params.slug
  );

  if (!workshop || !lesson) {
    return abort404();
  }

  return {
    slug: slug,
    workshop: workshop,
    request: request,
    lesson: lesson,
    activeIndex: workshop.lessons.findIndex(
      (lesson: Lesson) => lesson.slug === params.slug
    ),
  };
}

export async function action({ request }: { request: any }) {
  // const lessonId = params.lessonId;

  const formData = await request.formData();
  const lessonId = formData.get("lessonId") as string;
  await setCompleted(lessonId, request);

  console.log(lessonId);

  return null;
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const workshop: Workshop = loaderData.workshop;
  const activeIndex = loaderData.activeIndex;
  const request = loaderData.request;
  const lesson = loaderData.lesson;
  const slug = loaderData.slug;
  const fetcher = useFetcher();

  function handleVideoEnded(lessonId: string) {
    console.log("estou no handleVideoEnded");
    fetcher.submit({ lessonId }, { method: "post", action: "?index" });
  }

  console.log(workshop);
  return (
    <div className="container mx-auto">
      <section className="relative">
        <VimeoPlayer
          vimeoUrl={lesson.video_url || ""}
          onVideoEnded={() => handleVideoEnded(lesson.id)}
        />
      </section>
      {/* <section className="mx-auto mt-6 flex pb-16 sm:mt-12 sm:max-w-lg md:max-w-prose lg:mt-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-3.5 lg:px-4"> */}

      <section className="mx-auto ">
        <section className="container flex flex-wrap pb-16 mx-auto mt-6 sm:mt-12 sm:max-w-lg md:max-w-prose lg:mt-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-6 lg:px-0">
          <div className="min-w-0 lg:col-span-2 lg:px-2 lg:text-lg">
            <div className="px-2 mb-8 sm:px-0">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl font-lexend">
                {lesson?.name}
              </h1>
              <p className="mt-2 sm:text-lg md:text-xl lg:mt-4 lg:text-[22px] lg:leading-snug font-light dark:text-gray-300 text-gray-500">
                {lesson?.description}
              </p>

              <MarkdownRenderer
                markdown={
                  workshop.lessons.find((lesson) => lesson.slug === slug)
                    ?.content || ""
                }
              />
            </div>
          </div>
          <div className="flex-shrink-0 w-full px-2 mb-8 ml-auto">
            {workshop.lessons.length > 0 && (
              <>
                <WorkshopLessonsHeader workshop={workshop} />
                <WorkshopLessonsList
                  workshop={workshop}
                  activeIndex={activeIndex}
                />
              </>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
