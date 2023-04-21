import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import CardItemDuration from "~/components/cards/card-item-duration";
import TitleIcon from "~/components/title-icon";
import { getWorkshop } from "~/models/workshop.server";
import { AiFillPlayCircle } from "react-icons/ai";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  return json({ slug: params.slug, workshop: await getWorkshop(params.slug) });
};

export default function WorkshopSlug() {
  const { workshop } = useLoaderData<typeof loader>();

  return (
    <section className="container mx-auto mt-16 mb-16">
      {/* Header */}
      <header className="flex items-center gap-6 mb-8">
        <TitleIcon className="" />
        <div>
          <span className="font-extralight text-2xl">Workshop</span>
          <h1 className="font-lexend font-bold text-5xl">{workshop.name}</h1>
        </div>
      </header>
      {/* layout */}
      <div className="flex gap-10">
        {/* left Side */}
        <div className="w-full">
          <div className="px-8 py-4 bg-gray-dark rounded-xl gap-10 inline-flex mb-12">
            <CardItemDifficulty difficulty={2} />
            <CardItemDuration durationString="2h50min" />
          </div>
          {/* Difficulty Card */}

          {/* Video */}
          {/*  */}
          <div className="mb-10">
            <div className="mb-12 relative ">
              <AiFillPlayCircle className="absolute opacity-1 top-[35%] left-[40%]  h-40 w-40" />
              <img
                src="https://loremflickr.com/1920/1080?lock=1"
                alt=""
                className="opacity-20"
              />
            </div>
            <Subtitle text="O que é esse Workshop?" />
            <p className="text-slate-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              dolor laborum dolores possimus quam repellendus labore optio totam
              quae fugiat? Illo eveniet eum magni consequatur exercitationem,
              non sapiente velit doloribus.
            </p>
          </div>
          <div className="mb-10">
            <Subtitle text="O que vou aprender?" />
            <p className="text-slate-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              dolor laborum dolores possimus quam repellendus labore optio totam
              quae fugiat? Illo eveniet eum magni consequatur exercitationem,
              non sapiente velit doloribus.
            </p>
          </div>
          <div className="mb-10">
            <Subtitle text="Pré requisitos" />
            <p className="text-slate-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              dolor laborum dolores possimus quam repellendus labore optio totam
              quae fugiat? Illo eveniet eum magni consequatur exercitationem,
              non sapiente velit doloribus.
            </p>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-2/5">
          {/* Instrutor */}
          <h3>Seu Instrutor</h3>
          {/* Aulas */}
          <div>Aulas</div>
        </div>
      </div>
    </section>
  );
}

function Subtitle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <TitleIcon className="h-5 w-5"></TitleIcon>
      <h3 className="text-2xl text-slate-200">{text}</h3>
    </div>
  );
}
