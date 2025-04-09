"use client";
import React from "react";
import { StickyScroll } from "./sticky-scroll-reveal";
import { motion } from "framer-motion";

const content = [
  {
    title: (
      <span className="-rotate-2 inline-block p-4 rounded-xl dark:text-gray-200 text-gray-600 bg-background-100 dark:bg-background-800 font-lexend text-2xl">
        Reunião{" "}
        <span className="font-bold text-[#F4AD85] dark:text-[#FFDCC9]">
          individual
        </span>
      </span>
    ),
    description: (
      <>
        Assinando agora, você leva de bônus uma{" "}
        <span className="color-underline decoration-brand-500">
          reunião individual com nossa equipe
        </span>
        .
        <br />
        <br />
        Faça uma{" "}
        <span className="color-underline decoration-brand-500">
          vídeo chamada individual de 30 minutos
        </span>{" "}
        com nossa equipe para podermos entender melhor seu perfil e traçar o
        melhor plano de estudos e estratégia para suas metas de carreira.
        <br />
        <br />
        Conte com orientação especializada para maximizar seus resultados.
      </>
    ),
    content: (
      <div className="w-full h-full bg-linear-to-br dark:from-[#FFDCC9] dark:to-[#9e7158] from-[#FFDCC9] to-[#F4AD85] back rounded-xl flex justify-center items-center">
        <span className="-rotate-2 inline-block p-4 rounded-xl dark:text-gray-200 text-gray-600 bg-background-100 dark:bg-background-800 font-lexend text-2xl">
          Reunião{" "}
          <span className="font-bold text-[#F4AD85] dark:text-[#FFDCC9]">
            individual
          </span>
        </span>
      </div>
    ),
  },
  {
    title: (
      <span className="rotate-2 inline-block p-4 rounded-xl dark:text-gray-200 text-gray-600 bg-background-100 dark:bg-background-800 font-lexend text-2xl">
        Análise de{" "}
        <span className="font-bold text-[#71BBFF] dark:text-[#C9E5FF]">
          LinkedIn
        </span>
      </span>
    ),
    description: (
      <>
        Além disso, você ganha uma{" "}
        <span className="color-underline decoration-brand-500">
          análise de currículo e LinkedIn
        </span>
        .
        <br />
        <br />
        Para ter acesso, bastar assinar o <b>Codante</b>{" "}
        <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded-xs bg-amber-400">
          PRO
        </span>{" "}
        agora. Depois, basta entrar em contato pelo Discord a qualquer momento
        dentro dos 6 próximos meses para solicitar sua análise.
        <br />
        <br />
        Nossa equipe vai fazer um{" "}
        <span className="color-underline decoration-brand-500">
          relatório
        </span>{" "}
        em até 1 semana mostrando tudo o que você pode melhorar para conquistar
        os seus objetivos.
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
      </>
    ),
    content: (
      <div className="w-full h-full bg-linear-to-br dark:from-[#C9E5FF] dark:to-[#41678b] from-[#C9E5FF] to-[#71BBFF] back rounded-xl flex justify-center items-center">
        <span className="rotate-2 inline-block p-4 rounded-xl dark:text-gray-200 text-gray-600 bg-background-100 dark:bg-background-800 font-lexend text-2xl">
          Análise de{" "}
          <span className="font-bold text-[#71BBFF] dark:text-[#C9E5FF]">
            LinkedIn
          </span>
        </span>
      </div>
    ),
  },
  {
    title: (
      <span className="-rotate-2 inline-block p-4 rounded-xl dark:text-gray-200 text-gray-600 bg-background-100 dark:bg-background-800 font-lexend text-2xl">
        Planner{" "}
        <span className="font-bold text-[#C27AEE] dark:text-[#EAC9FF]">
          personalizado
        </span>
      </span>
    ),
    description: (
      <>
        Ganhe um{" "}
        <span className="color-underline decoration-brand-500">
          planner físico
        </span>{" "}
        para organizar seus estudos e acompanhar seu progresso. Ideal para
        planejar cada passo e manter o foco rumo aos seus objetivos.
        <br />
        <br />O planner será enviado para você via correio dentro de até 1 mês
        após a assinatura.
        <motion.img
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.8 }}
          variants={{
            visible: { opacity: 1, x: 0 },
            hidden: { opacity: 0.5, x: 10 },
          }}
          src="/img/black-friday/planner.png"
          alt="Planner"
          className="lg:w-96 rounded-lg"
        />
      </>
    ),
    content: (
      <div className="w-full h-full bg-linear-to-br dark:from-[#EAC9FF] dark:to-[#975eba] from-[#EAC9FF] to-[#C27AEE] back rounded-xl flex justify-center items-center">
        <span className="-rotate-2 inline-block p-4 rounded-xl dark:text-gray-200 text-gray-600 bg-background-100 dark:bg-background-800 font-lexend text-2xl">
          Planner{" "}
          <span className="font-bold text-[#C27AEE] dark:text-[#EAC9FF]">
            personalizado
          </span>
        </span>
      </div>
    ),
  },
];
export function ProgressivePracticeContent() {
  return (
    <div className="p-10 mt-10 lg:mt-0">
      <StickyScroll content={content} />
    </div>
  );
}
