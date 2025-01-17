import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Crisp } from "crisp-sdk-web";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import BackgroundBlur from "~/components/_layouts/background-blur";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import CarouselSubmissionCard from "~/components/features/submission-card/carousel-submission-card";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import UserAvatar from "~/components/ui/user-avatar";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import { getHome } from "~/lib/models/home.server";
import { cn } from "~/lib/utils/cn";
import Faq from "~/routes/_layout-app/_subscription/faq";
import { BoldColored } from "./components/bold-colored-text";
import { ProgressivePracticeContent } from "./components/progressive-practice";
import useLazyLoading from "~/lib/hooks/use-lazy-loading";
import ProPricingCard from "~/components/ui/cards/pricing/pro";
import FreePricingCard from "~/components/ui/cards/pricing/free";
import YearlyPricingCard from "~/components/ui/cards/pricing/yearly";

export const loader = async () => {
  return json({
    homeInfo: await getHome(),
  });
};

export default function HomePage() {
  useEffect(() => {
    Crisp.configure("dec01a18-bf11-4fb8-a820-6a53760ba042");
  }, []);

  useLazyLoading();

  return (
    <div>
      <div className="flex flex-col items-center justify-center text-gray-900 dark:text-gray-50">
        <BackgroundBlur />
        <Headline />
        <ProgressivePractice />
        <Submissions />
        <WorkShops />
        <Challenges />
        {/* <Tracks /> */}
        <Community />
        <Founders />
        <Testimonial />
        <Pricing />
        <Bonus />
        <FAQ />
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
  const scroll = () => {
    const section = document.querySelector("#pricing");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <button
      onClick={scroll}
      className="relative inline-flex items-center justify-center text-lg lg:text-2xl px-10 py-4 overflow-hidden font-medium text-gray-100 bg-brand-500 rounded-lg group w-full lg:w-7/12"
    >
      <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-background-700 rounded-full group-hover:w-[105%] group-hover:h-56"></span>
      <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
      <span className="relative">
        Quero ter acesso ao <span className="font-bold">Codante</span>{" "}
        <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-500">
          PRO
        </span>
      </span>
    </button>
  );
}

function Headline() {
  const { colorMode } = useColorMode();

  const [hoveredIndex, setHoveredIndex] = useState<string | null>();
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const techs = [
    { name: "React", image: "react" },
    { name: "Next.js", image: "next" },
    { name: "Tailwind", image: "tailwind" },
    { name: "Framer Motion", image: "framer-motion" },
    { name: "Typescript", image: "typescript" },
    { name: "HTML", image: "html" },
    { name: "CSS", image: "css" },
    { name: "Javascript", image: "javascript" },
  ];

  return (
    <>
      <section
        id="headline"
        className="flex flex-col items-center w-full lg:min-h-[calc(100vh_-_68px)]"
      >
        <div className="container flex flex-col items-center gap-2 mt-2">
          <h1 className="text-3xl font-light text-center mt-6 font-lexend md:text-6xl">
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
          <p className="font-light text-center font-inter text-xl max-w-[670px] mt-12 dark:text-gray-100 text-gray-700">
            Entenda porque você se sente{" "}
            <span className="italic ">completamente perdido(a)</span> quando
            está estudando programação e descubra o que você pode fazer para
            aprender front-end{" "}
            <span className="italic font-bold">DE VERDADE</span> para{" "}
            <span className="italic font-normal color-underline decoration-brand-300">
              conquistar os seus objetivos de carreira.
            </span>
          </p>

          <p className="flex gap-2 items-center font-light text-center font-inter text-md max-w-[670px] text-gray-600 dark:text-gray-400 mt-10">
            <PlayCircle className="h-5 dark:text-gray-100 text-gray-700" />
            Assista à aula
          </p>
        </div>

        <div className="container flex mt-8 gap-8 h-full flex-col items-center">
          <div className="aspect-video overflow-hidden rounded-lg w-full lg:w-7/12">
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

          <div className="flex gap-8 justify-between w-full lg:w-10/12 text-center text-sm lg:text-xl mb-20">
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
              <h2 className="animate-bg text-transparent bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-300 dark:to-gray-600 bg-clip-text">
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
              <h2 className="animate-bg text-transparent bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-300 dark:to-gray-600 bg-clip-text">
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
              <h2 className="animate-bg text-transparent bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-300 dark:to-gray-600 bg-clip-text">
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
              <h2 className="animate-bg text-transparent bg-gradient-to-r from-gray-700 to-gray-600 dark:from-gray-300 dark:to-gray-600 bg-clip-text">
                Pagamento seguro
              </h2>
            </div>
          </div>
        </div>
        <div className="container flex flex-col  overflow-hidden items-center justify-center  border-gray-200 dark:border-gray-800 mb-16">
          <div className="h-[1px] bg-background-100 dark:bg-background-700 w-2/3"></div>
          <div className="relative w-full">
            <h2 className="mt-14 text-center mb-2 text-gray-600 dark:text-gray-400 font-lexend">
              Aprenda e pratique as principais
            </h2>
            <motion.h1
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0.5, y: -10 },
              }}
              className="mb-8 text-2xl lg:text-4xl font-light font-lexend text-center"
            >
              Tecnologias de{" "}
              <span className="color-underline decoration-amber-400">
                front-end
              </span>
            </motion.h1>
          </div>

          <div className="grid justify-center grid-cols-4 gap-12 px-0 lg:grid-cols-8 mt-10">
            {techs.map((technology, index) => (
              <div key={index} className="relative group flex justify-center">
                {hoveredIndex === technology.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.6 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 10,
                      },
                    }}
                    exit={{ opacity: 0, y: 20, scale: 0.6 }}
                    style={{
                      translateX: translateX,
                      rotate: rotate,
                      whiteSpace: "nowrap",
                    }}
                    className="absolute -top-16 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md dark:bg-background-700 bg-background-50 z-50 shadow-xl px-4 py-2"
                  >
                    <div className="absolute left-2 translate-x-1/2 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-brand-500 to-transparent h-px " />
                    <div className="font-bold relative z-30 text-base">
                      {technology.name}
                    </div>
                  </motion.div>
                )}
                <motion.div
                  onMouseMove={handleMouseMove}
                  key={technology.name}
                  initial="hidden"
                  whileInView="visible"
                  transition={{ duration: 0.6, delay: 0.05 * index }}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0.5, y: -10 },
                  }}
                  onMouseEnter={() => setHoveredIndex(technology.name)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="w-16 h-16 lg:w-24 lg:h-24 animate-bg bg-gradient-to-br dark:from-background-700 dark:to-background-900 from-background-50 to-background-100 rounded-xl flex justify-center items-center"
                >
                  <img
                    src={`img/vendas/techs/${technology.image}.svg`}
                    className="w-8 h-8 lg:w-12 lg:h-12"
                    alt={technology.name}
                  />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProgressivePractice() {
  const { colorMode } = useColorMode();

  return (
    <section
      id="pratica-progressiva"
      className="flex justify-center w-full text-gray-800 bg-transparent dark:text-gray-50 top-0"
    >
      <div className="container flex flex-col items-center justify-center border-t border-gray-200 dark:border-gray-800 mb-10 top-0">
        <div className="relative w-full">
          <h1 className="mt-14 mb-8 text-3xl lg:text-4xl font-light font-lexend text-center dark:text-shadow">
            Aprenda do <span className="font-bold"> jeito certo</span>
          </h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[90px] w-32 lg:w-48 left-1/2 ml-16 lg:ml-24 transform -translate-x-1/2 -z-10"
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
              src={`/img/vendas/glasser-1-${colorMode}.webp`}
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
            <div className="absolute top-1 h-full w-full bg-background-100 dark:bg-background-600 opacity-30 blur p-[0.5] -z-10" />
            <div className="dark:bg-background-800 p-4 rounded-xl dark:border-background-700 bg-background-100 border-background-50 border">
              <p className="font-light font-inter text-sm dark:text-gray-300 text-gray-700">
                Quando você está assistindo uma aula ou vendo um curso, você
                está na etapa de{" "}
                <span className="decoration-amber-400 color-underline">
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
            <div className="absolute top-1 h-full w-full bg-background-100 dark:bg-background-600 opacity-30 blur p-[0.5] -z-10" />
            <div className="dark:bg-background-800 p-4 rounded-xl dark:border-background-700 bg-background-100 border-background-50 border">
              <p className="font-light font-inter text-sm dark:text-gray-300 text-gray-700">
                Quando você está de fato colocando a mão na massa, você está na
                etapa de{" "}
                <span className="color-underline decoration-brand-500">
                  aprendizagem ativa
                </span>
                . Aqui o aprendizado é <span className="italic">maior</span>.
              </p>
            </div>
          </motion.div>
          <div className="lg:h-72 w-full flex justify-center">
            <motion.img
              className=""
              src={`/img/vendas/glasser-2-${colorMode}.webp`}
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
            <div className="absolute top-1 h-full w-full bg-background-100 dark:bg-background-600 opacity-30 blur p-[0.5] -z-10" />
            <div className="dark:bg-background-800 p-4 rounded-xl dark:border-background-700 bg-background-100 border-background-50 border">
              <p className="font-light font-inter text-sm dark:text-gray-300 text-gray-700">
                Muita gente acha que quando está assistindo um curso e
                programando junto com o professor, está praticando de forma{" "}
                <span className="color-underline decoration-brand-500">
                  ativa
                </span>
                . Mas a verdade é que isso ainda é{" "}
                <span className="color-underline decoration-amber-400">
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
          <h2 className="text-center dark:text-gray-300 text-gray-600 lg:text-xl font-cursive">
            É por isso que o <b>Codante</b> usa a ideia da
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
              alt="Efeito brilhante (sparkle) desenhado a mao - forma 1"
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
              alt="Efeito brilhante (sparkle) desenhado a mao - forma 2"
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
              alt="Efeito brilhante (sparkle) desenhado a mao - forma 3"
            />

            <motion.img
              whileHover={{ scale: 1.05 }}
              className="w-[34rem] mt-20 mb-10"
              src={`img/vendas/pratica-progressiva-${colorMode}.png`}
              alt="Escada da prática progressiva - Base teórica, prática guiada, prática direcionada e mundo real"
            />
          </div>

          <ProgressivePracticeContent />

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
              <div className="absolute top-1 h-full w-full bg-background-100 dark:bg-background-600 opacity-30 blur p-[0.5] -z-10" />
              <div className="dark:bg-background-800 p-4 rounded-xl dark:border-background-700 bg-background-100 border-background-50 border">
                <p className="font-light font-inter text-sm dark:text-gray-300 text-gray-700">
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
          <h2 className="mt-14 text-center mb-2 dark:text-gray-300 text-gray-600 font-lexend">
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
          <div className="w-full">
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
        </div>
        <div className="flex gap-16 mt-20 mb-10 px-4 flex-col-reverse lg:flex-row">
          <p className="mt-16 mb-10 font-light dark:text-gray-300 text-gray-600 font-inter text-md md:text-xl w-full md:w-3/4 prose">
            Nossos{" "}
            <span className="color-underline decoration-brand-500">
              workshops
            </span>{" "}
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
          <div className="w-full">
            <motion.img
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0.5, x: 10 },
              }}
              src="img/vendas/workshops.webp"
              alt="Fundo gradiente com screenshot da tela de workshops"
              className="w-[40rem] shrink-0 grow-0"
            />
          </div>
        </div>
        <h2 className="mt-14 mb-10 text-center dark:text-gray-300 text-gray-600 font-lexend text-xl">
          Veja alguns{" "}
          <span className="color-underline decoration-brand-500">exemplos</span>
        </h2>

        <section className="grid justify-center w-full grid-cols-1 gap-4 px-0 md:grid-cols-2 lg:grid-cols-3">
          {homeInfo?.featured_workshops?.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </section>

        <section className="flex justify-center w-full mt-10">
          <Link
            to="/workshops"
            target="_blank"
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
          <h2 className="mt-14 text-center font-lexend mb-2 dark:text-gray-300 text-gray-600">
            Pratique com nossos{" "}
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

        <div className="flex gap-16 mt-20 mb-10 px-4 flex-col lg:flex-row">
          <div className="w-full">
            <motion.img
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0.5, x: -10 },
              }}
              src="img/vendas/mini-projetos.webp"
              alt="Fundo gradiente com screenshot da tela de mini projetos"
              className="w-[40rem] shrink-0 grow-0"
            />
          </div>
          <p className="mt-10 font-light dark:text-gray-300 text-gray-600 font-inter text-md md:text-xl prose w-full md:w-3/4">
            Nossos{" "}
            <span className="color-underline decoration-amber-400">
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
            <span className="color-underline decoration-[#EAC9FF]">
              forma guiada
            </span>
            , assistindo nossas resoluções oficiais ou fazê-los de{" "}
            <span className="color-underline decoration-[#C9E5FF]">
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
        </div>
        <h2 className="mt-14 mb-10 text-center dark:text-gray-300 text-gray-600 font-lexend text-xl">
          Veja alguns{" "}
          <span className="color-underline decoration-amber-400">exemplos</span>
        </h2>

        <section className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {orderedChallengeList.map((challenge) => (
            <div key={challenge.slug} className="mx-auto">
              <ChallengeCard openInNewTab challenge={challenge} />
            </div>
          ))}
        </section>
        <section className="flex justify-center w-full mt-10 mb-10">
          <Link
            to="/mini-projetos"
            target="_blank"
            className="px-4 py-2 bg-white rounded-full dark:bg-background-800"
          >
            Ver todos
          </Link>
        </section>
      </div>
    </section>
  );
}

