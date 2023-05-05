import { Link } from "@remix-run/react";
import type { Track } from "~/models/track.server";
import CardItemDifficulty from "./card-item-difficulty";
import CardItemTag from "./card-item-tag";
import CardItemWorkshop from "~/components/cards/card-item-workshop";
import CardItemChallenge from "~/components/cards/card-item-challenge";
import CardItemRibbon from "~/components/cards/card-item-ribbon";

function TrackCard({ track }: { track: Track }) {
  const numberOfWorkshops =
    track?.trackables?.filter((trackable) =>
      trackable?.pivot?.trackable_type.includes("Workshop")
    ).length || 0;

  const numberOfChallenges =
    (track?.trackables?.length || 0) - (numberOfWorkshops || 0);

  return (
    <div key={track?.id}>
      <Link
        // onClick={(e) => track?.status === "soon" && e.preventDefault()}
        to={`/trilhas/${track?.slug}`}
        className="cursor-pointer"
      >
        <article className="relative border-[1.5px] border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-100 dark:bg-gray-800 mb-4 shadow-sm hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg flex flex-col md:flex-row">
          {track?.status === "soon" && <CardItemRibbon text="Em breve" />}

          <div
            style={{
              backgroundImage: `url(${track.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="w-auto m-4 mb-0 bg-white md:mb-4 dark:bg-slate-700 track-image md:w-36 h-36 rounded-xl"
          ></div>
          <div className="flex flex-col justify-between flex-1 px-6 py-4 text-left">
            <div>
              <div className="flex flex-col md:justify-between md:flex-row">
                <div>
                  <h2 className="mb-2 text-xl text-gray-800 dark:text-white">
                    {track?.name}
                  </h2>
                  <div>
                    {track?.tags?.map((tag) => {
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
                <CardItemDifficulty
                  difficulty={track?.difficulty}
                  className="mb-2"
                />
              </div>

              <p className="w-full font-sans font-light text-slate-600 dark:text-zinc-300 line-clamp-3 ">
                {track?.short_description}
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-6 sm:flex-row lg:mt-0">
              <CardItemWorkshop workshopsCount={numberOfWorkshops} />
              <CardItemChallenge challengesCount={numberOfChallenges} />
            </div>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default TrackCard;
