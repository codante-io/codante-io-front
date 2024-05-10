import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import BackgroundBlur from "~/components/_layouts/background-blur";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import PriceCard from "~/components/ui/cards/pricing/price-card";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import { getHome } from "~/lib/models/home.server";
import {
  freePlanDetails,
  freePlanFeatures,
  proPlanDetails,
  proPlanFeatures,
} from "~/components/ui/cards/pricing/pricing-data";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import UserAvatar from "~/components/ui/user-avatar";
import { useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import SubmissionCard from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/components/submission-card";
import { ProgressivePractice } from "~/routes/_layout-raw/vendas-unlisted/progressive-practice";
import { BoldColored } from "~/routes/_layout-raw/vendas-unlisted/bold-colored-text";
import { PlayCircle } from "lucide-react";

export const loader = async () => {
  return json({
    homeInfo: await getHome(),
  });
};

export default function HomePage() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center text-gray-900 dark:text-gray-50">
        <BackgroundBlur />
        <Headline />
        <Submissions />
        <PraticaProgressiva />
        <WorkShops />
        <Challenges />
        <Community />
        <Testimonial />
        <Pricing />
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound error={error} />
      </div>
    );
  }

  return <Error500 error={error} />;
}

function CodanteProButton() {
  return (
    <button className="relative inline-flex items-center justify-center text-2xl px-10 py-4 overflow-hidden font-medium text-gray-200 bg-gray-800 rounded-lg group w-full lg:w-8/12">
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-brand-500 rounded-full group-hover:w-[105%] group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
      <span className="relative">
        Quero ter acesso ao <span className="font-bold">Codante</span>{" "}
        <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-400">
          PRO
        </span>
      </span>
    </button>
  );
}

