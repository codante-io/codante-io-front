import { CalendarIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { CheckCheck } from "lucide-react";
import { AiOutlineSolution } from "react-icons/ai";
import { RiLiveLine } from "react-icons/ri";
import Chip from "~/components/ui/chip";
import type { WorkshopCard } from "~/lib/models/workshop.server";
import { cn } from "~/lib/utils/cn";
import { getPublishedDateAndTime, humanTimeFormat } from "~/lib/utils/interval";
import { hasHappened, isNew } from "~/lib/utils/workshop-utils";
import CardDurationItem from "./card-item-duration";
import CardItemLessonsCount from "./card-item-lessons-count";

const workshopCardVariants = cva("", {
  variants: {
    size: {
      default: "min-h-[240px]",
      sm: "min-h-[190px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type WorkshopCardProps = {
  workshop: WorkshopCard;
  openInNewTab?: boolean;
  withProgress?: boolean;
  withChip?: boolean;
} & VariantProps<typeof workshopCardVariants>;

function WorkshopCard({
  workshop,
  openInNewTab = false,
  withProgress = false,
  withChip = true,
  size,
}: WorkshopCardProps) {
  return (
    <article
      className={cn(
        "w-full flex flex-col justify-center items-center group @container",
      )}
    >
      <Link
        to={`/workshops/${workshop?.slug}`}
        target={openInNewTab ? "_blank" : "_self"}
        className="w-full"
        prefetch="intent"
      >
        <div
          className={cn(
            "relative flex-col  flex-grow flex md:flex-row max-w-xl border-[1.5px] border-background-200 dark:border-background-600 rounded-2xl bg-background-50 shadow dark:bg-background-800 hover:border-blue-300 hover:shadow-lg dark:hover:border-background-500 dark:hover:shadow-lg transition-all duration-300 overflow-hidden",
            workshopCardVariants({ size }),
          )}
        >
          {withChip && (
            <div className="z-20 transition-all duration-300 opacity-100 group-hover:opacity-0">
              <WorkshopChip workshop={workshop} />
            </div>
          )}

          <VideoHoverElement workshop={workshop} />

          <div className="z-10 flex flex-col justify-between flex-1 px-6 py-4 overflow-hidden text-left md:mt-0">
            <div className="flex flex-col justify-between flex-1">
              <div>
                {withProgress && <ProgressBar workshop={workshop} />}

                <div className="text-xs text-gray-500 font-extralight dark:text-gray-400">
                  {workshop.is_standalone ? (
                    <div className={`flex items-center gap-1`}>
                      <RiLiveLine className="w-3 h-3 group-hover:text-red-400 opacity-70" />
                      <span>Workshop</span>
                    </div>
                  ) : (
                    <div className={`flex items-center gap-1`}>
                      <AiOutlineSolution className="w-3 h-3 group-hover:text-green-500 opacity-70" />

                      <span>Tutorial</span>
                    </div>
                  )}
                </div>
                <div className="">
                  <h2 className="@xs:text-lg text-lg leading-tight @sm:text-lg @md:text-lg text-gray-700 @lg:text-[20px] dark:text-gray-50 font-lexend max-w-[75%]">
                    {workshop?.name}
                  </h2>
                </div>
              </div>

              <div className="">
                {/* Instrutor */}
                {size !== "sm" && (
                  <div className="flex mb-6">
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
                )}
                <WorkshopCardFooter
                  withProgress={withProgress}
                  workshop={workshop}
                  withChip={withChip}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

export default WorkshopCard;

function WorkshopCardFooter({
  workshop,
  withProgress = false,
  withChip = true,
}: {
  workshop: WorkshopCard;
  withProgress: boolean;
  withChip?: boolean;
}) {
  const [publishedDate, publishedTime] = getPublishedDateAndTime(
    workshop.published_at,
  );

  const percentageCompleted = workshop.pivot?.percentage_completed ?? 0;
  const lessonsCompleted = withProgress
    ? Math.round((workshop.lessons_count * percentageCompleted) / 100)
    : null;

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-6 mt-auto">
        {workshop.status === "published" && (
          <>
            <CardItemLessonsCount
              completedLessonsCount={lessonsCompleted}
              lessonsCount={workshop.lessons_count}
            />
            <CardDurationItem
              durationString={humanTimeFormat(workshop.duration_in_seconds)}
            />
            {withProgress && percentageCompleted === 100 && (
              <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 decoration-green-400 underline-offset-2">
                <CheckCheck className="w-4 h-4 text-green-400" />
                Completo{" "}
              </div>
            )}
          </>
        )}
        {withChip && workshop.status === "soon" && !hasHappened(workshop) && (
          <p className="inline-flex items-center gap-2 px-2 py-1 text-xs border rounded-lg text-brand-300 border-brand-400 dark:border-brand-300 ">
            <span className="font-bold ">
              <CalendarIcon className="w-4 h-4 dark:text-brand-300 text-brand-400" />
            </span>{" "}
            <span className="text-gray-600 dark:text-white">
              {publishedDate}
              {publishedTime ? ` às ${publishedTime}` : ""}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

function WorkshopChip({ workshop }: { workshop: WorkshopCard }) {
  if (workshop.status === "soon" && !hasHappened(workshop)) {
    return <Chip text="Em breve" />;
  }

  if (workshop.status === "soon" && hasHappened(workshop)) {
    return <Chip text="Em Edição" />;
  }

  if (workshop.status === "streaming") {
    return <Chip type="unlisted" text="🔴 Ao vivo" />;
  }

  if (isNew(workshop)) {
    return <Chip text="Novo" />;
  }

  if (!workshop.is_premium) {
    return <Chip type="free" text="Gratuito" />;
  }
}

function VideoHoverElement({ workshop }: { workshop: WorkshopCard }) {
  return (
    <>
      <video
        autoPlay
        muted
        loop
        playsInline
        data-src={workshop.video_url}
        className={cn(
          "absolute top-0 opacity-0 right-0 bottom-0 left-0 w-full h-full rounded-2xl object-cover group-hover:opacity-60 transition-all duration-300 p-1 self-center scale-110",
          workshop.is_standalone && "object-right-bottom",
          "lazy", // lazy-loading library
        )}
      />

      <div className="absolute w-full right-0 z-10 bg-transparent h-full opacity-100 dark:shadow-[inset_200px_0px_250px_0px_theme('colors.background.800')] shadow-[inset_200px_0px_50px_-100px_theme('colors.background.50')]"></div>
    </>
  );
}

function ProgressBar({ workshop }: { workshop: WorkshopCard }) {
  return (
    <div
      className={cn(
        "h-1.5 bg-gray-200 dark:bg-background-700 rounded-full mb-3  w-full",
        workshop.pivot?.percentage_completed === 100 && "hidden",
      )}
    >
      <div
        className={cn("h-1.5 bg-yellow-300 rounded-full mb-2")}
        style={{
          width: Number(workshop.pivot?.percentage_completed) + "%",
        }}
      ></div>
    </div>
  );
}