// function Tracks() {
//   const { colorMode } = useColorMode();

//   return (
//     <section id="mini-projects" className="flex justify-center w-full">
//       <div className="container flex flex-col items-center w-full border-t border-gray-200 dark:border-gray-800 mt-10">
//         <div className="relative w-full">
//           <h2 className="mt-14 text-center font-lexend mb-2 dark:text-gray-300 text-gray-600">
//             Siga um caminho detalhado com nossas{" "}
//           </h2>

//           <motion.h1
//             initial="hidden"
//             whileInView="visible"
//             transition={{ duration: 0.8 }}
//             variants={{
//               visible: { opacity: 1, y: 0 },
//               hidden: { opacity: 0.5, y: -10 },
//             }}
//             className="mb-8 text-4xl font-light font-lexend text-center"
//           >
//             Trilhas
//           </motion.h1>
//           <img
//             src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
//             alt="Line stroke effect"
//             className="absolute top-[120px] w-64 left-1/2 transform -translate-x-1/2 -z-10"
//           />
//           <motion.img
//             initial="hidden"
//             whileInView="visible"
//             transition={{ duration: 0.8 }}
//             variants={{
//               visible: { opacity: 1, scaleZ: 1 },
//               hidden: { opacity: 0, scaleZ: 0 },
//             }}
//             src={`/img/blue-smoke.svg`}
//             alt="Smoke effect"
//             className="absolute top-0 w-full left-1/2 transform translate-x-[-50%]"
//           />
//         </div>

