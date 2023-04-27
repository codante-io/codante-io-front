import { BsFillPlayFill, BsFillPersonFill } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

import { json } from "@remix-run/node";
import { getHome } from "~/models/home.server";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useOutletContext,
  useRouteError,
} from "@remix-run/react";
import WorkshopCard from "~/components/cards/workshop-card";
import ChallengeCard from "~/components/cards/challenge-card";
import { useColorMode } from "~/contexts/color-mode-context";
import PriceCard from "~/components/cards/price-card";
import TrackCard from "~/components/cards/track-card";
import BackgroundBlur from "~/components/background-blur";
import type { User } from "~/models/user.server";
import NotFound from "~/components/errors/not-found";
import { Error500 } from "~/components/errors/500";

export const loader = async () => {
  return json({
    homeInfo: await getHome(),
  });
};

export default function Index() {
  const ctx = useOutletContext<{ user: User }>();
  const user = ctx?.user;

  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  return (
    <div className="flex flex-col items-center justify-center text-gray-900 dark:text-white">
      <BackgroundBlur />

      <section
        id="headline"
        className="flex justify-center w-full min-h-screen"
      >
        <div className="container flex flex-col items-center">
          <h1 className="mt-16 text-3xl font-light text-center font-lexend md:text-5xl">
            Evolua na{" "}
            <span className="pr-4 font-bold text-transparent animate-text bg-gradient-to-r dark:from-blue-200 dark:to-blue-500 from-blue-500 via-indigo-500 to-blue-900 bg-clip-text">
              programação
            </span>
          </h1>
          <p className="mt-16 font-light text-center font-inter text-md md:text-xl lg:w-7/12">
            Fuja dos tutoriais e aprimore suas{" "}
            <span className="italic">skills</span> em programação com{" "}
            <span className="italic font-bold">workshops</span> e{" "}
            <span className="italic font-bold">mini projetos</span> ensinados
            por profissionais do mercado.
          </p>

          <div className="flex flex-col justify-around gap-4 mt-10 lg:flex-row">
            {!user && (
              <>
                <button className="px-4 py-2 text-white bg-gray-700 rounded-full">
                  Saiba mais
                </button>
                <Link to="/login">
                  <button className="flex items-center px-4 py-2 text-gray-700 rounded-full bg-slate-200">
                    <BsFillPersonFill className="mr-2" color="#5282FF" />{" "}
                    Cadastre-se
                  </button>
                </Link>
              </>
            )}
          </div>
          <div className="w-[320px] h-[180px] sm:w-[600px] sm:h-[336px] md:w-[728px] md:h-[409px] lg:w-[800px] lg:h-[450px] bg-black flex items-center justify-center rounded-lg mt-10 mb-20">
            <button className="flex items-center justify-center w-12 h-12 text-gray-700 rounded-full bg-slate-100">
              <BsFillPlayFill size={24} color="#5282FF" />
            </button>
          </div>
        </div>
      </section>
      <section
        id="workshops"
        className="flex justify-center w-full mb-16 text-gray-800 bg-transparent dark:text-white"
      >
        <div className="container mb-10">
          <h1 className="flex items-center mt-16 text-3xl font-light font-lexend">
            <MdKeyboardDoubleArrowRight
              size={24}
              className="mr-2 text-blue-300 dark:text-blue-900"
            />{" "}
            Workshops
          </h1>
          <p className="mt-2 mb-4 font-light font-inter text-md md:text-xl text-start">
            Aprenda de forma prática e objetiva com{" "}
            <span className="italic font-bold">workshops</span> ensinados por
            profissionais do mercado.
          </p>
          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {homeInfo?.featured_workshops?.slice(0, 2).map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </section>
          <section className="flex justify-center w-full mt-10">
            <Link
              to="/workshops"
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-gray-dark "
            >
              Ver todos
            </Link>
          </section>
        </div>
      </section>
      {colorMode && (
        <img
          src={`/img/wave-top-${colorMode}.svg`}
          className="relative w-full"
          alt="Wave detail"
        />
      )}
      <section
        id="mini-projects"
        className="flex justify-center w-full text-gray-800 dark:bg-slate-800 bg-slate-100 dark:text-white"
      >
        <div className="container relative -top-12">
          <h1 className="flex items-center mt-16 text-3xl font-light font-lexend">
            <MdKeyboardDoubleArrowRight
              size={24}
              className="mr-2 text-blue-300 dark:text-blue-900"
            />{" "}
            Mini projetos
          </h1>
          <p className="mt-2 mb-4 font-light font-inter text-md md:text-xl text-start">
            O melhor jeito de aprender é praticando! Melhore suas skills fazendo{" "}
            <span className="italic font-bold">mini projetos</span> e depois
            assista a resolução feita por profissionais do mercado.
          </p>
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {homeInfo?.featured_challenges?.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </section>
          <section className="flex justify-center w-full mt-10">
            <Link
              to="/mini-projetos"
              className="px-4 py-2 bg-white rounded-full dark:bg-gray-dark"
            >
              Ver todos
            </Link>
          </section>
        </div>
      </section>
      {colorMode && (
        <img
          src={`/img/wave-bottom-${colorMode}.svg`}
          className="relative w-full -top-42"
          alt="Wave detail"
        />
      )}
      <section
        id="tracks"
        className="flex justify-center w-full text-gray-800 bg-transparent dark:text-white"
      >
        <div className="container relative mb-6 top-4">
          <h1 className="flex items-center text-3xl font-light font-lexend">
            <MdKeyboardDoubleArrowRight
              size={24}
              className="mr-2 text-blue-300 dark:text-blue-900"
            />{" "}
            Trilhas
          </h1>
          <p className="mt-2 font-light font-inter text-md md:text-xl text-start">
            Obtenha a experiência de aprendizado completa unindo{" "}
            <span className="italic font-bold">workshops</span> e{" "}
            <span className="italic font-bold">mini projetos</span> para
            aprender temas específicos em programação.
          </p>
          <section className="grid grid-cols-1 gap-4 mt-16 mb-6">
            {homeInfo?.featured_tracks?.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}
          </section>
          <section className="flex justify-center w-full mt-2 mb-12">
            <Link
              to="/trilhas"
              className="px-4 py-2 rounded-full bg-slate-100 dark:bg-gray-dark "
            >
              Ver todas
            </Link>
          </section>
        </div>
      </section>

      <section
        id="pricing"
        className="flex justify-center w-full -mb-10 text-center text-gray-800 bg-white dark:bg-gray-darkest dark:text-white"
      >
        <div className="container flex flex-col items-center">
          <h1 className="mt-16 text-3xl font-light font-lexend">Preços</h1>
          <p className="mt-2 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-7xl">
            Temos o compromisso de oferecer muito conteúdo{" "}
            <span className="italic font-bold">gratuito</span> e de{" "}
            <span className="italic font-bold">qualidade</span>. <br />{" "}
            Considere se tornar um membro Premium para apoiar o projeto e ter
            acesso a mais conteúdos exclusivos.
          </p>
          <section className="flex flex-col justify-center gap-20 mt-10 mb-20 md:flex-row">
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return <Error500 />;
}
