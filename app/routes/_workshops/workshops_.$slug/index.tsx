import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import CardItemDuration from "~/components/cards/card-item-duration";
import TitleIcon from "~/components/title-icon";
import type { Workshop } from "~/models/workshop.server";
import { getWorkshop } from "~/models/workshop.server";
import { AiFillPlayCircle } from "react-icons/ai";
import type { Lesson } from "~/models/lesson.server";
import {
  InformationCircleIcon,
  LockClosedIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import type { Instructor } from "~/models/instructor.server";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BannerAlert from "~/components/banner-alert";
import WorkshopLessonsList from "~/components/workshop-lessons-list";
import WorkshopLessonsHeader from "~/components/workshop-lessons-header";
import { abort404 } from "~/utils/responses.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  const workshop = await getWorkshop(params.slug);
  if (!workshop) {
    abort404();
  }

  return json({ slug: params.slug, workshop: await getWorkshop(params.slug) });
};

export default function WorkshopSlug() {
  const loaderData = useLoaderData<typeof loader>();
  const workshop: Workshop = loaderData.workshop;
  console.log(workshop);

  return (
    <section className="container mx-auto mt-8 mb-16 lg:mt-12">
      {workshop.status === "soon" && (
        <BannerAlert
          title="Ei! Esse workshop ainda não aconteceu!"
          subtitle="Você poderá assistir ao vivo quando ele for ao ar!"
        />
      )}
      {/* Header */}
      <header className="flex flex-wrap items-center gap-2 mb-8 lg:gap-6">
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
          <div className="inline-flex w-full gap-6 px-2 py-4 mb-12 md:w-auto lg:px-8 lg:gap-10 bg-slate-200 dark:bg-gray-dark rounded-xl">
            <CardItemDifficulty difficulty={2} />
            <CardItemDuration durationString="2h50min" />
          </div>
          {/* Difficulty Card */}

          {/* Video */}
          <div className="mb-10">
            {workshop.video_url && (
              <div className="relative mb-12 ">
                <AiFillPlayCircle className="absolute opacity-1 top-[35%] left-[40%]  h-40 w-40" />
                <img
                  src="https://loremflickr.com/1920/1080?lock=1"
                  alt=""
                  className="opacity-20"
                />
              </div>
            )}
            <Subtitle text="Sobre o Workshop" />
            <p className="dark:text-slate-400 text-slate-600">
              {workshop.description}
            </p>
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
      <h3 className="text-2xl text-slate-700 dark:text-slate-200">{text}</h3>
    </div>
  );
}

function InstructorCard({ instructor }: { instructor: Instructor }) {
  const [opened, setOpened] = useState(false);
  return (
    <div className="p-2 py-4 pr-4 mt-1 mb-4 transition rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800">
      <div className="flex items-center">
        <img
          src="/img/icaro.jpg"
          alt=""
          className="w-12 h-12 mr-4 border-2 border-gray-600 rounded-full"
        />
        <div className="flex-1">
          <h4 className="dark:text-slate-200 text-lexend">
            {instructor?.name}
          </h4>
          <p className="text-sm font-light text-slate-500 dark:text-slate-400">
            {instructor.company}
          </p>
        </div>
        {opened ? (
          <XMarkIcon
            onClick={() => setOpened(!opened)}
            className="w-6 h-6 cursor-pointer font-extralight text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          />
        ) : (
          <InformationCircleIcon
            onClick={() => setOpened(!opened)}
            className="w-6 h-6 cursor-pointer font-extralight text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
          />
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.p
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
          } text-sm font-light text-slate-500 dark:text-slate-300 relative`}
        >
          <span className="block p-4 ml-12">{instructor.bio}</span>
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