//         <div className="flex gap-16 mt-20 mb-10 px-4 flex-col lg:flex-row">
//           <p className="mt-10 font-light dark:text-gray-300 text-gray-600 font-inter text-md md:text-xl prose w-full md:w-3/4">
//             Nossas{" "}
//             <span className="color-underline decoration-brand-400">
//               trilhas
//             </span>{" "}
//             são a junção de{" "}
//             <b>
//               <i>projetos</i>
//             </b>
//             ,{" "}
//             <b>
//               <i>workshops</i>
//             </b>{" "}
//             e{" "}
//             <b>
//               <i>links externos</i>
//             </b>{" "}
//             de uma forma sequencial, para quem gosta de ter um caminho pra
//             seguir.
//             <br />
//             <br />
//             Ao invés de fazer um curso, você pode ir seguindo o passo-a-passo da
//             trilha, dessa forma você aprende de forma muito mais ativa.
//             <br />
//             <br />
//             Alguns conteúdos das trilhas são gratuitos. Assinando o{" "}
//             <b>Codante</b>{" "}
//             <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-400">
//               PRO
//             </span>
//             , você tem acesso a{" "}
//             <b>
//               <u>
//                 <i>todas as trilhas de forma completa</i>
//               </u>
//             </b>
//             . Inclusive as próximas que lançarmos.
//           </p>
//           <div className="w-full">
//             <motion.img
//               initial="hidden"
//               whileInView="visible"
//               transition={{ duration: 0.8 }}
//               variants={{
//                 visible: { opacity: 1, x: 0 },
//                 hidden: { opacity: 0.5, x: 10 },
//               }}
//               src="img/vendas/trilhas.webp"
//               alt="Fundo gradiente com screenshot da tela de mini projetos"
//               className="w-[40rem] shrink-0 grow-0"
//             />
//           </div>
//         </div>

