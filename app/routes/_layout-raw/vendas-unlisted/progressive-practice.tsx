"use client";
import React from "react";
import { BoldColored } from "~/routes/_layout-raw/vendas-unlisted/bold-colored-text";
import { StickyScroll } from "~/routes/_layout-raw/vendas-unlisted/sticky-scroll-reveal";

const Keyboard = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block border border-background-600 bg-background-700 p-1 rounded-lg text-xs font-semibold">
    {children}
  </span>
);

const content = [
  {
    title: (
      <span className="-rotate-2 inline-block p-4 rounded-xl bg-background-800 font-lexend text-2xl">
        Base <span className="font-bold text-[#FFDCC9]">teórica</span>
      </span>
    ),
    description: (
      <>
        A primeira etapa é construir sua{" "}
        <BoldColored color="#FFDCC9">base teórica</BoldColored>. Pode ser
        estudando <b>documentação</b>, fazendo um<b> curso</b>, assistindo
        <b> vídeos</b>, lendo <b>artigos</b>, ouvindo <b>podcasts</b>, etc.
        <br />
        <br />
        No Codante, nós disponibilizamos{" "}
        <b>
          <i>Workshops</i>
        </b>{" "}
        para isso. <br />
        <br />
        Perceba que essa parte combina com a{" "}
        <BoldColored color="#FBBF24">aprendizagem passiva</BoldColored>. Antes
        de mergulhar na prática, você precisa de uma base. Mas tenha consciência
        que você{" "}
        <b>
          <i>
            <u>não vai aprender de verdade</u>
          </i>
        </b>{" "}
        se fizer apenas isso.
      </>
    ),
    content: (
      <div className="w-full h-full bg-gradient-to-br from-[#FFDCC9] to-[#9e7158] back rounded-xl flex justify-center items-center">
        <span className="-rotate-2 inline-block p-4 rounded-xl bg-background-800 font-lexend text-2xl">
          Base <span className="font-bold text-[#FFDCC9]">teórica</span>
        </span>
      </div>
    ),
  },
  {
    title: (
      <span className="rotate-2 inline-block p-4 rounded-xl bg-background-800 font-lexend text-2xl">
        Prática <span className="font-bold text-[#EAC9FF]">guiada</span>
      </span>
    ),
    description: (
      <>
        Para continuar aprendendo, você tem que começar a por a mão na massa.
        Então é interessante que você comece a <b>fazer projetos</b>.
        <br />
        <br />O problema é que se você for direto tentar fazer um projeto de um
        assunto que você ainda está aprendendo, é bem possível que você não
        consiga e acabe <i>se frustando</i>.
        <br />
        <br />
        Por isso, recomendamos que você faça{" "}
        <BoldColored color="#EAC9FF">projetos guiados</BoldColored>. Assistir
        alguém fazendo um projeto ajuda muito a se destravar.
        <br />
        <br />
        No Codante, nós disponibilizamos{" "}
        <b>
          <i>tutoriais passo-a-passo</i>
        </b>{" "}
        resolvendo nossos projetos.
        <br />
        <br />
        Mas tenha consciência que isso ainda é uma{" "}
        <BoldColored color="#FBBF24">aprendizagem passiva</BoldColored>. Você
        não pode parar aqui.
      </>
    ),
    content: (
      <div className="w-full h-full bg-gradient-to-br from-[#EAC9FF] to-[#975eba] back rounded-xl flex justify-center items-center">
        <span className="rotate-2 inline-block p-4 rounded-xl bg-background-800 font-lexend text-2xl">
          Prática <span className="font-bold text-[#EAC9FF]">guiada</span>
        </span>
      </div>
    ),
  },
  {
    title: (
      <span className="-rotate-2 inline-block p-4 rounded-xl bg-background-800 font-lexend text-2xl">
        Prática <span className="font-bold text-[#C9E5FF]">direcionada</span>
      </span>
    ),
    description: (
      <>
        Agora é a hora de começar a andar <i>por conta própria</i>. Nessa etapa
        você tem que quebrar a cabeça para aprender de forma autônoma. Para
        isso, faça projetos sem <Keyboard>CTRL C</Keyboard> +{" "}
        <Keyboard>CTRL V</Keyboard>.
        <br />
        <br />O problema é que se você tentar inventar um projeto do nada,
        provavelmente você vai ter várias <i>ideias mirabolantes</i> e se{" "}
        <b>distrair</b>.
        <br />
        <br />
        Para resolver isso,{" "}
        <BoldColored color="#C9E5FF">pratique de forma direcionada</BoldColored>
        . Escolha um projeto que você tenha pelo menos uma lista de requisitos
        ou um design.
        <br />
        <br />
        No Codante, nós disponibilizamos projetos com uma lista de requisitos e
        um design no Figma para isso.
        <br />
        <br />
        Agora sim você está{" "}
        <BoldColored color="#5282FF">praticando de forma ativa</BoldColored>.
      </>
    ),
    content: (
      <div className="w-full h-full bg-gradient-to-br from-[#C9E5FF] to-[#41678b] back rounded-xl flex justify-center items-center">
        <span className="-rotate-2 inline-block p-4 rounded-xl bg-background-800 font-lexend text-2xl">
          Prática <span className="font-bold text-[#C9E5FF]">direcionada</span>
        </span>
      </div>
    ),
  },
  {
    title: (
      <span className="rotate-2 inline-block p-4 rounded-xl bg-background-800 font-lexend text-2xl">
        Mundo <span className="font-bold text-[#DDFFC9]">real</span>
      </span>
    ),
    description: (
      <>
        A maioria das pessoas pensa que depois que você faz um curso,{" "}
        <i>acabou</i> o aprendizado.
        <br />
        <br />A realidade é que quando você vai pro{" "}
        <BoldColored color="#DDFFC9">mundo real</BoldColored>, você continua
        aprendendo coisas novas e isso <b>faz parte</b> do processo de
        aprendizado.
        <br />
        <br />
        Se você vai usar esse aprendizado no trabalho, o trabalho vai ser o seu{" "}
        <BoldColored color="#DDFFC9">mundo real</BoldColored>.
        <br />
        <br />
        Caso você esteja aprendendo por outros motivos, você pode colocar suas
        ideias mirabolantes em prática e{" "}
        <b>
          <i>
            <u>criar projetos pessoais</u>
          </i>
        </b>
        . O ideal são projetos que vão ser usados por outras pessoas.
        <br />
        <br />
        Outra possibilidade é <b>contribuir</b> para projetos open-source
      </>
    ),
    content: (
      <div className="w-full h-full bg-gradient-to-br from-[#DDFFC9] to-[#5d8745] back rounded-xl flex justify-center items-center">
        <span className="rotate-2 inline-block p-4 rounded-xl bg-background-800 font-lexend text-2xl">
          Mundo <span className="font-bold text-[#DDFFC9]">real</span>
        </span>
      </div>
    ),
  },
];
export function ProgressivePractice() {
  return (
    <div className="p-10 mt-10 lg:mt-0">
      <StickyScroll content={content} />
    </div>
  );
}
