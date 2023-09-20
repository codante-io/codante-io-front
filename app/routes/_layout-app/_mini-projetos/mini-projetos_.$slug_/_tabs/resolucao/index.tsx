import { useOutletContext } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";
import MarkdownRenderer from "~/components/markdown-renderer";
import VimeoPlayer from "~/components/vimeo-player";
import WorkshopLessonsHeader from "~/components/workshop-lessons-header";
import WorkshopLessonsList from "~/components/workshop-lessons-list";
import { type Challenge } from "~/models/challenge.server";

export default function Resolution() {
  const context = useOutletContext<{ challenge: Challenge }>();
  const navigate = useNavigate();
  const challenge = context?.challenge;
  const workshop = challenge?.workshop;
  const lesson = workshop?.lessons[0];
  const slug = lesson?.slug;

  if (!challenge?.has_solution) {
    return navigate(`/mini-projetos/${challenge?.slug}`);
  }

  return (
    <>
      <div className="container">
        <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
          Resolução do Mini Projeto
        </h1>
      </div>
      <div className="container">
        <div className="flex flex-wrap pb-16 mx-auto sm:mt-12 sm:max-w-lg md:max-w-prose lg:mt-0 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-6 lg:px-0">
          <section className="relative col-span-2">
            <VimeoPlayer vimeoUrl={lesson?.video_url ?? ""} />
            <div className="min-w-0 mt-6 lg:col-span-2 lg:px-2 lg:text-lg lg:mt-8">
              <div className="px-2 mb-8 sm:px-0">
                <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl font-lexend">
                  {
                    workshop?.lessons.find((lesson) => lesson.slug === slug)
                      ?.name
                  }
                </h1>
                <p className="mt-2 sm:text-lg md:text-xl lg:mt-4 lg:text-[22px] lg:leading-snug font-light dark:text-gray-300 text-gray-500">
                  {
                    workshop?.lessons.find((lesson) => lesson.slug === slug)
                      ?.description
                  }
                </p>
                <MarkdownRenderer
                  markdown={
                    workshop?.lessons.find((lesson) => lesson.slug === slug)
                      ?.content || ""
                  }
                />
              </div>
            </div>
          </section>

          <section className="mx-auto ">
            <div className="flex-shrink-0 w-full px-2 mb-8 ml-auto">
              {workshop?.lessons?.length && workshop?.lessons?.length > 0 && (
                <>
                  <WorkshopLessonsHeader workshop={workshop} title="Vídeos" />
                  <WorkshopLessonsList
                    isChallengeResolution={true}
                    challengeSlug={challenge.slug}
                    workshop={workshop}
                    activeIndex={0}
                  />
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
