import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import { getTrack } from "~/models/track.server";
import WorkshopCard from "~/components/cards/workshop-card";
import ChallengeCard from "~/components/cards/challenge-card";
import type {
  ChallengeCard as ChallengeCardType,
  Challenge,
} from "~/models/challenge.server";
import type { Workshop } from "~/models/workshop.server";
import { getOgGeneratorUrl } from "~/utils/path-utils";
import AdminEditButton from "~/components/admin-edit-button/AdminEditButton";

export const meta = ({ data, params }: any) => {
  const title = `Trilha: ${data.track?.name} | Codante.io`;
  const description = data.track?.short_description ?? "";
  const imageUrl = getOgGeneratorUrl(data.track?.name ?? "Codante", "Trilha");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/trilhas/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/trilhas/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.track?.name },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
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
            {/* <TitleIcon className="w-4 h-4 lg:h-8 lg:w-8" /> */}
            {track.name}
          </h1>
        </div>
        <p className="max-w-3xl text-gray-600 dark:text-gray-50">
          {track.short_description}
        </p>
        <div className="inline-flex w-full gap-6 px-2 py-4 mb-12 md:w-auto lg:px-8 lg:gap-10 bg-background-200 dark:bg-background-800 rounded-xl">
          <CardItemDifficulty difficulty={2} />
        </div>
        <AdminEditButton url={`/track/${track.id}/edit`} />
      </header>
      {/* layout */}
      <div className="flex flex-col items-center ">
        {track.trackables &&
          track?.trackables.map(
            (workshopOrChallenge: Challenge | Workshop, index: number) => (
              <div className="flex flex-col items-center" key={index}>
                {workshopOrChallenge?.pivot?.trackable_type.includes(
                  "Workshop",
                ) ? (
                  <WorkshopCard workshop={workshopOrChallenge as Workshop} />
                ) : (
                  <ChallengeCard
                    challenge={workshopOrChallenge as ChallengeCardType}
                  />
                )}
                {track.trackables &&
                  index !== track?.trackables?.length - 1 && (
                    <div className="w-[1.5px] h-24 dark:bg-background-600 bg-background-200 mb-2" />
                  )}
              </div>
            ),
          )}
      </div>
    </section>
  );
}
