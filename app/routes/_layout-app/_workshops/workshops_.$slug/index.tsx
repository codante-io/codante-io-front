import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/ui/cards/card-item-difficulty";
import CardItemDuration from "~/components/ui/cards/card-item-duration";
import TitleIcon from "~/components/ui/title-icon";
import { getWorkshop } from "~/lib/models/workshop.server";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Instructor } from "~/lib/models/instructor.server";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WorkshopLessonsList from "~/components/features/workshop/workshop-lessons-list";
import WorkshopLessonsHeader from "~/components/features/workshop/workshop-lessons-header";
import { abort404 } from "~/lib/utils/responses.server";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import {
  fromSecondsToTimeStringWithoutSeconds,
  getPublishedDateAndTime,
} from "~/lib/utils/interval";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import { MdComputer } from "react-icons/md";
import type { IconType } from "react-icons";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import AdminEditButton from "~/components/features/admin-edit-button/AdminEditButton";
import YoutubePlayer from "~/components/ui/video-players/youtube-player";
import ProgressBar from "~/routes/_layout-raw/_player/components/progress-bar";
import AlertBannerPortal from "~/components/ui/alert-banner-portal";

export const meta = ({ data, params }: any) => {
  if (!data?.workshop) return {};
  const title = `Workshop: ${data.workshop?.name} | Codante.io`;
  const description = data.workshop?.short_description ?? "";
  const imageUrl = getOgGeneratorUrl(
    data.workshop?.name ?? "Codante",
    "Workshop",
  );

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/workshops/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/workshops/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.workshop?.name },
  ];
};

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
  invariant(params.slug, `params.slug is required`);

  const workshop = await getWorkshop(params.slug, request);

  if (!workshop || !workshop.is_standalone) {
    return abort404();
  }

  return { slug: params.slug, workshop };
};

