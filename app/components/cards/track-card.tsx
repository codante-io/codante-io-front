import { Link } from "@remix-run/react";
import type { Track } from "~/models/track.server";
import CardDurationItem from "./card-item-duration";
import CardItemDifficulty from "./card-item-difficulty";
import CardItemTag from "./card-item-tag";
import CardItemLessonsCount from "./card-item-lessons-count";
import CardItemWorkshop from "~/components/cards/card-item-workshop";
import CardItemChallenge from "~/components/cards/card-item-challenge";

function TrackCard({ track }: { track: Track }) {
  return (
    <div key={track?.id}>
      <Link to={track?.slug}>
        <article className="border-[1.5px] border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-100 dark:bg-gray-800 mb-4 flex shadow-sm hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg">
          <div
            style={{
              backgroundImage: "url(/img/browser.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="track-image w-36 h-36 m-4 rounded-xl"
          ></div>
          <div className="flex flex-col justify-between flex-1 px-6 py-4 text-left">
            <div>
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl capitalize text-gray-800 dark:text-white">
                    {track?.name}
                  </h2>
                  <div className="min-h-[24px]">
                    {track?.tags?.map((tag) => {
                      return (
                        <CardItemTag
                          tagName={tag.name}
                          key={tag.id}
                          className="bg-blue-900 text-white dark:bg-blue-900 dark:text-white"
                        />
                      );
                    })}
                  </div>
                </div>
                <CardItemDifficulty
                  difficulty={track?.difficulty}
                  className="mb-2"
                />
              </div>

              <p className="font-light font-sans text-slate-600 dark:text-zinc-300 w-full line-clamp-3 ">
                {track?.short_description}
              </p>
            </div>
            <div className="flex gap-4">
              <CardItemWorkshop workshopsCount={2} />
              <CardItemChallenge challengesCount={8} />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default TrackCard;
