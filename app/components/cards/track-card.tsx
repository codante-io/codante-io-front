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

  console.log(track.image_url);

  return (
    <div key={track?.id}>
      <Link
        onClick={(e) => track?.status === "soon" && e.preventDefault()}
        to={`/trilhas/${track?.slug}`}
        className={
          track?.status === "soon" ? "cursor-not-allowed" : "cursor-pointer"
        }
      >
        <article className="relative border-[1.5px] border-slate-300 dark:border-slate-600 rounded-2xl bg-slate-100 dark:bg-gray-800 mb-4 flex shadow-sm hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg">
          {track?.status === "soon" && <CardItemRibbon text="Em breve" />}

          <div
            style={{
              backgroundImage: `url(${track.image_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="m-4 bg-white dark:bg-slate-700 track-image w-36 h-36 rounded-xl"
          ></div>
          <div className="flex flex-col justify-between flex-1 px-6 py-4 text-left">
            <div>
              <div className="flex flex-col justify-between md:flex-row">
                <div>
                  <h2 className="text-xl text-gray-800 capitalize dark:text-white">
                    {track?.name}
                  </h2>
                  <div className="min-h-[24px]">
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
            <div className="flex gap-4">
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
