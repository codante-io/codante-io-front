import { Link } from "@remix-run/react";
import type { Workshop } from "~/models/workshop.server";
import CardDurationItem from "./card-item-duration";
import CardItemDifficulty from "./card-item-difficulty";
import CardItemTag from "./card-item-tag";
import CardItemLessonsCount from "./card-item-lessons-count";

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <div key={workshop.id}>
      <Link to={workshop.slug}>
        <article className="max-w-[700px] border-[1.5px] border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-50 dark:bg-gray-800 mb-4 flex shadow-sm dark:shadow-none hover:border-blue-300 hover:shadow-lg">
          <div
            style={{
              backgroundImage: "url(/img/computer.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="workshop-image w-52 min-h-full rounded-l-xl m-[4px]"
          ></div>
          <div className="flex-1 px-6 py-4 text-left">
            <CardItemDifficulty
              difficulty={workshop.difficulty}
              className="mb-2"
            />
            <div className="mb-8">
              <h2 className="text-xl capitalize mb-1 text-gray-800 dark:text-white">
                {workshop?.name}
              </h2>
              <div className="min-h-[24px]">
                {workshop.tags?.map((tag) => {
                  return (
                    <CardItemTag
                      tagName={tag.name}
                      key={tag.id}
                      className="bg-gray-300"
                    />
                  );
                })}
              </div>
            </div>
            <div className="mb-8 flex">
              <img
                src="/img/icaro.jpg"
                alt=""
                className="w-10 h-10 rounded-full mr-4 border-2 border-gray-600"
              />
              <div>
                <p className="text-sm font-normal text-gray-800 dark:text-white">
                  {workshop?.instructor?.name}
                </p>
                <p className="text-xs font-light text-gray-500 capitalize">
                  {workshop?.instructor?.company}
                </p>
              </div>
            </div>
            <div className="mb-10 h-24">
              <p className="font-light font-sans text-zinc-600 dark:text-gray-400 w-full line-clamp-3 ">
                {workshop?.short_description}
              </p>
            </div>
            <div>
              <CardItemLessonsCount lessonsCount={8} className="mb-[0.2rem]" />
              <CardDurationItem durationString="20 minutos" />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default WorkshopCard;
