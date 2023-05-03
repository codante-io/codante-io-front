import { Link } from "@remix-run/react";
import type { Workshop } from "~/models/workshop.server";
import CardDurationItem from "./card-item-duration";
import CardItemDifficulty from "./card-item-difficulty";
import CardItemTag from "./card-item-tag";
import CardItemLessonsCount from "./card-item-lessons-count";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import {
  fromSecondsToTimeString,
  fromSecondsToTimeStringWithoutSeconds,
} from "~/utils/interval";

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <div key={workshop.id}>
      <Link
        // onClick={(e) => workshop?.status === "soon" && e.preventDefault()}
        to={workshop?.slug}
        className={
          // workshop?.status === "soon" ? "cursor-not-allowed" : "cursor-pointer"
          ""
        }
      >
        <article className="relative flex-col flex md:flex-row max-w-3xl border-[1.5px] border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-100 dark:bg-gray-800 mb-4 shadow-sm hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg">
          {workshop?.status === "soon" && <CardItemRibbon text="Em breve" />}

          <div
            style={{
              backgroundImage: "url(/img/computer.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              // boxShadow: "inset 0px -190px 50px -100px #1f2937",
            }}
            className="w-full md:w-52 h-32 md:h-auto min-h-full rounded-t-xl md:rounded-l-xl md:rounded-tr-none md:m-[4px] shadow-[inset_0_-190px_50px_-100px_theme('colors.slate.100')] dark:shadow-[inset_0_-190px_50px_-100px_theme('colors.gray.800')] md:shadow-none"
          ></div>
          <div className="flex-1 px-6 py-4 -mt-10 text-left md:mt-0">
            <CardItemDifficulty
              difficulty={workshop.difficulty}
              className="mb-2"
            />
            <div className="mb-8">
              <h2 className="mb-1 text-xl text-gray-800 capitalize dark:text-white">
                {workshop?.name}
              </h2>
              <div className="min-h-[24px]">
                {workshop.tags?.map((tag) => {
                  return (
                    <CardItemTag
                      tagName={tag.name}
                      key={tag.id}
                      className="text-white bg-blue-900 dark:bg-blue-900 dark:text-white"
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex mb-8">
              {workshop?.instructor?.avatar_url && (
                <img
                  src={workshop?.instructor?.avatar_url}
                  alt=""
                  className="w-10 h-10 mr-4 border-2 border-gray-600 rounded-full"
                />
              )}
              <div>
                <p className="text-sm font-normal text-gray-800 dark:text-white">
                  {workshop?.instructor?.name}
                </p>
                <p className="text-xs font-light text-gray-700 capitalize dark:text-zinc-300">
                  {workshop?.instructor?.company}
                </p>
              </div>
            </div>
            <div className="h-24 mb-10">
              <p className="w-full font-sans font-light text-slate-600 dark:text-zinc-300 line-clamp-3 ">
                {workshop?.short_description}
              </p>
            </div>
            <div>
              <CardItemLessonsCount
                lessonsCount={workshop?.lessons?.length}
                className="mb-[0.2rem]"
              />
              <CardDurationItem
                durationString={fromSecondsToTimeStringWithoutSeconds(
                  workshop?.lessons?.reduce(
                    (acc, lesson) => acc + lesson.duration_in_seconds,
                    0
                  )
                )}
              />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default WorkshopCard;
