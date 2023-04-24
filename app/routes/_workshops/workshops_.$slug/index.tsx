import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import CardItemDuration from "~/components/cards/card-item-duration";
import TitleIcon from "~/components/title-icon";
import type { Workshop } from "~/models/workshop.server";
import { getWorkshop } from "~/models/workshop.server";
import { AiFillPlayCircle } from "react-icons/ai";
import type { Lesson } from "~/models/lesson.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  return json({ slug: params.slug, workshop: await getWorkshop(params.slug) });
};

export default function WorkshopSlug() {
  const loaderData = useLoaderData<typeof loader>();
  const workshop: Workshop = loaderData.workshop;

  return (
    <section className="container mx-auto mt-16 mb-16">
      {/* Header */}
      <header className="flex items-center gap-6 mb-8">
        <TitleIcon className="" />
        <div>
          <span className="text-2xl font-extralight">Workshop</span>
          <h1 className="text-5xl font-bold font-lexend">{workshop.name}</h1>
        </div>
      </header>
      {/* layout */}
      <div className="flex gap-14">
        {/* left Side */}
        <div className="w-full">
          <div className="inline-flex gap-10 px-8 py-4 mb-12 bg-gray-dark rounded-xl">
            <CardItemDifficulty difficulty={2} />
            <CardItemDuration durationString="2h50min" />
          </div>
          {/* Difficulty Card */}

          {/* Video */}
          {/*  */}
          <div className="mb-10">
            <div className="relative mb-12 ">
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
        <div className="w-3/5">
          {/* Instrutor */}

          <div>
            <div className="flex items-center">
              <TitleIcon className="inline-block w-3 h-3 mr-2" />
              <h3 className="inline-block mt-0 text-lg font-light">
                Seu <span className="font-bold">Instrutor</span>
              </h3>
            </div>
            <div className="flex items-center mt-3 mb-4">
              <img
                src="/img/icaro.jpg"
                alt=""
                className="w-12 h-12 mr-4 border-2 border-gray-600 rounded-full"
              />
              <div>
                <h4 className="text-slate-200 text-lexend">
                  {workshop?.instructor?.name}
                </h4>
                <p className="text-sm font-light text-slate-400">
                  {workshop.instructor.company}
                </p>
              </div>
            </div>
            <p className="text-sm font-light text-slate-300 line-clamp-3">
              {workshop.instructor.bio}
            </p>
          </div>
          {/* Aulas */}
          <div className="mt-12">
            <div>
              <span className="block -mb-1 text-xs text-slate-500">
                Vídeos de:
              </span>
              <h3 className="mt-0 text-lg font-bold">{workshop.name}</h3>
              <span className="block mt-2 text-sm font-light text-slate-400">
                9 aulas - 3:08:10
              </span>
            </div>
            <ul className="mt-4">
              {workshop.lessons.map((lesson: Lesson, id: number) => (
                <li
                  className="flex items-center justify-between gap-3 px-2 py-3 cursor-pointer hover:bg-slate-800"
                  key={lesson.id}
                >
                  <span className="mr-3 text-sm text-slate-500">{id + 1}</span>
                  <h4 className="flex-1 inline-block font-light text-slate-200">
                    {lesson.name}
                  </h4>
                  <span className="text-sm text-slate-500">22:04</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Subtitle({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <TitleIcon className="w-5 h-5"></TitleIcon>
      <h3 className="text-2xl text-slate-200">{text}</h3>
    </div>
  );
}