function Headline() {
  const { colorMode } = useColorMode();

  return (
    <>
      <section
        id="headline"
        className="flex flex-col items-center w-full lg:min-h-[calc(100vh_-_68px)]"
      >
        <div className="container flex flex-col items-center gap-2 mt-6">
          <nav>
            <img className="w-auto h-16" src="/cdnt.svg" alt="Codante" />
          </nav>
          <h1 className="text-4xl font-light text-center mt-12 font-lexend md:text-6xl">
            Aprenda front-end <br />
            <span className="relative pr-4 px-6 font-bold text-transparent animate-bg bg-gradient-to-r dark:from-blue-200 dark:to-blue-500 from-blue-500 via-indigo-500 to-blue-900 bg-clip-text">
              de verdade
              <img
                src={`/img/pencil-stroke-${colorMode}.webp`}
                alt="Line stroke effect"
                className="absolute top-[55%] md:top-[55%] md:h-10 h-6 left-6 w-full md:left-10 -z-10"
              />
            </span>
          </h1>
          <p className="font-light text-center font-inter text-xl max-w-[670px] mt-12 text-gray-100">
            Entenda porque você se sente{" "}
            <span className="italic">completamente perdido(a)</span> quando está
            estudando programação e descubra o que você pode fazer para aprender
            front-end <span className="italic font-bold">DE VERDADE</span> para{" "}
            <span className="underline italic">
              conquistar os seus objetivos de carreira.
            </span>
          </p>

          <p className="flex gap-2 items-center font-light text-center font-inter text-md max-w-[670px] text-gray-400 mt-10">
            <PlayCircle className="h-5 text-gray-100" />
            Assista a aula
          </p>
        </div>

        <div className="container flex mt-8 gap-8 h-full flex-col items-center">
          <div className="aspect-video overflow-hidden rounded-lg w-full lg:w-8/12">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/1F9HkIky8ps?si=zHhAx50nggQ8_pp5"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <CodanteProButton />

          <div className="flex gap-8 justify-between w-full lg:w-10/12 text-center text-sm lg:text-xl">
            <div className="flex flex-col items-center">
              <motion.img
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0.5, y: -10 },
                }}
                src="img/vendas/vitalicio.webp"
                className="lg:w-24 w-12 lg:h-24 h-12"
                alt="Fundo em gradiente com ícone de ampulheta"
              />
              <h2 className="animate-bg text-transparent bg-gradient-to-r dark:from-gray-300 dark:to-gray-600 bg-clip-text">
                Acesso vitalício
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <motion.img
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.8 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0.5, y: -10 },
                }}
                src="img/vendas/garantia.webp"
                className="lg:w-24 w-12 lg:h-24 h-12"
                alt="Fundo em gradiente com ícone de medalha"
              />
              <h2 className="animate-bg text-transparent bg-gradient-to-r dark:from-gray-300 dark:to-gray-600 bg-clip-text">
                30 dias de garantia
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <motion.img
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.8 * 2 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0.5, y: -10 },
                }}
                src="img/vendas/discord.webp"
                className="lg:w-24 w-12 lg:h-24 h-12"
                alt="Fundo em gradiente com ícone do Discord"
              />
              <h2 className="animate-bg text-transparent bg-gradient-to-r dark:from-gray-300 dark:to-gray-600 bg-clip-text">
                Comunidade no Discord
              </h2>
            </div>
            <div className="flex flex-col items-center">
              <motion.img
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8, delay: 0.8 * 3 }}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0.5, y: -10 },
                }}
                src="img/vendas/pagamento-seguro.webp"
                className="lg:w-24 w-12 lg:h-24 h-12"
                alt="Fundo em gradiente com ícone de escudo"
              />
              <h2 className="animate-bg text-transparent bg-gradient-to-r dark:from-gray-300 dark:to-gray-600 bg-clip-text">
                Pagamento seguro
              </h2>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function PraticaProgressiva() {
  const { colorMode } = useColorMode();

  return (
    <section
      id="pratica-progressiva"
      className="flex justify-center w-full text-gray-800 bg-transparent dark:text-gray-50 top-0"
    >
      <div className="container flex flex-col items-center justify-center border-t border-gray-200 dark:border-gray-800 mb-10 top-0">
        <div className="relative w-full">
          <h1 className="mt-14 mb-8 text-3xl lg:text-4xl font-light font-lexend text-center">
            Aprenda do <span className="font-bold"> jeito certo</span>
          </h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[83px] w-32 lg:w-64 left-1/2 ml-16 lg:ml-24 transform -translate-x-1/2 -z-10"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, scaleZ: 1 },
              hidden: { opacity: 0, scaleZ: 0 },
            }}
            src={`/img/yellow-smoke.svg`}
            alt="Smoke effect"
            className="absolute top-0 w-full left-1/2 transform translate-x-[-50%]"
          />
        </div>

        <section className="mt-12 flex flex-col-reverse lg:flex-row gap-20 lg:gap-10 mb-24 items-center lg:items-start overflow-hidden">
          <div className="lg:h-72 w-full flex justify-center">
            <motion.img
              src={`/img/vendas/glasser-1.webp`}
              alt="Pirâmide de glasser - aprendizagem passiva"
            />
          </div>
          <motion.div
            className="relative rotate-2 max-h-16 max-w-[25rem]"
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            variants={{
              visible: { x: 0, opacity: 1 },
              hidden: { x: 100, opacity: 0 },
            }}
          >
            <div className="absolute top-1 h-full w-full bg-background-600 opacity-30 blur p-[0.5] -z-10" />
            <div className="bg-background-800 p-4 rounded-xl border-background-700 border">
              <p className="font-light font-inter text-sm text-gray-300">
                Quando você está assistindo uma aula ou vendo um curso, você
                está na etapa de{" "}
                <span className="border-b border-amber-400 font-bold">
                  aprendizagem passiva
                </span>
                {". "}
                Você aprende, mas não de forma{" "}
                <span className="italic">profunda</span>.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="mt-16 flex flex-col lg:flex-row gap-20 lg:gap-10 mb-24 items-center lg:items-start overflow-hidden">
          <motion.div
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.6 }}
            variants={{
              visible: { x: 0, opacity: 1 },
              hidden: { x: -100, opacity: 0 },
            }}
            className="relative -rotate-2 max-h-16 max-w-96"
          >
            <div className="absolute top-1 h-full w-full bg-background-600 opacity-30 blur p-[0.5] -z-10" />
            <div className="bg-background-800 p-4 rounded-xl border-background-700 border">
              <p className="font-light font-inter text-sm text-gray-300">
                Quando você está de fato colocando a mão na massa, você está na
                etapa de{" "}
                <span className="border-b border-brand font-bold">
                  aprendizagem ativa
                </span>
                . Aqui o aprendizado é <span className="italic">maior</span>.
              </p>
            </div>
          </motion.div>
          <div className="lg:h-72 w-full flex justify-center">
            <motion.img
              className=""
              src={`/img/vendas/glasser-2.webp`}
              alt="Pirâmide de glasser - aprendizagem ativa"
            />
          </div>
        </section>

        <section className="mt-16 flex flex-col lg:flex-row gap-20 lg:gap-10 mb-24 items-center lg:items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            variants={{
              visible: { y: 0, opacity: 1 },
              hidden: { y: 100, opacity: 0 },
            }}
            className="relative rotate-1 max-h-16 max-w-2xl"
          >
            <div className="absolute top-1 h-full w-full bg-background-600 opacity-30 blur p-[0.5] -z-10" />
            <div className="bg-background-800 p-4 rounded-xl border-background-700 border">
              <p className="font-light font-inter text-sm text-gray-300">
                Muita gente acha que quando está assitindo um curso e
                programando junto com o professor, está praticando de forma{" "}
                <span className="border-b border-brand font-bold">ativa</span>.
                Mas a verdade é que isso ainda é{" "}
                <span className="border-b border-amber-400 font-bold">
                  aprendizado passivo
                </span>
                . Você precisa ir além. Depois de fazer cursos e projetos
                guiados, você tem que continuar se aprofundando na{" "}
                <span className="italic">prática</span>.
              </p>
            </div>
          </motion.div>
        </section>

        <section className="mt-16 w-full flex flex-col items-center overflow-y-visible">
          <h2 className="text-center text-gray-300 lg:text-xl">
            É por isso que o Codante usa a ideia da
          </h2>
          <h1 className="mt-2 mb-8 text-3xl lg:text-5xl font-light font-lexend text-center">
            Prática <span className="font-bold"> progressiva</span>
          </h1>

          <div className="mx-auto flex justify-center relative">
            <motion.img
              animate={{ scale: [0, 1, 1, 1, 0] }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute w-8 top-32 left-10"
              src="img/vendas/sparkle-1.svg"
              alt=""
            />
            <motion.img
              animate={{ scale: [0, 1, 1, 1, 0] }}
              viewport={{ once: true }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 1.3,
                delay: 1.1,
              }}
              className="absolute w-8 top-6 right-12"
              src="img/vendas/sparkle-2.svg"
              alt=""
            />
            <motion.img
              animate={{ scale: [0, 1, 1, 1, 0] }}
              viewport={{ once: true }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                repeatDelay: 2,
                delay: 3.2,
              }}
              className="absolute w-8 top-72 right-20 rotate-[36deg]"
              src="img/vendas/sparkle-1.svg"
              alt=""
            />

            <motion.img
              whileHover={{ scale: 1.05 }}
              className="w-[34rem] mt-20 mb-10"
              src="img/vendas/pratica-progressiva.png"
              alt="Escada da prática progressiva - Base teórica, prática guiada, prática direcionada e mundo real"
            />
          </div>

          <ProgressivePractice />

          <section className="mt-16 flex flex-col lg:flex-row gap-20 lg:gap-10 mb-24 items-center lg:items-start">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              variants={{
                visible: { y: 0, opacity: 1 },
                hidden: { y: 100, opacity: 0 },
              }}
              className="relative rotate-1 max-h-16 max-w-2xl"
            >
              <div className="absolute top-1 h-full w-full bg-background-600 opacity-30 blur p-[0.5] -z-10" />
              <div className="bg-background-800 p-4 rounded-xl border-background-700 border">
                <p className="font-light font-inter text-sm text-gray-300">
                  E o aprendizado continua... depois que você chega no{" "}
                  <BoldColored color="#DDFFC9">mundo real</BoldColored>, você
                  pode voltar para a{" "}
                  <BoldColored color="#FFDCC9">base teórica</BoldColored>
                  . Se for preciso, pode pular degraus ou ficar mais tempo em um
                  mesmo.
                  <br />
                  <br /> O mais importante é entender que aprender não é uma
                  linha reta, mas sim um{" "}
                  <b>
                    <i>
                      <u>ciclo infinito</u>
                    </i>
                  </b>
                  .
                </p>
              </div>
            </motion.div>
          </section>

          <div className="my-16 w-full flex justify-center">
            <CodanteProButton />
          </div>
        </section>
      </div>
    </section>
  );
}

