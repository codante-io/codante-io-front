import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import invariant from "tiny-invariant";
import WorkshopLessonsHeader from "~/components/workshop-lessons-header";
import WorkshopLessonsList from "~/components/workshop-lessons-list";
import type { Lesson } from "~/models/lesson.server";
import { getLesson } from "~/models/lesson.server";
import type { Workshop } from "~/models/workshop.server";
import { getWorkshop } from "~/models/workshop.server";
import { fromSecondsToTimeString } from "~/utils/interval";

export async function loader({ params }: { params: any }) {
  const slug = params.slug;
  const WorkshopSlug = params.WorkshopSlug;

  invariant(params.slug, `params.slug is required`);
  invariant(params.workshopSlug, `params.workshopSlug is required`);
  return json({
    slug: params.slug,
    workshop: await getWorkshop(params.workshopSlug),
  });
}

export default function LessonIndex() {
  const loaderData = useLoaderData<typeof loader>();
  const workshop: Workshop = loaderData.workshop;
  const slug = loaderData.slug;
  return (
    <div className="container py-2 mx-auto lg:py-8">
      <section className="relative">
        <div className="relative aspect-video">
          {/* <img
            alt="Email client"
            width="1280"
            height="720"
            decoding="async"
            data-nimg="1"
            className="lg:rounded-xl"
            srcSet="https://buildui.com/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2F7TEp7j9Sf24OMO2MCR1L&w=3840&q=100"
          /> */}
          {/* <button
            className="absolute inset-0 z-10 flex items-center justify-center w-full h-full group"
            data-testid="video-play-button"
            onClick={() => alert('oie')}
          >
            <span className="flex items-center justify-center w-20 h-20 transition rounded-full bg-black/60 group-hover:bg-brand/80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-10 h-10 text-white"
              >
                <path
                  fillRule="evenodd"
                  className="fill-current"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </button> */}
          <div className="absolute top-0 z-0 w-full overflow-hidden opacity-1 lg:rounded-xl">
            <div style={{ padding: "56.30% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/238455692"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowfullscreen
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
                title="C0193vid007-1"
              ></iframe>
            </div>
            <script src="https://player.vimeo.com/api/player.js"></script>
          </div>
          {/* <script src="https://player.vimeo.com/api/player.js"></script> */}
        </div>
      </section>
      {/* <section className="mx-auto mt-6 flex pb-16 sm:mt-12 sm:max-w-lg md:max-w-prose lg:mt-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-3.5 lg:px-4"> */}

      <section className="mx-auto ">
        <section className="container flex flex-wrap pb-16 mx-auto mt-6 sm:mt-12 sm:max-w-lg md:max-w-prose lg:mt-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-6 lg:px-0">
          <div className="min-w-0 lg:col-span-2 lg:px-2 lg:text-lg">
            <div className="px-2 mb-8 sm:px-0">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl font-lexend">
                {workshop.lessons.find((lesson) => lesson.slug === slug)?.name}
              </h1>
              <p className="mt-2 sm:text-lg md:text-xl lg:mt-4 lg:text-[22px] lg:leading-snug font-light dark:text-slate-400 text-slate-600">
                {
                  workshop.lessons.find((lesson) => lesson.slug === slug)
                    ?.description
                }
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 w-full px-2 mb-8 ml-auto">
            {workshop.lessons.length > 0 && (
              <>
                <WorkshopLessonsHeader workshop={workshop} />
                <WorkshopLessonsList workshop={workshop} />
              </>
            )}
          </div>
        </section>
      </section>
    </div>
  );
}
