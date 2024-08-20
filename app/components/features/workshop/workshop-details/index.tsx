import {
  Link,
  useFetcher,
  useNavigate,
  useSearchParams,
} from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineSolution } from "react-icons/ai";
import { CgSpinner } from "react-icons/cg";
import { FiGithub } from "react-icons/fi";
import { RiLiveLine } from "react-icons/ri";
import { TbCalendarCheck } from "react-icons/tb";
import NextLessonPreview from "~/components/features/workshop/next-lesson-preview";
import WorkshopLessonsHeader from "~/components/features/workshop/workshop-lessons-header";
import WorkshopLessonsList from "~/components/features/workshop/workshop-lessons-list";
import { Button } from "~/components/ui/button";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import TitleIcon from "~/components/ui/title-icon";
import YoutubePlayer from "~/components/ui/video-players/youtube-player";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";
import { useUserFromOutletContext } from "~/lib/hooks/useUserFromOutletContext";
import type { Lesson } from "~/lib/models/lesson.server";
import type { Workshop } from "~/lib/models/workshop.server";
import { cn } from "~/lib/utils/cn";
import { isUpcoming } from "~/lib/utils/workshop-utils";
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
  const user = useUserFromOutletContext();

  return (
    <div className="flex flex-wrap lg:flex-nowrap lg:gap-14">
      {/* left Side */}
      <div className="w-full mb-6 lb:mt-12">
        {/* Video */}
        {workshop.status === "streaming" && workshop.streaming_url && (
          <YoutubePlayer youtubeEmbedUrl={workshop.streaming_url} />
        )}
        {workshop.status === "published" && (
          <NextLessonPreview workshop={workshop} nextLesson={nextLesson} />
        )}

        {showDescription && (
          <div className="">
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
        <div>
          {workshop.workshop_user ? (
            <WorkshopProgress workshop={workshop} />
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

              {/* Botão de Participar do Workshop */}
              {workshop.status === "soon" && (
                <>
                  {user ? (
                    <SubscribeToWorkshop workshop={workshop} />
                  ) : (
                    <LoginToSubscribeButton />
                  )}
                </>
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

function SubscribeToWorkshop({ workshop }: { workshop: Workshop }) {
  const fetcher = useFetcher<{ success: boolean }>();
  const [searchParams] = useSearchParams();
  const { showSuccessToast, showErrorToast } = useToasterWithSound();

  const isSubmittingOrLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  const join = searchParams.get("join");

  const handleClick = useCallback(() => {
    fetcher.submit(
      {
        slug: workshop.slug,
      },
      { method: "post" },
    );
  }, [fetcher, workshop.slug]);

  useEffect(() => {
    if (join) {
      handleClick();
    }
  }, [join, handleClick]);

  useEffect(() => {
    if (fetcher.data?.success === true) {
      showSuccessToast(
        "Sua inscrição está confirmada. Você receberá atualizações por e-mail.",
      );
    }

    if (fetcher.data?.success === false) {
      showErrorToast("Erro ao tentar participar do workshop.");
    }
  }, [fetcher.data, showSuccessToast, showErrorToast]);

  return (
    <Button
      variant="default"
      className="w-full p-8 text-xl flex items-center gap-4"
      onClick={handleClick}
    >
      {isSubmittingOrLoading ? (
        <>
          <CgSpinner className="animate-spin text-center inline-block h-5 w-5" />
        </>
      ) : (
        <>
          <RiLiveLine />
          Quero participar do workshop
        </>
      )}
    </Button>
  );
}

function LoginToSubscribeButton() {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);

  const buttonText = isHovering ? (
    <>
      <FiGithub />
      Entre com Github
    </>
  ) : (
    <>
      <RiLiveLine />
      Quero participar do workshop
    </>
  );

  return (
    <Button
      variant="default"
      onClick={() =>
        navigate(`/login?redirectTo=${window.location.pathname}?join=true`)
      }
      className={cn(
        isHovering && "bg-opacity-50",
        "w-full p-8 text-xl flex items-center gap-4",
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {buttonText}
    </Button>
  );
}

function WorkshopProgress({ workshop }: { workshop: Workshop }) {
  if (isUpcoming(workshop)) {
    return (
      <div className="dark:text-gray-300 text-gray-600 mt-2 text-sm bg-background-700 border-[1.5px] rounded-lg p-6 border-background-600">
        <h2 className="text-xl dark:text-gray-100 text-gray-700 mb-2 flex items-center gap-2">
          <TbCalendarCheck className=" w-6 h-6 text-green-400" />
          Inscrição confirmada
        </h2>
        Sua inscrição está confirmada nesse workshop. Nós vamos te atualizar das
        novidades por e-mail!
      </div>
    );
  }

  if (workshop.status === "published") {
    return (
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
    );
  }

  return null;
}
