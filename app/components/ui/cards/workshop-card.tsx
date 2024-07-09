import { CalendarIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { RiLiveLine } from "react-icons/ri";
import Chip from "~/components/ui/chip";
import type { Workshop } from "~/lib/models/workshop.server";
import { getPublishedDateAndTime, humanTimeFormat } from "~/lib/utils/interval";
import { hasHappened, isNew } from "~/lib/utils/workshop-utils";
import CardDurationItem from "./card-item-duration";
import CardItemLessonsCount from "./card-item-lessons-count";

import { AiOutlineSolution } from "react-icons/ai";
import { cn } from "~/lib/utils/cn";

function WorkshopCard({
  workshop,
  openInNewTab = false,
}: {
  workshop: Workshop;
  openInNewTab?: boolean;
}) {
  return (
    <article className="w-full flex flex-col justify-center items-center h-full group">
      <Link
        to={`/workshops/${workshop?.slug}`}
        target={openInNewTab ? "_blank" : "_self"}
        className="relative flex-col w-full flex-grow flex md:flex-row max-w-xl border-[1.5px] border-background-200 dark:border-background-600 rounded-2xl bg-background-50 shadow dark:bg-background-800 hover:border-blue-300 hover:shadow-lg dark:hover:border-background-500 dark:hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <div className="group-hover:opacity-0 opacity-100 transition-all duration-500">
          <WorkshopChip workshop={workshop} />
        </div>

        <video
          autoPlay
          muted
          loop
          playsInline
          src={workshop.video_url}
          className={cn(
            "absolute top-0 opacity-0 right-0 bottom-0 left-0 w-full h-full rounded-2xl object-cover group-hover:opacity-60 transition-all duration-300 p-1 self-center scale-110",
            workshop.is_standalone && "object-right-bottom",
          )}
        />

        <div className="absolute w-full right-0 z-10 bg-transparent h-full opacity-100 dark:shadow-[inset_200px_0px_250px_0px_theme('colors.background.800')] shadow-[inset_200px_0px_50px_-100px_theme('colors.background.50')]"></div>

        <div className="this-div z-10 flex flex-col justify-between flex-1 px-6 py-4 text-left md:mt-0 overflow-hidden">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="font-extralight dark:text-gray-400 text-gray-500 text-xs">
                {workshop.is_standalone ? (
                  <div className={`flex items-center gap-1`}>
                    <RiLiveLine className="group-hover:text-red-400 w-3 h-3 opacity-70" />

                    <span>Workshop</span>
                  </div>
                ) : (
                  <div className={`flex items-center gap-1`}>
                    <AiOutlineSolution className="group-hover:text-green-500 w-3 h-3 opacity-70" />

                    <span>Tutorial</span>
                  </div>
                )}
              </div>
              <div className="mb-8">
                <h2 className="text-xl text-gray-700 xl:text-2xl dark:text-gray-50 font-lexend max-w-[50%]">
                  {workshop?.name}
                </h2>
              </div>
            </div>

            {/* Instrutor */}
            <div className="flex mb-12">
              {workshop?.instructor?.avatar_url && (
                <img
                  src={workshop?.instructor?.avatar_url}
                  alt=""
                  className="w-10 h-10 mr-4 border-2 rounded-full dark:border-background-700 border-background-200 "
                />
              )}
              <div>
                <p className="text-sm font-normal text-gray-700 dark:text-gray-50">
                  {workshop?.instructor?.name}
                </p>
                <p className="text-xs font-light text-gray-400 dark:text-gray-300">
                  {workshop?.instructor?.company}
                </p>
              </div>
            </div>
            <WorkshopCardFooter workshop={workshop} />
          </div>
        </div>
      </Link>
    </article>
  );
}

export default WorkshopCard;

function WorkshopCardFooter({ workshop }: { workshop: Workshop }) {
  const [publishedDate, publishedTime] = getPublishedDateAndTime(
    workshop.published_at,
  );
  return (
    <div className="flex justify-between">
      <div className="mt-auto flex gap-6 items-center">
        {workshop.status === "published" && (
          <>
            <CardItemLessonsCount lessonsCount={workshop?.lessons?.length} />
            <CardDurationItem
              durationString={humanTimeFormat(
                workshop?.lessons?.reduce(
                  (acc, lesson) => acc + lesson.duration_in_seconds,
                  0,
                ),
              )}
            />
          </>
        )}
        {workshop.status === "soon" && !hasHappened(workshop) && (
          <p className="inline-flex gap-2 items-center text-xs  text-brand-300 border border-brand-400 dark:border-brand-300 rounded-lg py-1 px-2 ">
            <span className="font-bold ">
              <CalendarIcon className="w-4 h-4 dark:text-brand-300 text-brand-400" />
            </span>{" "}
            <span className="dark:text-white text-gray-600">
              {publishedDate}
              {publishedTime ? ` às ${publishedTime}` : ""}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

function WorkshopChip({ workshop }: { workshop: Workshop }) {
  if (isNew(workshop)) {
    return <Chip text="Novo" />;
  }

  if (workshop.status === "soon" && !hasHappened(workshop)) {
    return <Chip text="Em breve" />;
  }

  if (workshop.status === "soon" && hasHappened(workshop)) {
    return <Chip text="Em Edição" />;
  }

  if (workshop.status === "streaming") {
    return <Chip type="unlisted" text="🔴 Ao vivo" />;
  }

  if (!workshop.is_premium) {
    return <Chip type="free" text="Gratuito" />;
  }
}
