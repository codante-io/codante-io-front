import { Link } from "@remix-run/react";
import { AiOutlineSolution } from "react-icons/ai";
import { RiLiveLine } from "react-icons/ri";
import NextLessonPreview from "~/components/features/workshop/next-lesson-preview";
import WorkshopLessonsHeader from "~/components/features/workshop/workshop-lessons-header";
import WorkshopLessonsList from "~/components/features/workshop/workshop-lessons-list";
import { Button } from "~/components/ui/button";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import TitleIcon from "~/components/ui/title-icon";
import YoutubePlayer from "~/components/ui/video-players/youtube-player";
import type { Lesson } from "~/lib/models/lesson.server";
import type { Workshop } from "~/lib/models/workshop.server";
import InstructorCard from "~/routes/_layout-app/_workshops/workshops_.$slug/instructor-card";
import ProgressBar from "~/routes/_layout-raw/_player/components/progress-bar";

type WorkshopDetailsProps = {
  workshop: Workshop;
  nextLesson: Lesson;
  showDescription?: boolean;
  isFree?: boolean;
  userIsPro?: boolean;
};

function WorkshopDetails({
  workshop,
  nextLesson,
  showDescription = true,
  isFree = false,
  userIsPro = false,
}: WorkshopDetailsProps) {
  return (
    <div className="flex flex-wrap lg:flex-nowrap lg:gap-14">
      {/* left Side */}
      <div className="w-full">
        {/* Video */}
        {workshop.status === "streaming" && workshop.streaming_url && (
          <YoutubePlayer youtubeEmbedUrl={workshop.streaming_url} />
        )}
        {workshop.status === "published" && (
          <NextLessonPreview workshop={workshop} nextLesson={nextLesson} />
        )}

        {showDescription && (
          <div className="mt-6 lg:mt-12">
            <Subtitle text="Sobre o Workshop" />
            {workshop.is_standalone ? (
              <div>
                <MarkdownRenderer markdown={workshop.description} />
              </div>
            ) : (
              <div className="text-gray-600 dark:text-gray-300">
                <p>
                  Esse workshop é um tutorial resolvendo o Mini Projeto{" "}
                  <b>{workshop.challenge?.name}</b>.
                </p>

                <div className="flex gap-2 mt-4">
                  <Link to={`/mini-projetos/${workshop.challenge?.slug}`}>
                    <Button variant="default">Ver Mini Projeto</Button>
                  </Link>
                  <Link
                    to={`/mini-projetos/${workshop.challenge?.slug}/codigo`}
                  >
                    <Button variant="secondary">Código completo</Button>
                  </Link>
                </div>

                <div className="mt-16">
                  <Subtitle text="Descrição do projeto" />
                  <MarkdownRenderer
                    markdown={workshop.challenge?.description || ""}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {!showDescription && !userIsPro && (
          <div className="text-gray-600 dark:text-gray-300 mt-6 bg-background-800 p-6 text-sm rounded-xl mb-8">
            <p>
              Todos os nossos projetos são{" "}
              <span className="underline decoration-green-400">gratuitos</span>,
              porém os tutoriais são exclusivos para membros do{" "}
              <b>
                Codante <ProSpanWrapper>PRO</ProSpanWrapper>
              </b>
              .{" "}
              {isFree
                ? "Este é um tutorial gratuito, para que você possa assistir e experimentar."
                : "Algumas aulas estão abertas para você experimentar."}
            </p>
            <p className="mt-4">
              Se gostar, considere assinar para ter acesso a todos os tutoriais
              e apoiar o projeto!
            </p>

            <div className="flex gap-4 max-w-md mt-4">
              <Link to="/assine" className="w-full">
                <Button variant="secondary" className="w-full font-bold">
                  Saiba mais
                </Button>
              </Link>
              <Link to="/planos" className="w-full">
                <Button variant="pro" className="w-full font-bold">
                  Assinar agora
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
      {/* Right Side */}
      <div className="lg:w-3/5 space-y-12 mx-auto">
        {/* Progress Bar & Certificate */}
        <div className="">
          {workshop.workshop_user ? (
            <>
              <div className="flex items-center">
                <TitleIcon className="inline-block w-3 h-3 mr-2" />
                <h3 className="inline-block mt-0 text-lg font-light">
                  <span className="font-bold">Progresso</span>
                </h3>
              </div>
              <ProgressBar
                lessons={workshop.lessons}
                showStatus={true}
                workshopUser={workshop.workshop_user}
              />
            </>
          ) : (
            <div className="flex flex-col items-start gap-2 dark:text-gray-400 text-gray-600 text-xs mt-2 w-full">
              {nextLesson && (
                <Link
                  to={`/workshops/${workshop.slug}/${nextLesson.slug}`}
                  className="w-full"
                >
                  <Button
                    variant="default"
                    className="w-full p-8 text-xl flex items-center gap-4"
                  >
                    {workshop.is_standalone ? (
                      <>
                        <RiLiveLine />
                        Iniciar workshop
                      </>
                    ) : (
                      <>
                        <AiOutlineSolution />
                        Iniciar tutorial
                      </>
                    )}
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
        {/* Instrutor */}
        <div>
          <div className="flex items-center">
            <TitleIcon className="inline-block w-3 h-3 mr-2" />
            <h3 className="inline-block mt-0 text-lg font-light">
              Seu <span className="font-bold">Instrutor</span>
            </h3>
          </div>
          <InstructorCard instructor={workshop.instructor} />
        </div>

        {/* Materiais */}
        {workshop?.resources && (
          <div>
            <div className="flex items-center">
              <TitleIcon className="inline-block w-3 h-3 mr-2" />
              <h3 className="font-bold inline-block mt-0 text-lg">Materiais</h3>
            </div>
            <WorkshopLessonsHeader workshop={workshop} showResources />
          </div>
        )}

        {/* Aulas */}
        <div className="">
          {workshop.lessons.length > 0 && (
            <>
              <div className="flex items-center">
                <TitleIcon className="inline-block w-3 h-3 mr-2" />
                <h3 className="font-bold inline-block mt-0 text-lg">Aulas</h3>
              </div>
              {/* <WorkshopLessonsHeader workshop={workshop} showResources /> */}
              <WorkshopLessonsList activeIndex={-1} workshop={workshop} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default WorkshopDetails;

function Subtitle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <TitleIcon className="w-5 h-5"></TitleIcon>
      <h3 className="text-2xl text-gray-700 dark:text-gray-50">{text}</h3>
    </div>
  );
}
