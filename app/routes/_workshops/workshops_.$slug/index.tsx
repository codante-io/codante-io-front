import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import CardItemDuration from "~/components/cards/card-item-duration";
import TitleIcon from "~/components/title-icon";
import { getWorkshop } from "~/models/workshop.server";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { InformationCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { Instructor } from "~/models/instructor.server";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BannerAlert from "~/components/banner-alert";
import WorkshopLessonsList from "~/components/workshop-lessons-list";
import WorkshopLessonsHeader from "~/components/workshop-lessons-header";
import { abort404 } from "~/utils/responses.server";
import VimeoPlayer from "~/components/vimeo-player";
import {
  fromSecondsToTimeStringWithoutSeconds,
  getPublishedDateAndTime,
} from "~/utils/interval";
import MarkdownRenderer from "~/components/markdown-renderer";
import { MdComputer } from "react-icons/md";
import type { IconType } from "react-icons";
import { getOgGeneratorUrl } from "~/utils/path-utils";
import AdminEditButton from "~/components/admin-edit-button/AdminEditButton";

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  if (!data?.workshop) return {};
  const title = `Workshop: ${data.workshop?.name} | Codante.io`;
  const description = data.workshop?.short_description ?? "";
  const imageUrl = getOgGeneratorUrl(
    data.workshop?.name ?? "Codante",
    "Workshop"
  );

  return {
    title: title,
    description: description,
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "og:type": "website",
    "og:url": `https://codante.io/workshops/${params.slug}`,

    "twitter:card": "summary_large_image",
    "twitter:domain": "codante.io",
    "twitter:url": `https://codante.io/workshops/${params.slug}`,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
    "twitter:image:alt": data.workshop?.name,
  };
};

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  const workshop = await getWorkshop(params.slug);
  if (!workshop) {
    return abort404();
  }

  return { slug: params.slug, workshop };
};

export default function WorkshopSlug() {
  const loaderData = useLoaderData<typeof loader>();
  const workshop = loaderData?.workshop;
  const [publishedDate, publishedTime] = getPublishedDateAndTime(
    workshop.published_at
  );
  console.log(publishedDate, publishedTime);

  return (
    <section className="container mx-auto mt-8 mb-16 lg:mt-12">
      {workshop.status === "soon" && (
        <BannerAlert
          title="Ei! Esse workshop ainda não aconteceu!"
          subtitle={`Você poderá assisti-lo ao vivo${
            publishedDate ? ` no dia ${publishedDate}` : " em breve"
          }${
            publishedTime ? ` às ${publishedTime}` : ""
          }. Se preferir, será disponibilizada também a versão editada.`}
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
                  0
                )
              )}
            />
          </div>

          {/* Difficulty Card */}

          {/* Video */}
          {workshop.video_url && <VimeoPlayer vimeoUrl={workshop.video_url} />}
          <div className="mt-6 lg:mt-12">
            <AdminEditButton url={`/workshop/${workshop.id}/edit`} />
            <Subtitle text="Sobre o Workshop" />
            <div>
              <MarkdownRenderer markdown={workshop.description} />
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="lg:w-3/5">
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
          {/* Aulas */}
          <div className="mt-12">
            {workshop.lessons.length > 0 && (
              <>
                <WorkshopLessonsHeader workshop={workshop} />
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
    <div className="p-4 py-6 pr-4 mt-1 mb-4 transition rounded-lg hover:bg-background-200 dark:hover:bg-background-800">
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
            <MarkdownRenderer markdown={instructor.bio} />
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
                      <Icon className="mt-2 text-2xl text-gray-300 transition hover:text-gray-700 dark:text-gray-700 dark:hover:text-gray-300" />
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