//         {/* <section className="flex justify-center w-full mt-10 mb-10">
//           <Link
//             to="/trilhas"
//             target="_blank"
//             className="px-4 py-2 bg-white rounded-full dark:bg-background-800"
//           >
//             Ver todas
//           </Link>
//         </section> */}
//       </div>
//     </section>
//   );
// }

function Community() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  const avatarSection = homeInfo.avatar_section;

  return (
    <section id="mini-projects" className="flex justify-center w-full">
      <div className="container flex flex-col items-center w-full border-t border-gray-200 dark:border-gray-800 mt-10">
        <div className="relative w-full">
          <h2 className="mt-14 text-center font-lexend mb-2 dark:text-gray-300 text-gray-600">
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
          <h3 className="mb-10 font-light dark:text-gray-300 text-gray-600 font-inter text-md md:text-xl text-center ">
            Já somos{" "}
            <b className="rotate-2 inline-block dark:bg-background-700 bold border dark:border-background-600 bg-background-100 border-background-150 px-2 rounded-lg">
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

        <p className="mt-10 mb-10 font-light dark:text-gray-300 text-gray-600 font-inter text-md md:text-xl w-full md:w-3/4 prose">
          O Codante é composto por uma comunidade de pessoas que estão
          praticando e evoluindo juntas. Você pode se conectar com elas através
          do nosso <b>servidor no Discord</b>.
          <br />
          <br />
          Além disso, você pode ver quem está participando dos{" "}
          <span className="color-underline decoration-amber-400">
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

function Founders() {
  const { colorMode } = useColorMode();

  return (
    <section id="founders" className="flex justify-center w-full">
      <div className="container flex flex-col items-center w-full border-t border-gray-200 dark:border-gray-800 mt-10">
        <div className="relative w-full">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0.5, y: -10 },
            }}
            className="mt-20 mb-8 text-4xl font-light font-lexend text-center"
          >
            Quem somos nós
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
            className="absolute top-0 w-full left-1/2 transform translate-x-[-50%] -z-10"
          />
        </div>

        <p className="mt-10 mb-10 font-light dark:text-gray-300 text-gray-600 font-inter text-md md:text-xl w-full md:w-3/4 prose">
          O Codante é a junção dos nossos anos de experiência como devs e
          professores.
          <br />
          <br />
          Somos apaixonados por desenvolvimento web, principalmente{" "}
          <span className="color-underline decoration-amber-400">
            front-end
          </span>
          . Por isso, colocamos muito carinho para criar uma plataforma que seja
          bonita e com uma ótima experiência para nossa comunidade.
          <br />
          <br />
          Conheça um pouco mais sobre nossa história:
        </p>

        <section className="mt-20 mb-10 w-full">
          <div className="w-full flex lg:flex-row flex-col gap-10">
            <div className="relative">
              <motion.img
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8 }}
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0.5, x: 10 },
                }}
                src="img/vendas/icaro.webp"
                className="grow-0 shrink-0 lg:w-[32rem] w-full h-auto rounded-xl"
                alt="Ícaro Harry"
              />
            </div>
            <div className="prose w-full text-gray-600 dark:text-gray-400">
              <h2 className="dark:text-gray-300 text-gray-700 font-lexend text-2xl font-medium flex items-center gap-2">
                Ícaro Harry
                <a
                  href={"https://www.linkedin.com/in/%C3%ADcaro/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-light text-gray-500 dark:text-gray-300"
                >
                  <AiFillLinkedin className="text-2xl dark:text-gray-700 text-gray-600 transition hover:text-gray-700  dark:hover:text-gray-300" />
                </a>
                <a
                  href={"https://www.github.com/icaroharry/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-light text-gray-500 dark:text-gray-300"
                >
                  <AiFillGithub className="text-2xl dark:text-gray-700 text-gray-600 transition hover:text-gray-700  dark:hover:text-gray-300" />
                </a>
              </h2>
              <ul className="marker:text-amber-400">
                <li>
                  <span className="color-underline decoration-brand-300">
                    Dev front-end
                  </span>{" "}
                  há 10 anos e{" "}
                  <span className="color-underline decoration-brand-300">
                    professor
                  </span>{" "}
                  há 4 anos.
                </li>
                <li>
                  <span className="italic">Ensinou</span>,{" "}
                  <span className="italic">treinou</span> e{" "}
                  <span className="italic">mentorou</span> mais de{" "}
                  <span className="color-underline decoration-brand-300">
                    600 pessoas
                  </span>{" "}
                  no Brasil e na Europa, antes de começar o Codante.
                </li>
                <li>
                  Foi coordenador responsável por turmas de até{" "}
                  <span className="color-underline decoration-brand-300">
                    450 alunos
                  </span>
                  , gerindo equipes de até 12 professores e instrutores.
                </li>
                <li>
                  Trabalhou como desenvolvedor em{" "}
                  <span className="color-underline decoration-brand-300">
                    5 empresas
                  </span>{" "}
                  nacionais e internacionais, tendo atuado em projetos nas áreas
                  de visualização de dados médicos; mercado financeiro e
                  blockchain.
                </li>
                <li>
                  Trabalhou em projetos com{" "}
                  <span className="color-underline decoration-brand-300">
                    React
                  </span>
                  ,{" "}
                  <span className="color-underline decoration-brand-300">
                    Vue
                  </span>
                  ,{" "}
                  <span className="color-underline decoration-brand-300">
                    Angular (1 e 2)
                  </span>
                  ,
                  <span className="color-underline decoration-brand-300">
                    Next.js
                  </span>
                  ,{" "}
                  <span className="color-underline decoration-brand-300">
                    Remix
                  </span>
                  , tendo uma ampla experiência com diferentes tecnologias de
                  front-end.
                </li>
              </ul>
            </div>
          </div>

          <div className="w-full flex lg:flex-row flex-col gap-10 mt-16">
            <div>
              <motion.img
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 0.8 }}
                variants={{
                  visible: { opacity: 1, x: 0 },
                  hidden: { opacity: 0.5, x: 10 },
                }}
                src="img/vendas/cestari.webp"
                className="grow-0 shrink-0 lg:w-[32rem] w-full h-auto rounded-xl"
                alt="Roberto Cestari"
              />
            </div>
            <div className="prose w-full text-gray-600 dark:text-gray-400 ">
              <h2 className="dark:text-gray-300 text-gray-700 font-lexend text-2xl font-medium flex items-center gap-2">
                Roberto Cestari
                <a
                  href={"https://www.linkedin.com/in/robertotcestari/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-light text-gray-500 dark:text-gray-300"
                >
                  <AiFillLinkedin className="text-2xl text-gray-600 transition hover:text-gray-700 dark:text-gray-700 dark:hover:text-gray-300" />
                </a>
                <a
                  href={"https://www.github.com/robertotcestari/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm font-light text-gray-500 dark:text-gray-300"
                >
                  <AiFillGithub className="text-2xl text-gray-600 transition hover:text-gray-700 dark:text-gray-700 dark:hover:text-gray-300" />
                </a>
              </h2>
              <ul className="marker:text-brand-400">
                <li>
                  Foi{" "}
                  <span className="color-underline decoration-amber-300">
                    Tech Lead
                  </span>{" "}
                  de Front-end e responsável pelo currículo de Front-end bem
                  como liderança técnica de um time de mais de 20 pessoas em uma
                  das maiores empresas de educação do país.
                </li>
                <li>
                  Foi professor de Front-End para mais de{" "}
                  <span className="color-underline decoration-amber-300">
                    400 alunos
                  </span>{" "}
                  antes de começar o Codante.
                </li>
                <li>
                  É fundador e CTO do{" "}
                  <a
                    href={"https://trilhante.com.br"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="color-underline decoration-orange-400 text-gray-600 dark:text-gray-400"
                  >
                    Trilhante
                  </a>
                  , uma das maiores plataformas de ensino de direito do Brasil.
                  O Trilhante possui em sua plataforma{" "}
                  <span className="color-underline decoration-amber-300">
                    20k aulas
                  </span>{" "}
                  e{" "}
                  <span className="color-underline decoration-amber-300">
                    680 cursos
                  </span>
                  , todos gravado in-house, e conta com{" "}
                  <span className="color-underline decoration-amber-300">
                    117k usuários
                  </span>{" "}
                  e mais de{" "}
                  <span className="color-underline decoration-amber-300">
                    25k assinaturas
                  </span>{" "}
                  vendidas.
                </li>
                <li>
                  Além da plataforma, o canal do Youtube conseguiu ~300k
                  seguidores com mais de{" "}
                  <span className="color-underline decoration-amber-300">
                    29 milhões
                  </span>{" "}
                  de aulas assistidas.
                </li>
                <li>
                  É graduado em Administração de Empresas pela EAESP-FGV, e
                  graduado e mestre em Direito pela USP
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="founders" className="flex justify-center w-full">
      <div className="container flex flex-col items-center w-full border-t border-gray-200 dark:border-gray-800 mt-10">
        <div className="relative w-full">
          <motion.h1
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0.5, y: -10 },
            }}
            className="mt-20 mb-8 text-4xl font-light font-lexend text-center"
          >
            Perguntas{" "}
            <span className="color-underline decoration-amber-500">
              frequentes
            </span>
          </motion.h1>

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
            className="absolute top-0 w-full left-1/2 transform translate-x-[-50%] -z-10"
          />
        </div>

        <section className="mt-20 mb-10">
          <Faq />
        </section>
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
          <span className="relative font-bold text-transparent animate-bg bg-gradient-to-r dark:from-blue-200 dark:to-blue-500 from-blue-500 via-indigo-500 to-blue-900 bg-clip-text">
            comunidade
          </span>{" "}
          está construindo com base na{" "}
          <span className="italic">
            técnica da{" "}
            <span className="color-underline decoration-brand-500">
              prática progressiva
            </span>
          </span>
          .
        </h1>
        <p className="mt-2 mb-2 font-light font-inter md:text-xl text-center w-full md:w-3/4 dark:text-gray-300 text-gray-600">
          Esses projetos foram feitos por pessoas que estão{" "}
          <span className="color-underline decoration-amber-400">
            aprendendo
          </span>{" "}
          e{" "}
          <span className="color-underline decoration-brand-500">
            praticando
          </span>{" "}
          front-end.
        </p>
        <p className="mt-2 mb-10 font-light font-inter md:text-xl text-center w-full md:w-1/2 dark:text-gray-300 text-gray-600">
          Alguns foram feitos de <span className="italic">forma guiada</span>,
          seguindo os nossos tutoriais. Outros foram feitos de{" "}
          <span className="italic">forma direcionada</span>, apenas a partir da
          lista de requisitos e do Figma.
        </p>

        <div className="relative mb-20">
          <section className=" flex gap-4 upper-post-list mb-4">
            {submissions.slice(0, 12).map((submission, index) => (
              <CarouselSubmissionCard
                key={index}
                challengeSlug={submission.challenge.slug}
                submissionImageUrl={submission.submission_image_url}
                avatar={submission.avatar}
              />
            ))}
          </section>

          <section className="flex gap-4 scroll-auto lower-post-list">
            {submissions.slice(12).map((submission, index) => (
              <CarouselSubmissionCard
                key={index}
                challengeSlug={submission.challenge.slug}
                submissionImageUrl={submission.submission_image_url}
                avatar={submission.avatar}
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
  // const { homeInfo } = useLoaderData<typeof loader>();

  // const promotionInfo = JSON.parse(homeInfo?.plan_info?.details || "{}");

  return (
    <section
      id="pricing"
      className="flex justify-center w-full -mb-10 text-center text-gray-800 dark:text-gray-50 container px-8"
    >
      <div className="flex flex-col items-center w-full overflow-hidden scrollbar-hide flex-shrink-0 scroll-auto border-t border-gray-200 dark:border-gray-800 ">
        <div className="relative w-full">
          <h2 className="mt-14 text-center mb-2 text-gray-600 dark:text-gray-400 font-lexend">
            Assine agora o
          </h2>
          <motion.h1
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 0.8 }}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0.5, y: -10 },
            }}
            className="mb-8  text-4xl font-light font-lexend text-center"
          >
            Codante{" "}
            <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-400">
              PRO
            </span>
          </motion.h1>

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
            className="absolute top-0 w-full left-1/2 transform translate-x-[-50%] -z-10"
          />
        </div>

        <section className="flex flex-col-reverse justify-center gap-10 mt-10 mb-20 lg:flex-row">
          <FreePricingCard />
          <YearlyPricingCard />
          <ProPricingCard />
        </section>
      </div>
    </section>
  );
}

