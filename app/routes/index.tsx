import { BsFillPlayFill, BsFillPersonFill } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { json } from "@remix-run/node";
import { getHome } from "~/models/home.server";
import { useLoaderData } from "@remix-run/react";
import WorkshopCard from "~/components/cards/workshop-card";
import ChallengeCard from "~/components/cards/challenge-card";
import { useColorMode } from "~/contexts/color-mode-context";
import PriceCard from "~/components/cards/price-card";
import TrackCard from "~/components/cards/track-card";

export const loader = async () => {
  return json({
    homeInfo: await getHome(),
  });
};

export default function Index() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  return (
    <div className="dark:text-white text-gray-900 flex flex-col items-center justify-center">
      <section
        id="headline"
        className="w-full min-h-screen flex justify-center"
      >
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-slate-600 dark:from-blue-900 dark:to-blue-500  opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-500 to-slate-600 dark:from-blue-900 dark:to-blue-500 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="container flex flex-col items-center">
          <h1 className="font-lexend font-light mt-16 text-3xl md:text-5xl text-center">
            Evolua na{" "}
            <span className=" pr-4 font-bold animate-text bg-gradient-to-r dark:from-blue-200 dark:to-blue-500 from-blue-500 via-indigo-500 to-blue-900 bg-clip-text text-transparent">
              programação
            </span>
          </h1>
          <p className="font-inter text-md md:text-xl font-light mt-16 text-center lg:w-7/12">
            Fuja dos tutoriais e aprimore suas{" "}
            <span className="italic">skills</span> em programação com{" "}
            <span className="font-bold italic">workshops</span> e{" "}
            <span className="font-bold italic">mini projetos</span> ensinados
            por profissionais do mercado.
          </p>

          <div className="flex flex-col lg:flex-row mt-10 gap-4 justify-around">
            <button className="rounded-full py-2 px-4 bg-gray-700 text-white">
              Saiba mais
            </button>
            <button className="flex items-center rounded-full py-2 px-4 bg-slate-200 text-gray-700">
              <BsFillPersonFill className="mr-2" color="#5282FF" /> Cadastre-se
            </button>
          </div>
          <div className="w-[320px] h-[180px] sm:w-[600px] sm:h-[336px] md:w-[728px] md:h-[409px] lg:w-[800px] lg:h-[450px] bg-black flex items-center justify-center rounded-lg mt-10 mb-20">
            <button className="flex items-center justify-center rounded-full h-12 w-12 bg-slate-100 text-gray-700">
              <BsFillPlayFill size={24} color="#5282FF" />
            </button>
          </div>
        </div>
      </section>
      <section
        id="workshops"
        className="w-full bg-transparent flex justify-center text-gray-800 dark:text-white mb-16"
      >
        <div className="container mb-10">
          <h1 className="flex items-center font-lexend font-light mt-16 text-3xl">
            <MdKeyboardDoubleArrowRight
              size={24}
              className="text-blue-300 dark:text-blue-900 mr-2"
            />{" "}
            Workshops
          </h1>
          <p className="font-inter text-md md:text-xl font-light mt-2 mb-4 text-start">
            Aprenda de forma prática e objetiva com{" "}
            <span className="font-bold italic">workshops</span> ensinados por
            profissionais do mercado.
          </p>
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {homeInfo?.featured_workshops?.slice(0, 2).map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </section>
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
          <h1 className="flex items-center font-lexend font-light mt-16 text-3xl">
            <MdKeyboardDoubleArrowRight
              size={24}
              className="text-blue-300 dark:text-blue-900 mr-2"
            />{" "}
            Mini projetos
          </h1>
          <p className="font-inter text-md md:text-xl font-light mt-2 mb-4 text-start">
            O melhor jeito de aprender é praticando! Melhore suas skills fazendo{" "}
            <span className="font-bold italic">mini projetos</span> e depois
            assista a resolução feita por profissionais do mercado.
          </p>
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {homeInfo?.featured_challenges?.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </section>
        </div>
      </section>
      {colorMode && (
        <img
          src={`/img/wave-bottom-${colorMode}.svg`}
          className="w-full -top-42 relative"
          alt="Wave detail"
        />
      )}
      <section
        id="tracks"
        className="w-full bg-transparent flex justify-center text-gray-800 dark:text-white"
      >
        <div className="container relative top-4">
          <h1 className="flex items-center font-lexend font-light text-3xl">
            <MdKeyboardDoubleArrowRight
              size={24}
              className="text-blue-300 dark:text-blue-900 mr-2"
            />{" "}
            Trilhas
          </h1>
          <p className="font-inter text-md md:text-xl font-light mt-2 mb-4 text-start">
            Obtenha a experiência de aprendizado completa unindo{" "}
            <span className="font-bold italic">workshops</span> e{" "}
            <span className="font-bold italic">mini projetos</span> para
            aprender temas específicos em programação.
          </p>
          <section className="grid grid-cols-1 gap-4">
            {homeInfo?.featured_tracks?.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </section>
        </div>
      </section>

      <section
        id="pricing"
        className="w-full dark:bg-gray-darkest bg-white flex justify-center text-gray-800 dark:text-white text-center"
      >
        <div className="container flex items-center flex-col">
          <h1 className="font-lexend font-light mt-16 text-3xl">Preços</h1>
          <p className="font-inter text-md md:text-xl font-light mt-2 mb-4 text-center lg:max-w-7xl">
            Temos o compromisso de oferecer muito conteúdo{" "}
            <span className="font-bold italic">gratuito</span> e de{" "}
            <span className="font-bold italic">qualidade</span>. <br />{" "}
            Considere se tornar um membro Premium para apoiar o projeto e ter
            acesso a mais conteúdos exclusivos.
          </p>
          <section className="flex flex-col md:flex-row justify-center mt-10 gap-20 mb-20">
            <PriceCard
              price={{
                name: "Gratuito",
                price: 0,
                features: {
                  Comunidade: true,
                  "Mini projetos": true,
                  "Workshops gratuitos": true,
                  "Area vip da comunidade": false,
                  "Workshops premium": false,
                  "Resoluçoes dos mini projetos": false,
                },
              }}
            />
            <PriceCard
              price={{
                name: "Premium",
                banner: "Gratuito por tempo limitado",
                price: 0,
                features: {
                  Comunidade: true,
                  "Mini projetos": true,
                  "Workshops gratuitos": true,
                  "Area vip da comunidade": true,
                  "Workshops premium": true,
                  "Resoluçoes dos mini projetos": true,
                },
              }}
            />
          </section>
        </div>
      </section>
    </div>
  );
}
