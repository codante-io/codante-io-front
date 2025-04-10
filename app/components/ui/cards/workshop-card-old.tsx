import { CalendarIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";
import { Fragment } from "react/jsx-runtime";
import CardItemRibbon from "~/components/ui/cards/card-item-ribbon";
import type { Workshop } from "~/lib/models/workshop.server";
import {
  fromSecondsToTimeStringWithoutSeconds,
  getPublishedDateAndTime,
} from "~/lib/utils/interval";
import { hasHappened } from "~/lib/utils/workshop-utils";
import CardItemDifficulty from "./card-item-difficulty";
import CardDurationItem from "./card-item-duration";
import CardItemLessonsCount from "./card-item-lessons-count";
import WorkshopCardTag from "./card-item-tag";

function WorkshopCard({
  workshop,
  openInNewTab = false,
}: {
  workshop: Workshop;
  openInNewTab?: boolean;
}) {
  return (
    <article className="w-full flex flex-col justify-center items-center">
      <Link
        to={`/workshops/${workshop?.slug}`}
        target={openInNewTab ? "_blank" : "_self"}
        className="relative flex-col w-full grow flex md:flex-row max-w-xl border-[1.5px] border-background-200 dark:border-background-600 rounded-2xl bg-background-50 shadow-xs dark:bg-background-700 mb-4  hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow"
      >
        {workshop?.status === "soon" && !hasHappened(workshop) && (
          <CardItemRibbon text="Em breve" />
        )}
        {workshop?.status === "soon" && hasHappened(workshop) && (
          <CardItemRibbon text="Em Edição" />
        )}
        {workshop?.status === "streaming" && (
          <CardItemRibbon type="live-now" text="Ao vivo agora 🔴" />
        )}

        <div
          style={{
            backgroundImage: `url(${
              workshop.image_url || "/img/computer.jpg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full md:w-56 lg:w-40 xl:w-56 md:h-auto h-40 rounded-t-xl md:rounded-l-xl md:rounded-tr-none md:m-[4px] shadow-[inset_0_-190px_50px_-100px_var(--color-background-50)] dark:shadow-[inset_0_-190px_50px_-100px_var(--color-background-700)] md:dark:shadow-[inset_none] md:shadow-[inset_none]"
        ></div>

        <div className="flex flex-col justify-between flex-1 px-6 py-4 -mt-10 text-left md:mt-0 h-[410px] overflow-hidden">
          <div>
            <CardItemDifficulty
              difficulty={workshop.difficulty}
              className="mb-2"
            />
            <div className="mb-8">
              <h2 className="mb-1 text-lg text-gray-700 lg:text-xl dark:text-gray-50 font-lexend ">
                {workshop?.name}
              </h2>
              <div className=" flex flex-wrap gap-1 ">
                {workshop.tags?.map((tag) => {
                  return (
                    <Fragment key={tag.id}>
                      <WorkshopCardTag
                        tagName={tag.name}
                        key={tag.id}
                        className="italic text-gray-500 dark:text-gray-400 border dark:border-background-600 px-1.5 rounded-full"
                      />
                      {/* {i !== workshop.tags.length - 1 && (
                        <span className="text-[10px] text-gray-500 dark:text-gray-400 -ml-1">
                          ,
                        </span>
                      )} */}
                    </Fragment>
                  );
                })}
              </div>
            </div>
            {/* Instrutor */}
            <div className="flex xl:mb-8 mb-5">
              {workshop?.instructor?.avatar_url && (
                <img
                  src={workshop?.instructor?.avatar_url}
                  alt=""
                  className="w-10 h-10 mr-4 border-2 rounded-full dark:border-background-700 border-background-200"
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
            <div className="h-24 lg:mb-2">
              <p className="w-full  font-extralight xl:font-light text-[13px] xl:text-[15px] text-gray-700 dark:text-gray-300 line-clamp-4">
                {workshop?.short_description}
              </p>
            </div>
          </div>
          <WorkshopCardFooter workshop={workshop} />
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
    <div className="mt-auto">
      {workshop.status === "published" && (
        <>
          <CardItemLessonsCount
            lessonsCount={workshop?.lessons?.length}
            className="mb-[0.2rem]"
          />
          <CardDurationItem
            durationString={fromSecondsToTimeStringWithoutSeconds(
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
  );
}