function WorkShops() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  return (
    <section
      id="workshops"
      className="flex justify-center w-full text-gray-800 bg-transparent dark:text-gray-50"
    >
      <div className="container flex flex-col  overflow-hidden items-center justify-center border-t border-gray-200 dark:border-gray-800 mb-10">
        <div className="relative w-full">
          <h2 className="mt-14 text-center font-lexend mb-2 text-gray-300">
            Fortaleça sua base teórica com nossos
          </h2>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0.5, y: -10 },
            }}
            className="mb-8 text-4xl font-light font-lexend text-center"
          >
            Workshops
          </motion.h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[120px] w-64 left-1/2 transform -translate-x-1/2 -z-10"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, scaleZ: 1 },
              hidden: { opacity: 0, scaleZ: 0 },
            }}
            src={`/img/blue-smoke.svg`}
            alt="Smoke effect"
            className="absolute top-0 w-full left-1/2 transform translate-x-[-50%]"
          />
        </div>
        <p className="mt-10 mb-10 font-light text-gray-300 font-inter text-md md:text-xl text-center w-full md:w-3/4">
          Nossos{" "}
          <span className="font-bold border-b border-brand-500">workshops</span>{" "}
          são verdadeiras aulas ministradas por nós e por profissionais
          convidados. Eles são gravados ao vivo e posteriormente editados e
          disponibilizados na plataforma. Tudo feito com muito carinho e{" "}
          <b>foco na qualidade</b>.
          <br />
          <br />
          Assinando o <b>Codante</b>{" "}
          <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-400">
            PRO
          </span>
          , você tem acesso a{" "}
          <b>
            <u>
              <i>todos os nossos workshops</i>
            </u>
          </b>
          . Inclusive os próximos que lançarmos.
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
  );
}

