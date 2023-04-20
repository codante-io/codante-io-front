import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BsFillPlayFill } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import invariant from "tiny-invariant";

import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import JoinChallengeSection from "~/components/join-challenge-section";
import ParticipantsSection from "~/components/participants-section";

import RepositoryInfoSection from "~/components/repository-info-section";
import { useColorMode } from "~/contexts/color-mode-context";
import { getChallenge } from "~/models/challenge.server";
import { user } from "~/services/auth.server";

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);

  return json({
    user: await user({ request }),
    slug: params.slug,
    challenge: await getChallenge(params.slug),
  });
};

export default function WorkshopSlug() {
  const { challenge, user } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  return (
    <div className="dark:text-white text-gray-900 flex flex-col items-center justify-center">
      <section
        id="title"
        className="w-full bg-transparent flex flex-col items-center text-gray-800 dark:text-white mb-16"
      >
        <div className="container mt-16 mb-10">
          <CardItemDifficulty difficulty={2} className="mb-2" />

          <h1 className="flex items-center font-lexend font-light text-3xl">
            <span>
              <MdKeyboardDoubleArrowRight
                size={24}
                className="text-blue-300 dark:text-blue-900 mr-2 inline"
              />
              <span className="font-extralight">Projeto</span>{" "}
              <span className="font-bold decoration-solid underline">
                {challenge.name}
              </span>
            </span>
          </h1>
          <p className="font-inter text-md md:text-xl font-light mt-2 mb-4 text-start">
            {challenge.short_description}
          </p>
        </div>
        <div className="container grid grid-cols-12 mt-10 gap-10">
          <div className="col-span-12 lg:col-span-8 space-y-20">
            <div>
              <h1 className="flex items-center font-lexend font-semibold text-2xl">
                Vídeo de introdução
              </h1>
              <div className="w-full h-[310px] sm:h-[436px] md:h-[510px] bg-black flex items-center justify-center rounded-lg mt-4 mb-8">
                <button className="flex items-center justify-center rounded-full h-12 w-12 bg-slate-100 text-gray-700">
                  <BsFillPlayFill size={24} color="#5282FF" />
                </button>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <h1 className="flex items-center font-lexend font-semibold text-2xl mb-4">
                Descrição
              </h1>
              <p className="font-inter text-md md:text-xl font-light mt-2 mb-4 text-start ">
                {challenge?.description}
              </p>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 space-y-20">
            <div>
              <h1 className="flex items-center font-lexend font-semibold text-2xl mb-4">
                Participar
              </h1>
              <JoinChallengeSection user={user} />
            </div>

            <div>
              <h1 className="flex items-center font-lexend font-semibold text-2xl mb-4">
                Repositório
              </h1>
              <RepositoryInfoSection
                repository={{
                  organization: "codante-io",
                  name: "countdown-timer",
                  stars: 36,
                  forks: 231,
                }}
              />
            </div>
            <div>
              <h1 className="flex items-center font-lexend font-semibold text-2xl mb-4">
                Resolução
              </h1>
              <div className="w-full h-[180px] bg-black flex items-center justify-center rounded-lg mt-4 mb-20">
                <button className="flex items-center justify-center rounded-full h-8 w-8 bg-slate-100 text-gray-700">
                  <BsFillPlayFill size={16} color="#5282FF" />
                </button>
              </div>
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
          <h1 className="flex justify-center text-center font-lexend font-light mt-24 text-2xl">
            <span>
              Junte-se a outras{" "}
              <span className="font-bold mx-2"> 36 pessoas </span> que estão
              fazendo esse mini projeto.
            </span>
          </h1>
          <ParticipantsSection />
        </div>
      </section>
    </div>
  );
}
