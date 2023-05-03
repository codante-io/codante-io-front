import { useOutletContext, useParams } from "@remix-run/react";
import WorkshopLessonsHeader from "~/components/workshop-lessons-header";
import WorkshopLessonsList from "~/components/workshop-lessons-list";
import type { ChallengeCardInfo } from "~/models/challenge.server";

export default function ChallengeResolutionSlug() {
  const outletContext = useOutletContext<{ challenge: ChallengeCardInfo }>();
  const challenge = outletContext?.challenge;
  const workshop = outletContext.challenge.workshop;
  const params = useParams();
  const slug = params.lessonSlug;

  if (!workshop) return null;

  const activeIndex = workshop.lessons.findIndex(
    (lesson) => lesson.slug === slug
  );

  return (
    <div className="container mx-auto">
      <section className="relative">
        <div className="relative aspect-video">
          <div className="absolute top-0 z-0 w-full overflow-hidden opacity-1 lg:rounded-xl">
            <div style={{ padding: "56.30% 0 0 0", position: "relative" }}>
              <iframe
                src="https://player.vimeo.com/video/238455692"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
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
        </div>
      </section>
      {/* <section className="mx-auto mt-6 flex pb-16 sm:mt-12 sm:max-w-lg md:max-w-prose lg:mt-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-3.5 lg:px-4"> */}

      <section className="mx-auto ">
        <section className="container flex flex-wrap pb-16 mx-auto mt-6 sm:mt-12 sm:max-w-lg md:max-w-prose lg:mt-12 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-6 lg:px-0">
          <div className="min-w-0 lg:col-span-2 lg:px-2 lg:text-lg">
            <div className="px-2 mb-8 sm:px-0">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl font-lexend">
                {workshop?.lessons.find((lesson) => lesson.slug === slug)?.name}
              </h1>
              <p className="mt-2 sm:text-lg md:text-xl lg:mt-4 lg:text-[22px] lg:leading-snug font-light dark:text-slate-400 text-slate-600">
                {
                  workshop?.lessons.find((lesson) => lesson.slug === slug)
                    ?.description
                }
              </p>
            </div>
          </div>
          <div className="flex-shrink-0 w-full px-2 mb-8 ml-auto">
            {workshop?.lessons.length > 0 && (
              <>
                <WorkshopLessonsHeader
                  workshop={workshop}
                  title="Vídeos - Resolução"
                />
                <WorkshopLessonsList
                  isChallengeResolution={true}
                  challengeSlug={challenge.slug}
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