function Challenges() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  function sortByEnrolledUsersCount(challengesList: ChallengeCardType[]) {
    if (!challengesList) return [];
    return challengesList.sort(
      (a, b) => b.enrolled_users_count - a.enrolled_users_count,
    );
  }

  const orderedChallengeList = sortByEnrolledUsersCount(
    homeInfo.featured_challenges,
  );

  return (
    <section id="mini-projects" className="flex justify-center w-full">
      <div className="container flex flex-col items-center w-full border-t border-gray-200 dark:border-gray-800 mt-10">
        <div className="relative w-full">
          <h2 className="mt-14 text-center font-lexend mb-2 text-gray-300">
            Pratique de forma guiada ou direcionada com nossos{" "}
          </h2>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0.5, y: -10 },
            }}
            className="mb-8 text-4xl font-light font-lexend text-center"
          >
            Mini projetos
          </motion.h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[120px] w-64 left-1/2 transform -translate-x-1/2 -z-10"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, scaleZ: 1 },
              hidden: { opacity: 0, scaleZ: 0 },
            }}
            src={`/img/yellow-smoke.svg`}
            alt="Smoke effect"
            className="absolute top-0 w-full left-1/2 transform translate-x-[-50%]"
          />
        </div>

        <p className="mt-10 mb-10 font-light text-gray-300 font-inter text-md md:text-xl text-center w-full md:w-3/4">
          Nossos{" "}
          <span className="font-bold border-b border-amber-500">
            mini projetos
          </span>{" "}
          são projetos completos, contendo uma{" "}
          <b>
            <i>lista de requisitos</i>
          </b>{" "}
          e um{" "}
          <b>
            <i>design no Figma</i>
          </b>
          . Eles são focados em uma tecnologia específica, mas você pode fazer
          da forma como preferir.
          <br />
          <br />
          Você pode fazê-los de{" "}
          <span className="font-bold border-b border-[#EAC9FF]">
            forma guiada
          </span>
          , assistindo nossas resoluções oficiais ou fazê-los de{" "}
          <span className="font-bold border-b border-[#C9E5FF]">
            forma direcionada
          </span>
          , apenas seguindo a lista de requisitos e quebrando a cabeça pra
          chegar em uma solução.
          <br />
          <br />
          As listas de requisitos e Figmas são gratuitos. Assinando o{" "}
          <b>Codante</b>{" "}
          <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-400">
            PRO
          </span>
          , você tem acesso a{" "}
          <b>
            <u>
              <i>todas as nossas resoluções oficiais de projetos</i>
            </u>
          </b>
          . Inclusive as próximas que lançarmos.
        </p>
        <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {orderedChallengeList.map((challenge) => (
            <div key={challenge.slug} className="mx-auto">
              <ChallengeCard challenge={challenge} />
            </div>
          ))}
        </section>
        <section className="flex justify-center w-full mt-10 mb-10">
          <Link
            to="/mini-projetos"
            className="px-4 py-2 bg-white rounded-full dark:bg-background-800"
          >
            Ver todos
          </Link>
        </section>
      </div>
    </section>
  );
}