export default function WorkshopSlug() {
  const loaderData = useLoaderData<typeof loader>();
  const workshop = loaderData?.workshop;

  const [publishedDate, publishedTime] = getPublishedDateAndTime(
    workshop.published_at,
  );

  function workshopHasHappened() {
    if (!workshop.published_at) return false;
    const now = new Date();
    const date = new Date(workshop.published_at);

    return now.toISOString() > date.toISOString();
  }

  return (
    <section className="container mx-auto mt-8 mb-16 lg:mt-12">
      {workshop.status === "soon" && (
        <AlertBannerPortal
          title={`${
            workshopHasHappened()
              ? `Esse workshop aconteceu recentemente!`
              : "Ei! Esse workshop ainda não aconteceu!"
          }`}
          subtitle={`${
            workshopHasHappened()
              ? "Aguarde que em breve estará disponível na plataforma."
              : `Você poderá assisti-lo ao vivo ${
                  publishedDate
                    ? `no dia ${publishedDate}${
                        publishedTime ? ` às ${publishedTime}` : ""
                      }. Se preferir, será disponibilizada também a versão editada.`
                    : " em breve."
                }`
          }`}
        />
      )}

      {workshop.status === "streaming" && (
        <AlertBannerPortal
          type="workshop-is-live"
          title="Esse workshop está acontecendo agora!"
          subtitle="Você pode assistir ao vivo aqui embaixo o streaming ao vivo! 🎥"
        />
      )}
      {/* Header */}
      <header className="flex items-center gap-2 mb-8 lg:gap-6">
        <TitleIcon className="hidden w-8 h-8 lg:h-12 lg:w-12 md:inline-block" />
        <div>
          <span className="lg:text-2xl font-extralight">Workshop</span>
          <h1 className="text-3xl font-bold lg:text-5xl font-lexend">
            {workshop.name}
          </h1>
        </div>
      </header>

      {/* layout */}
      <div className="flex flex-wrap lg:flex-nowrap lg:gap-14">
        {/* left Side */}
        <div className="w-full">
          <div className="inline-flex gap-6 px-4 py-4 mb-4 lg:mb-12 md:w-auto lg:px-8 lg:gap-10 bg-background-200 dark:bg-background-800 rounded-xl">
            <CardItemDifficulty difficulty={workshop.difficulty} />
            <CardItemDuration
              durationString={fromSecondsToTimeStringWithoutSeconds(
                workshop?.lessons?.reduce(
                  (acc, lesson) => acc + lesson.duration_in_seconds,
                  0,
                ),
              )}
            />
          </div>

          <AdminEditButton url={`/workshop/${workshop.id}/edit`} />

          {/* Video */}
          {workshop.status === "streaming" && workshop.streaming_url && (
            <YoutubePlayer youtubeEmbedUrl={workshop.streaming_url} />
          )}
          {workshop.video_url && workshop.status !== "streaming" && (
            <VimeoPlayer vimeoUrl={workshop.video_url} />
          )}

          <div className="mt-6 lg:mt-12">
            <Subtitle text="Sobre o Workshop" />
            <div>
              <MarkdownRenderer markdown={workshop.description} />
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="lg:w-3/5">
          {/* Progress Bar & Certificate */}
          {workshop.workshop_user && (
            <div className="">
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
            </div>
          )}
          {/* Instrutor */}
          <div>
            <div className="flex items-center mt-12">
              <TitleIcon className="inline-block w-3 h-3 mr-2" />
              <h3 className="inline-block mt-0 text-lg font-light">
                Seu <span className="font-bold">Instrutor</span>
              </h3>
            </div>
            <InstructorCard instructor={workshop.instructor} />
          </div>

          {/* Aulas */}
          <div className="mt-12">
            {workshop.lessons.length > 0 && (
              <>
                <WorkshopLessonsHeader workshop={workshop} showResources />
                <WorkshopLessonsList activeIndex={-1} workshop={workshop} />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Subtitle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <TitleIcon className="w-5 h-5"></TitleIcon>
      <h3 className="text-2xl text-gray-700 dark:text-gray-50">{text}</h3>
    </div>
  );
}

function InstructorCard({ instructor }: { instructor: Instructor }) {
  const [opened, setOpened] = useState(false);
  const SocialIcons: { [key: string]: IconType } = {
    github: AiFillGithub,
    twitter: AiFillTwitterCircle,
    linkedin: AiFillLinkedin,
    website: MdComputer,
  };
  return (
    <div className="p-4 py-6 pr-4 mt-1 mb-4 transition rounded-lg hover:bg-background-150 dark:hover:bg-background-800">
      <div className="flex items-center">
        <img
          src={instructor?.avatar_url}
          alt=""
          className="w-12 h-12 mr-4 border-2 border-gray-600 rounded-full"
        />
        <div className="flex-1">
          <h4 className="dark:text-gray-50 text-lexend">{instructor?.name}</h4>
          <p className="text-sm font-light text-gray-500 dark:text-gray-300">
            {instructor.company}
          </p>
        </div>
        {opened ? (
          <XMarkIcon
            onClick={() => setOpened(!opened)}
            className="w-6 h-6 text-gray-500 cursor-pointer font-extralight dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
          />
        ) : (
          <InformationCircleIcon
            onClick={() => setOpened(!opened)}
            className="w-6 h-6 text-gray-500 cursor-pointer font-extralight hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-300"
          />
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: opened ? 1 : 0,
            height: opened ? "auto" : 0,
            transition: { opacity: { duration: 0.6 } },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: { opacity: { duration: 0.1 } },
          }}
          key={opened ? "open" : "closed"}
          className={`${
            opened ? "visible" : "invisible"
          } text-sm font-light text-gray-500 dark:text-gray-300 relative overflow-hidden`}
        >
          <div className=" [&>p]:mt-0 ">
            <MarkdownRenderer
              markdown={instructor.bio}
              wrapperClasses="prose-p:text-sm"
            />
            <div>
              {instructor.links?.map((link, i) => {
                const Icon = SocialIcons[link.type] ?? null;
                return (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 mr-4 text-sm font-light text-gray-500 dark:text-gray-300"
                  >
                    {Icon && (
                      <Icon className="mt-2 text-2xl text-gray-400 transition hover:text-gray-700 dark:text-gray-600 dark:hover:text-gray-300" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
