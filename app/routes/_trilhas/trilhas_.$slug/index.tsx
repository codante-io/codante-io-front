import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import TitleIcon from "~/components/title-icon";
import { getTrack } from "~/models/track.server";
import WorkshopCard from "~/components/cards/workshop-card";
import ChallengeCard from "~/components/cards/challenge-card";
import type { ChallengeCardInfo } from "~/models/challenge.server";
import type { Workshop } from "~/models/workshop.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  return json({ slug: params.slug, track: await getTrack(params.slug) });
};

export default function TrackSlug() {
  const { track } = useLoaderData<typeof loader>();

  return (
    <section className="container mx-auto mt-8 mb-16 lg:mt-16">
      {/* Header */}
      <header className="flex flex-col items-center justify-center gap-2 mb-8 text-center lg:gap-6">
        <div>
          <span className="lg:text-2xl font-extralight">Trilha</span>
          <h1 className="flex items-center gap-4 text-3xl font-bold lg:text-5xl font-lexend">
            <TitleIcon className="w-4 h-4 lg:h-8 lg:w-8" />
            {track.name}
          </h1>
        </div>
        <p className="max-w-3xl dark:text-slate-50 text-slate-600">
          {track.short_description}
        </p>
        <div className="inline-flex w-full gap-6 px-2 py-4 mb-12 md:w-auto lg:px-8 lg:gap-10 bg-slate-200 dark:bg-gray-dark rounded-xl">
          <CardItemDifficulty difficulty={2} />
        </div>
      </header>
      {/* layout */}
      <div className="flex flex-col items-center ">
        {track?.trackables.map(
          (
            workshopOrChallenge: ChallengeCardInfo | Workshop,
            index: number
          ) => (
            <div className="flex flex-col items-center" key={index}>
              {workshopOrChallenge?.pivot?.trackable_type.includes(
                "Workshop"
              ) ? (
                <WorkshopCard workshop={workshopOrChallenge as Workshop} />
              ) : (
                <ChallengeCard
                  challenge={workshopOrChallenge as ChallengeCardInfo}
                />
              )}
              {index !== track?.trackables?.length - 1 && (
                <div className="w-[1.5px] h-24 dark:bg-slate-600 bg-slate-200 mb-2" />
              )}
            </div>
          )
        )}
      </div>
    </section>
  );
}