function Community() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  const avatarSection = homeInfo.avatar_section;

  return (
    <section id="mini-projects" className="flex justify-center w-full">
      <div className="container flex flex-col items-center w-full border-t border-gray-200 dark:border-gray-800 mt-10">
        <div className="relative w-full">
          <h2 className="mt-14 text-center font-lexend mb-2 text-gray-300">
            Continue evoluindo junto com nossa{" "}
          </h2>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0.5, y: -10 },
            }}
            className="mb-8 text-4xl font-light font-lexend text-center"
          >
            Comunidade
          </motion.h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[120px] w-64 left-1/2 transform -translate-x-1/2 -z-10"
          />
          <motion.img
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, scaleZ: 1 },
              hidden: { opacity: 0, scaleZ: 0 },
            }}
            src={`/img/blue-smoke.svg`}
            alt="Smoke effect"
            className="absolute top-0 w-full left-1/2 transform translate-x-[-50%]"
          />
        </div>

        <section className="mt-20 mb-10">
          <h3 className="mb-10 font-light text-gray-300 font-inter text-md md:text-xl text-center ">
            Já somos{" "}
            <b className="rotate-2 inline-block bg-background-700 bold border border-background-600 px-2 rounded-lg">
              {`${avatarSection.user_count} devs`}
            </b>{" "}
            evoluindo nossas habilidades de front-end.
          </h3>
          <div className="flex lg:justify-start justify-center flex-wrap -space-x-3">
            {avatarSection.avatars.map((avatar, index) => (
              <UserAvatar
                key={index}
                avatar={avatar}
                className="xl:w-20 xl:h-20 lg:h-20 lg:w-20 w-16 h-16"
              />
            ))}
          </div>
        </section>

        <p className="mt-10 mb-10 font-light text-gray-300 font-inter text-md md:text-xl text-center w-full md:w-3/4">
          O Codante é composto por uma comunidade de pessoas que estão
          praticando e evoluindo juntas. Você pode se conectar com elas através
          da nossa <b>comunidade no Discord</b>.
          <br />
          <br />
          Além disso, você pode ver quem está participando dos{" "}
          <span className="font-bold border-b border-amber-500">
            projetos
          </span>{" "}
          e acessar as <b>resoluções da comunidade</b> para ver como outras
          pessoas resolveram os desafios.
          <br />
          <br />
          Assinando o <b>Codante</b>{" "}
          <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-400">
            PRO
          </span>
          , você tem acesso a um{" "}
          <b>
            <u>
              <i>canal exclusivo no Discord</i>
            </u>
          </b>{" "}
          com prioridade de atendimento da nossa equipe.
        </p>
        <div className="my-16 w-full flex justify-center">
          <CodanteProButton />
        </div>
      </div>
    </section>
  );
}

