import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import TitleIcon from "~/components/title-icon";
import type { Track } from "~/models/track.server";
import { getTrack } from "~/models/track.server";

import { useEffect } from "react";
import WorkshopCard from "~/components/cards/workshop-card";
import { Workshop } from "~/models/workshop.server";
import { ChallengeCardInfo } from "~/models/challenge.server";
import ChallengeCard from "~/components/cards/challenge-card";

const workshops: Workshop[] = [
  {
    id: 1,
    name: "provident ut assumenda",
    short_description:
      "Eos eum vero ad atque. Modi qui quidem atque pariatur animi velit ducimus. Est ut sit itaque ducimus.",
    description:
      "Ipsam illum eligendi perferendis. Blanditiis corporis eos aut dolor voluptatem ut est enim. Et accusantium reiciendis facilis voluptatem. Ut numquam et vel quia voluptatem dolorem ducimus.\n\nCupiditate officiis dolores nostrum occaecati sint. Numquam qui reprehenderit ipsa impedit sit eos quo.\n\nAsperiores vero aut et temporibus eius alias soluta ipsa. Voluptate blanditiis exercitationem est dolorem tenetur magni nam. Molestiae velit nemo ratione. Amet nostrum dolorem consectetur architecto quibusdam provident.\n\nAccusamus inventore exercitationem iste qui. Omnis sunt soluta esse aspernatur laboriosam deleniti. Error sunt necessitatibus et sint qui. Temporibus esse quidem aut perspiciatis.",
    image_url:
      "https://via.placeholder.com/640x480.png/004422?text=Avatar+earum",
    slug: "sed-quis-cumque-quo-maiores",
    status: "draft",
    is_standalone: 1,
    difficulty: 2,
    duration_in_minutes: 293,
    instructor_id: 11,
    challenge_id: null,
    featured: "landing",
    published_at: "2022-12-01",
    created_at: "2023-04-14 16:47:56",
    updated_at: "2023-04-14 16:47:56",
  },
  {
    id: 2,
    name: "maxime voluptatem eum",
    short_description:
      "Quo a accusamus sint consequuntur. Sunt nobis numquam ad voluptate. Delectus minus ex aut quo magni et.",
    description:
      "Inventore qui corrupti voluptatibus aut tempora ut. Consequatur impedit voluptatem cumque.\n\nAccusantium dolores recusandae velit explicabo. Et debitis iste ut quod non quia. Nostrum totam corrupti aut qui in.\n\nNulla aut ex quia aut. Reiciendis aspernatur eos cumque voluptatem rerum dolores quaerat dolor. Et omnis perspiciatis consequatur enim enim corporis autem nostrum. Quia quia cum id rerum qui.\n\nIllum minus est alias fuga officia fuga laborum. Est facere qui nihil fugiat sint omnis distinctio. Voluptas qui aut dignissimos cupiditate est inventore aliquam. Optio velit vero repellendus delectus explicabo id est.",
    image_url:
      "https://via.placeholder.com/640x480.png/004499?text=Avatar+repudiandae",
    slug: "ipsa-quod-ut-aperiam-maxime",
    status: "draft",
    is_standalone: 1,
    difficulty: 1,
    duration_in_minutes: 236,
    instructor_id: 12,
    challenge_id: null,
    featured: "new",
    published_at: "2022-11-09",
    created_at: "2023-04-14 16:47:56",
    updated_at: "2023-04-14 16:47:56",
  },
  {
    id: 3,
    name: "quis atque vel",
    short_description:
      "Adipisci et saepe alias consequatur. Quo facilis necessitatibus eveniet maxime quia omnis quos.",
    description:
      "Et voluptatem magni voluptas velit iure molestiae. Vel vel unde deserunt possimus totam modi. Rerum a tempore aperiam minima magni.\n\nVelit consectetur aliquam nesciunt quaerat quos. Nam ducimus qui cum vel pariatur enim qui. Ut et animi consequatur. Molestiae aut id ut harum.\n\nVoluptatem ut nulla asperiores quisquam voluptatem ipsa et. Consectetur asperiores sapiente similique. Quis totam est eum. Quis nesciunt iusto iure enim fugit explicabo. Sunt et molestiae dolor voluptatem veniam repellendus.\n\nNihil qui expedita eveniet quia. Excepturi et debitis accusamus ullam. Necessitatibus aut quis tempore ut consequuntur delectus.",
    image_url:
      "https://via.placeholder.com/640x480.png/0099aa?text=Avatar+maxime",
    slug: "consequatur-ducimus-velit-veritatis-cumque-et",
    status: "archived",
    is_standalone: 1,
    difficulty: 3,
    duration_in_minutes: 180,
    instructor_id: 13,
    challenge_id: null,
    featured: "new",
    published_at: "2023-02-22",
    created_at: "2023-04-14 16:47:57",
    updated_at: "2023-04-14 16:47:57",
  },
];

const miniProjects: ChallengeCardInfo[] = [
  {
    id: "1",
    name: "Cronômetro para Escola",
    slug: "cronometro-para-escola",
    short_description:
      "Uma professora está buscando uma forma diferente de cronometrar seus intervalos. Crie um timer ou cronômetro",
    image_url: "/img/keyboard-icon.png",
    difficulty: 1,
    status: "soon",
    duration_in_minutes: "3h30",
    enrolled_users_count: 8,
    tags: [{ id: "1", name: "React", color: "#ff8052" }],
  },
  {
    id: "2",
    name: "Cronômetro para Escola",
    slug: "cronometro-para-escola",
    short_description:
      "Uma professora está buscando uma forma diferente de cronometrar seus intervalos. Crie um timer ou cronômetro",
    image_url: "/img/keyboard-icon.png",
    difficulty: 1,
    status: "soon",
    duration_in_minutes: "3h30",
    enrolled_users_count: 8,
    tags: [{ id: "1", name: "React", color: "#ff8052" }],
  },
];

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  return json({ slug: params.slug, track: await getTrack(params.slug) });
};

export default function TrackSlug() {
  const loaderData = useLoaderData<typeof loader>();
  const track: Track = loaderData.track;

  useEffect(() => {
    console.log(track);
  }, [track]);

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
        {workshops.map((workshop) => (
          <>
            <WorkshopCard key={workshop?.id} workshop={workshop} />
            <div className="w-[1.5px] h-24 dark:bg-slate-600 bg-slate-200 mb-2" />
          </>
        ))}

        {miniProjects.map((challenge) => (
          <>
            <ChallengeCard key={challenge?.id} challenge={challenge} />
            <div className="w-[1.5px] h-24 dark:bg-slate-600 bg-slate-200 my-2" />
          </>
        ))}
      </div>
    </section>
  );
}
