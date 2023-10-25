import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useOutletContext,
  useRouteError,
} from "@remix-run/react";
import { FaCrown } from "react-icons/fa";
import { BsDiscord, BsFillPersonFill } from "react-icons/bs";
import AppLayout from "~/components/_layouts/root-layout";
import BackgroundBlur from "~/components/background-blur";
import ChallengeCard from "~/components/cards/challenge-card";
import PriceCard from "~/components/cards/pricing/price-card";
import { freePlan, proPlan } from "~/components/cards/pricing/pricingData";
import WorkshopCard from "~/components/cards/workshop-card";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";
import TitleIcon from "~/components/title-icon";
import VimeoPlayer from "~/components/vimeo-player";
import Wave from "~/components/wave";
import type { ChallengeCard as ChallengeCardType } from "~/models/challenge.server";
import { getHome } from "~/models/home.server";
import type { User } from "~/models/user.server";

export const loader = async () => {
  return json({
    homeInfo: await getHome(),
  });
};

export default function HomePage() {
  const { user } = useOutletContext<{ user: User }>();
  const { homeInfo } = useLoaderData<typeof loader>();

  function sortByEnrolledUsersCount(challengesList: ChallengeCardType[]) {
    if (!challengesList) return [];
    return challengesList.sort(
      (a, b) => b.enrolled_users_count - a.enrolled_users_count
    );
  }

  const orderedChallengeList = sortByEnrolledUsersCount(
    homeInfo.featured_challenges
  );

  return (
    <AppLayout user={user}>
      <div className="flex flex-col items-center justify-center text-gray-900 dark:text-gray-50">
        <BackgroundBlur />

        <section
          id="headline"
          className="flex justify-center w-full md:min-h-screen"
        >
          <div className="container flex flex-col items-center">
            <h1 className="text-3xl font-light text-center md:mt-16 font-lexend md:text-5xl">
              Evolua na programação{" "}
              <span className="pr-4 font-bold text-transparent animate-bg bg-gradient-to-r dark:from-blue-200 dark:to-blue-500 from-blue-500 via-indigo-500 to-blue-900 bg-clip-text">
                front-end
              </span>
            </h1>
            <p className="mt-6 font-light text-center lg:mt-16 font-inter text-md md:text-xl lg:w-7/12">
              Fuja dos mesmos cursos e tutoriais de sempre e aprimore suas{" "}
              <span className="italic">skills</span> em programação com{" "}
              <span className="italic font-bold">workshops</span> e{" "}
              <span className="italic font-bold">mini projetos</span> ensinados
              pelos melhores profissionais do mercado!
            </p>

            <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:justify-around md:flex-row">
              <>
                {user ? (
                  <Link to="/assine">
                    <button className="flex items-center px-4 py-2 text-gray-800 rounded-full bg-gradient-to-r animate-bg from-amber-100 via-amber-200 to-amber-400">
                      <FaCrown className="mr-2 text-amber-400" /> Seja PRO
                    </button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button className="flex items-center px-4 py-2 text-gray-700 rounded-full bg-background-200">
                      <BsFillPersonFill className="mr-2" color="#5282FF" />{" "}
                      Cadastre-se
                    </button>
                  </Link>
                )}
                <a
                  href="https://discord.gg/fmVw468ZMR"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-full animate-bg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                >
                  <BsDiscord />
                  Entre na comunidade
                </a>
              </>
            </div>
            <div className="relative flex-1 w-full max-w-4xl mt-4 lg:mt-10">
              <VimeoPlayer vimeoUrl="https://player.vimeo.com/video/827298711" />
            </div>
          </div>
        </section>

        <section
          id="workshops"
          className="flex justify-center w-full mb-16 text-gray-800 bg-transparent dark:text-gray-50"
        >
          <div className="container mb-10">
            <h1 className="flex items-center mt-8 mb-4 text-3xl font-light sm:mt-16 font-lexend">
              <TitleIcon className="hidden w-4 h-4 mr-2 md:inline-block" />{" "}
              Workshops
            </h1>
            <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-start">
              Aprenda de forma prática e objetiva com{" "}
              <span className="italic font-bold">workshops</span> ensinados por
              profissionais do mercado. Os workshops são gravados ao vivo e
              posteriormente editados e disponibilizados na plataforma.
            </p>
            <section className="grid justify-center grid-cols-1 gap-4 px-0 lg:grid-cols-2">
              {homeInfo?.featured_workshops?.map((workshop) => (
                <WorkshopCard key={workshop.id} workshop={workshop} />
              ))}
            </section>
            <section className="flex justify-center w-full mt-10">
              <Link
                to="/workshops"
                className="px-4 py-2 rounded-full bg-background-100 dark:bg-background-700"
              >
                Ver todos
              </Link>
            </section>
          </div>
        </section>
        <Wave position="top" />
        <section
          id="mini-projects"
          className="flex justify-center w-full text-gray-800 dark:bg-background-700 bg-background-100 dark:text-gray-50"
        >
          <div className="container relative -top-12">
            <h1 className="flex items-center mt-16 mb-4 text-3xl font-light font-lexend">
              <TitleIcon className="hidden w-4 h-4 mr-2 md:inline-block" /> Mini
              projetos
            </h1>
            <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-start">
              O melhor jeito de aprender é praticando! Melhore suas skills
              fazendo <span className="italic font-bold">mini projetos</span> e
              depois assista a resolução feita por profissionais do mercado.
            </p>
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {orderedChallengeList.map((challenge) => (
                <div key={challenge.slug} className="mx-auto">
                  <ChallengeCard loggedUser={user} challenge={challenge} />
                </div>
              ))}
            </section>
            <section className="flex justify-center w-full mt-10">
              <Link
                to="/mini-projetos"
                className="px-4 py-2 bg-white rounded-full dark:bg-background-800"
              >
                Ver todos
              </Link>
            </section>
          </div>
        </section>
        {/* <Wave position="bottom" />
        <section
          id="tracks"
          className="flex justify-center w-full text-gray-800 bg-transparent dark:text-gray-50"
        >
          <div className="container relative mb-6 top-4">
            <h1 className="flex items-center mb-4 text-3xl font-light font-lexend">
              <TitleIcon className="hidden w-4 h-4 mr-2 md:inline-block" />{" "}
              Trilhas
            </h1>
            <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-start">
              Obtenha a experiência de aprendizado completa unindo{" "}
              <span className="italic font-bold">workshops</span> e{" "}
              <span className="italic font-bold">mini projetos</span> para
              aprender temas específicos em programação.
            </p>
            <section className="grid grid-cols-1 gap-4 mt-4 mb-6">
              {homeInfo?.featured_tracks?.map((track) => (
                <TrackCard key={track.id} track={track} />
              ))}
            </section>
            <section className="flex justify-center w-full mt-2 mb-12">
              <Link
                to="/trilhas"
                className="px-4 py-2 rounded-full bg-background-50 dark:bg-background-700 "
              >
                Ver todas
              </Link>
            </section>
          </div>
        </section> */}

        <section
          id="pricing"
          className="flex justify-center w-full -mb-10 text-center text-gray-800 bg-white dark:bg-background-900 dark:text-gray-50"
        >
          <div className="container flex flex-col items-center">
            <h1 className="mt-16 text-3xl font-light font-lexend">
              Seja{" "}
              <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-400">
                PRO
              </span>
            </h1>
            <p className="mt-6 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-4xl">
              No Codante sempre teremos muito conteúdo gratuito. Para uma
              experiência completa, assine nosso{" "}
              <span className="text-brand-400">
                plano vitalício com valor promocional de lançamento
              </span>{" "}
              <span className="font-bold underline text-brand-400">
                por tempo limitado
              </span>
              . Sem assinaturas. Pague apenas uma vez, acesse para sempre.
            </p>
            <section className="flex flex-col-reverse justify-center gap-20 mt-10 mb-20 lg:flex-row text-start">
              <PriceCard
                featuresByCategory={freePlan}
                data={{
                  name: "Gratuito",
                  price: 0,
                  installments: 0,
                }}
              />
              <PriceCard
                data={{
                  name: "PRO (Vitalício)",
                  fullPrice: 948,
                  banner: "Oferta de lançamento",
                  immediateSettlementAmount: 588,
                  price: 49,
                  installments: 12,
                }}
                featuresByCategory={proPlan}
              />
            </section>
          </div>
        </section>
      </div>
    </AppLayout>
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

  return <Error500 error={error} />;
}