function Submissions() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const submissions = homeInfo.featured_submissions;

  return (
    <section
      id="community-submission"
      className="w-full max-w-[1920px] relative mt-16"
    >
      <div className="flex flex-col items-center w-full overflow-hidden scrollbar-hide flex-shrink-0 scroll-auto border-t border-gray-200 dark:border-gray-800 ">
        <h1 className="mt-14 mb-8 text-3xl md:text-4xl font-light font-lexend text-center w-full lg:w-6/12">
          Veja o que a nossa{" "}
          <span className="text-brand-500 font-bold">comunidade</span> está
          construindo com base na{" "}
          <span className="italic">
            técnica da <span className="font-bold">prática progressiva</span>
          </span>
          .
        </h1>
        <p className="mt-2 mb-2 font-light font-inter text-md md:text-xl text-center w-full md:w-3/4 text-gray-300">
          Esses projetos foram feitos por pessoas que estão aprendendo e
          praticando front-end.
        </p>
        <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-center w-full md:w-1/2 text-gray-300">
          Alguns foram feitos de <span className="italic">forma guiada</span>,
          seguindo os nossos tutoriais. Outros foram feitos de{" "}
          <span className="italic">forma direcionada</span>, apenas a partir da
          lista de requisitos e do Figma.
        </p>

        <div className="relative mb-20">
          <section className=" flex gap-4 upper-post-list mb-4">
            {submissions.slice(0, 12).map((submission, index) => (
              <SubmissionCard
                footerPadding="px-2 py-2"
                key={index}
                isHomePage
                challengeUser={submission}
                challengeSlug={submission.challenge.slug}
                showReactions={false}
                size="small"
                className="flex-shrink-0"
              />
            ))}
          </section>

          <section className="flex gap-4 scroll-auto lower-post-list">
            {submissions.slice(12).map((submission, index) => (
              <SubmissionCard
                footerPadding="px-2 py-2"
                key={index}
                isHomePage
                challengeUser={submission}
                challengeSlug={submission.challenge.slug}
                showReactions={false}
                size="small"
                className="flex-shrink-0"
              />
            ))}
          </section>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white dark:from-[#11181F] via-transparent right-[90%]"></div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-white dark:from-[#161F29] via-transparent left-[90%]"></div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const { homeInfo } = useLoaderData<typeof loader>();

  const proPlanWithPrice = {
    ...proPlanDetails,
    monthlyPrice: Math.round(homeInfo.plan_info.price_in_cents / 100 / 12),
    totalPrice: homeInfo.plan_info.price_in_cents / 100,
  };

  return (
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
            featuresByCategory={freePlanFeatures}
            data={freePlanDetails}
          />
          <PriceCard
            data={proPlanWithPrice}
            featuresByCategory={proPlanFeatures}
          />
        </section>
      </div>
    </section>
  );
}

function Testimonial() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const featuredTestimonials = homeInfo.featured_testimonials;

  const [position, setPosition] = useState(2);
  const controls = useAnimation();

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  const isMediumScreen = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  let slideWidth: number;
  if (isLargeScreen) {
    slideWidth = 308 * 2 + 2; // 308 é o valor do card + gap. (+2) é o posicionamento inicial
  } else if (isMediumScreen) {
    slideWidth = 308 + 2;
  } else {
    slideWidth = 0 + 2;
  }

  const nextSlide = async () => {
    const newPosition = position - 308; // 308 é o valor do card + gap
    if (newPosition * -1 >= featuredTestimonials.length * 308 - slideWidth)
      return;
    setPosition(newPosition);
    await controls.start({ x: newPosition, transition: { duration: 0.5 } });
  };

  const prevSlide = async () => {
    const newPosition = position + 308;
    if (newPosition > 2) return;
    setPosition(newPosition);
    await controls.start({ x: newPosition, transition: { duration: 0.5 } });
  };

  if (featuredTestimonials.length < 1) return null;

  return (
    <section className="container flex justify-center w-full text-center mb-10">
      <div className="mt-10 container flex flex-col items-center mb-10 justify-center border-t border-gray-200 dark:border-gray-800">
        <h1 className="mt-14 mb-8 text-4xl font-light font-lexend text-center">
          Depoimentos
        </h1>
        <p className="mb-10 font-light text-center font-inter text-md md:text-xl lg:max-w-4xl">
          Veja o que alguns membros estão falando sobre o{" "}
          <span className="text-brand-500 font-bold">Codante</span>
        </p>
        <div className="items-center flex">
          <RiArrowLeftSLine
            className="md:inline hidden text-3xl text-brand-300 w-10 cursor-pointer hover:animate-pulse"
            onClick={() => prevSlide()}
          />
          <div className="overflow-hidden w-[308px] md:w-[616px] lg:w-[925px]">
            <motion.section
              className="rounded-lg flex gap-5 "
              animate={controls}
              initial={{ x: 2 }}
            >
              {featuredTestimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial.body}
                  avatarUrl={testimonial.avatar_url}
                  name={testimonial.name}
                  socialMediaProfileName={testimonial.social_media_nickname}
                  socialMediaProfileUrl={testimonial.social_media_link}
                />
              ))}
            </motion.section>
          </div>
          <RiArrowRightSLine
            className="md:inline hidden text-3xl text-brand-300 w-10 cursor-pointer hover:animate-pulse"
            onClick={() => nextSlide()}
          />
        </div>
        <div className="flex gap-5 mt-5">
          <RiArrowLeftSLine
            className="inline md:hidden text-3xl text-brand-300 w-10 cursor-pointer hover:animate-pulse mr-[5px]"
            onClick={() => prevSlide()}
          />
          <RiArrowRightSLine
            className="inline md:hidden text-3xl text-brand-300 w-10 cursor-pointer hover:animate-pulse"
            onClick={() => nextSlide()}
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  avatarUrl,
  name,
  socialMediaProfileName,
  socialMediaProfileUrl,
}: {
  testimonial: string;
  avatarUrl: string;
  name: string;
  socialMediaProfileName: string;
  socialMediaProfileUrl: string;
}) {
  return (
    <article
      className="flex flex-shrink-0 flex-col justify-between w-72 bg-background-50 h-80 dark:bg-background-800 p-5 text-sm rounded-xl border-[1.5px] border-background-200 dark:border-background-600
    hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow translate-x-2"
    >
      <p className="text-start">{testimonial}</p>
      <div className="flex items-center gap-5">
        <div>
          <img src={avatarUrl} alt="Avatar" className="w-10 rounded-full" />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-brand-500 font-bold">{name}</h3>
          <a
            href={socialMediaProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500"
          >
            {socialMediaProfileName}
          </a>
        </div>
      </div>
    </article>
  );
}