function Bonus() {
  const { colorMode } = useColorMode();

  return (
    <section
      id="bonus"
      className="flex justify-center w-full text-gray-800 bg-transparent dark:text-gray-50 mt-10"
    >
      <div className="container flex flex-col  overflow-hidden items-center justify-center border-t border-gray-200 dark:border-gray-800 mb-10">
        <div className="relative w-full">
          <h2 className="mt-14 text-center mb-2 dark:text-gray-300 text-gray-600 font-lexend">
            Comprando agora você ganha
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
            Bônus
          </motion.h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[120px] w-32 left-1/2 transform -translate-x-1/2 -z-10"
          />
          <div className="w-full">
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
        </div>
        <div className="flex gap-16 mt-20 mb-10 px-4 flex-col-reverse lg:flex-row">
          <p className="mt-16 mb-10 font-light dark:text-gray-300 text-gray-600 font-inter text-md md:text-xl w-full md:w-3/4 prose">
            Comprando agora, você leva de bônus uma{" "}
            <span className="color-underline decoration-brand-500">
              análise de currículo e LinkedIn
            </span>
            .
            <br />
            <br />
            Para ter acesso, bastar assinar o <b>Codante</b>{" "}
            <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded bg-amber-400">
              PRO
            </span>{" "}
            agora. Depois disso, você precisa usar a plataforma e submeter 2
            projetos da sua escolha. Depois, basta entrar em contato pelo
            Discord para solicitar sua análise.
            <br />
            <br />
            Nossa equipe vai fazer um{" "}
            <span className="color-underline decoration-brand-500">
              relatório
            </span>{" "}
            mostrando tudo o que você pode melhorar para conquistar os seus
            objetivos.
          </p>
          <div className="w-full">
            <motion.img
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              variants={{
                visible: { opacity: 1, x: 0 },
                hidden: { opacity: 0.5, x: 10 },
              }}
              src="img/vendas/bonus.webp"
              alt="Fundo gradiente com screenshot da tela com LinkedIn e Currículo"
              className="w-[40rem] shrink-0 grow-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  const { colorMode } = useColorMode();
  const { homeInfo } = useLoaderData<typeof loader>();
  const featuredTestimonials = homeInfo.featured_testimonials;

  return (
    <section className="container flex justify-center w-full text-center mb-10">
      <div className="mt-10 flex flex-col items-center mb-10 justify-center border-t border-gray-200 dark:border-gray-800">
        <div className="relative w-full">
          <h2 className="mt-14 text-center mb-2 dark:text-gray-300 text-gray-600 font-cursive">
            Um pouco de amor dos nossos alunos
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
            Depoimentos
          </motion.h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[120px] w-64 left-1/2 transform -translate-x-1/2 -z-10"
          />
          <div className="w-full">
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
        </div>

        <motion.section
          className="rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-10 gap-5 w-full mt-16"
          initial={{ x: 2 }}
        >
          {featuredTestimonials.map((testimonial, index) => (
            <TestimonialCard
              wide={[2, 4].includes(index)}
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
    </section>
  );
}

function TestimonialCard({
  testimonial,
  avatarUrl,
  name,
  socialMediaProfileName,
  socialMediaProfileUrl,
  wide,
}: {
  testimonial: string;
  avatarUrl: string;
  name: string;
  socialMediaProfileName: string;
  socialMediaProfileUrl: string;
  wide: boolean;
}) {
  return (
    <article
      className={cn(
        "flex gap-6 flex-shrink-0 flex-col justify-between w-full bg-background-50 lg:h-96 dark:bg-background-800 p-5 text-sm rounded-xl border-[1.5px] border-background-200 dark:border-background-700 hover:border-blue-300 hover:shadow-lg dark:hover:border-background-600 transition-all dark:hover:shadow-lg translate-x-2 col-span-1 xl:col-span-3",
        wide && "xl:col-span-4",
      )}
    >
      <MarkdownRenderer
        prose
        // fontSize="small"
        markdown={testimonial}
        wrapperClasses="text-start text-gray-600 dark:text-gray-400"
      />
      {/* <p className="text-start prose text-gray-600 dark:text-gray-400">{testimonial}</p> */}
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
