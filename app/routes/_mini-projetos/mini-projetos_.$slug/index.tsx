import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BsFillPlayFill } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import invariant from "tiny-invariant";
import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import RepositoryCard from "~/components/cards/repository-card";
import { useColorMode } from "~/contexts/color-mode-context";
import { getChallenge } from "~/models/challenge.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  return json({
    slug: params.slug,
    challenge: await getChallenge(params.slug),
  });
};

export default function WorkshopSlug() {
  const { slug, challenge } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  return (
    <div className="dark:text-white text-gray-900 flex flex-col items-center justify-center">
      <section
        id="title"
        className="w-full bg-transparent flex flex-col items-center text-gray-800 dark:text-white mb-16"
      >
        <div className="container mt-16 mb-10">
          <h1 className="flex items-center font-lexend font-light text-3xl">
            <MdKeyboardDoubleArrowRight
              size={24}
              className="text-blue-300 dark:text-blue-900 mr-2"
            />{" "}
            <span className="font-extralight mr-2">Projeto</span>{" "}
            <span className="font-bold decoration-solid underline">
              {challenge.name}
            </span>
          </h1>
          <p className="font-inter text-md md:text-xl font-light mt-2 mb-4 text-start">
            {challenge.short_description}
          </p>
          <CardItemDifficulty difficulty={2} className="mb-2" />
        </div>
        <div className="container grid grid-cols-12 mt-10 gap-8">
          <div className="col-span-12 lg:col-span-9">
            <h1 className="flex items-center font-lexend font-semibold text-2xl">
              Vídeo de introdução
            </h1>
            <div className="w-full h-[210px] sm:w-[600px] sm:h-[336px] md:w-[728px] md:h-[409px] bg-black flex items-center justify-center rounded-lg mt-4 mb-8">
              <button className="flex items-center justify-center rounded-full h-12 w-12 bg-slate-100 text-gray-700">
                <BsFillPlayFill size={24} color="#5282FF" />
              </button>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <h1 className="flex items-center font-lexend font-semibold text-2xl mt-8 mb-4">
                Descrição
              </h1>
              <p className="font-inter text-md md:text-xl font-light mt-2 mb-4 text-start ">
                {challenge?.description}
              </p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-3">
            <h1 className="flex items-center font-lexend font-semibold text-2xl mb-4">
              Repositório
            </h1>
            <RepositoryCard
              repository={{
                organization: "codante-io",
                name: "countdown-timer",
                stars: 36,
                forks: 231,
              }}
            />
            <h1 className="flex items-center font-lexend font-semibold text-2xl mt-8 mb-4">
              Resolução
            </h1>
            <div className="w-full h-[180px] bg-black flex items-center justify-center rounded-lg mt-4 mb-20">
              <button className="flex items-center justify-center rounded-full h-8 w-8 bg-slate-100 text-gray-700">
                <BsFillPlayFill size={16} color="#5282FF" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {colorMode && (
        <img
          src={`/img/wave-top-${colorMode}.svg`}
          className="w-full relative"
          alt="Wave detail"
        />
      )}
      <section
        id="mini-projects"
        className="w-full dark:bg-slate-800 bg-slate-100 text-gray-800 dark:text-white flex justify-center"
      >
        <div className="container -top-12  relative">
          <h1 className="flex justify-center text-center font-lexend font-light mt-16 text-3xl">
            Junte-se a outras{" "}
            <span className="font-bold mx-2"> 36 pessoas </span> que estão
            fazendo esse mini projeto.
          </h1>
        </div>
      </section>
    </div>
  );
}
