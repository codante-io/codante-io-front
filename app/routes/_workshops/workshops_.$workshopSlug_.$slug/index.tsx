import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import invariant from "tiny-invariant";
import { getLesson } from "~/models/lesson.server";
import type { Workshop } from "~/models/workshop.server";
import { getWorkshop } from "~/models/workshop.server";

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
    <div className="container py-2 mx-auto lg:py-4 lg:px-6">
      <div className="relative aspect-video">
        <img
          alt="Email client"
          width="1280"
          height="720"
          decoding="async"
          data-nimg="1"
          className="lg:rounded-xl"
          srcSet="https://buildui.com/_next/image?url=https%3A%2F%2Fmedia.graphassets.com%2F7TEp7j9Sf24OMO2MCR1L&w=3840&q=100"
        />
        <button
          className="absolute inset-0 z-10 flex items-center justify-center w-full h-full group"
          data-testid="video-play-button"
        >
          <span className="flex items-center justify-center w-20 h-20 transition rounded-full bg-black/60 group-hover:bg-brand/60">
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
        </button>
        <div className="absolute top-0 z-0 w-full overflow-hidden opacity-0 lg:rounded-xl">
          <div style={{ padding: "56.30% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/238455692?h=13169b47e2&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
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
      <div className="container">
        <h1 className="mt-8 text-5xl">{workshop.lessons[0].name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          debitis placeat sunt! Debitis unde dolorum pariatur officiis
          similique. Natus aut accusamus numquam exercitationem ullam quasi
          itaque consequuntur! Veniam, ab velit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          debitis placeat sunt! Debitis unde dolorum pariatur officiis
          similique. Natus aut accusamus numquam exercitationem ullam quasi
          itaque consequuntur! Veniam, ab velit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          debitis placeat sunt! Debitis unde dolorum pariatur officiis
          similique. Natus aut accusamus numquam exercitationem ullam quasi
          itaque consequuntur! Veniam, ab velit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          debitis placeat sunt! Debitis unde dolorum pariatur officiis
          similique. Natus aut accusamus numquam exercitationem ullam quasi
          itaque consequuntur! Veniam, ab velit.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          debitis placeat sunt! Debitis unde dolorum pariatur officiis
          similique. Natus aut accusamus numquam exercitationem ullam quasi
          itaque consequuntur! Veniam, ab velit.
        </p>
      </div>
    </div>
  );
}
