import imageSrc from "./img.png";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
} from "react-icons/si";
import { motion } from "framer-motion";

import { FaServer, FaLock } from "react-icons/fa";
import { BsShield } from "react-icons/bs";
import { BlurRevealText } from "~/components/ui/motion/blur-reveal/text";
import TestimonialCard from "~/routes/_landing-page/components/testimonials/card";

const featuredTestimonials = [
  {
    name: "Bruno Alves",
    body: 'Eu fui um dos primeiros assinantes do Codante. A \u003Cspan className="color-underline decoration-brand-500"\u003Equalidade dos instrutores\u003C/span\u003E e a possibilidade de ter uma assinatura vitalícia fez com que eu não tivesse dúvidas!',
    avatar_url: "https://avatars.githubusercontent.com/u/18636020?v=4",
    social_media_link: "https://www.linkedin.com/in/alvesbrunolog/",
    social_media_nickname: "@alvesbrunolog",
    featured: "landing",
  },
  {
    name: "Keyla Costa Dalseco",
    body: 'O Codante me ajudou a aprimorar meus conhecimentos técnicos em frontend, além de que pude aprender \u003Cspan className="color-underline decoration-brand-500"\u003Emuitas tecnologias e frameworks\u003C/span\u003E que podem ser utilizados no dia a dia. A plataforma possui muitas ideias de projetos e oficinas para moldar esse conhecimento.',
    avatar_url: "https://avatars.githubusercontent.com/u/112834431?v=4",
    social_media_link: "http://www.linkedin.com/in/keyla-costa-dalseco",
    social_media_nickname: "@keyladalseco",
    featured: "landing",
  },
  {
    name: "Thiago Credico",
    body: 'Conheci o Codante enquanto procurava aprimorar minhas habilidades como Dev. Me identifiquei demais com o projeto Open Source, com a metodologia de ensino e com a didática que é bastante \u003Cspan className="color-underline decoration-brand-500"\u003Emoderna, mão-na-massa e direta ao ponto\u003C/span\u003E moderna, mão-na-massa e direta ao ponto! Confio plenamente no Codante e estou muito feliz em fazer parte disso! ❤️',
    avatar_url:
      "https://s3-sa-east-1.amazonaws.com/codante/testimonials/avatars/866058fe9e4b237b6c4d74908511dea7.webp",
    social_media_link: "https://www.linkedin.com/in/thiago-credico/",
    social_media_nickname: "@thiagocredico",
    featured: "landing",
  },
  {
    name: "Mariana Saraiva",
    body: "Dois professores sensacionais que me mostraram o caminho do frontend! Sucesso para vocês! Estou acompanhando este projeto de perto!",
    avatar_url:
      "https://s3-sa-east-1.amazonaws.com/codante/testimonials/avatars/d4d221e2461f0e3945ce0984998993bb.webp",
    social_media_link: "https://www.linkedin.com/in/marianascmoura/",
    social_media_nickname: "@marianascmoura",
    featured: "landing",
  },
  {
    name: "Jônatas Quirino",
    body: 'Programação real exige soluções ideais. Ao invés de replicar projetos que todo mundo copiou e colou, desenvolver projetos e tentar resolver problemas reais te força a aprimorar sua pesquisa, a direcionar os estudos e a florescer a criatividade no desenvolvimento de qualquer software. Além disso, o \u003Cspan className="color-underline decoration-brand-500"\u003Esuporte do Ícaro e do Roberto na comunidade é excepcional\u003C/span\u003E.',
    avatar_url:
      "https://s3-sa-east-1.amazonaws.com/codante/testimonials/avatars/854d8d206145895bda234c2231470770.webp",
    social_media_link: "https://www.linkedin.com/in/jonatasquirino/",
    social_media_nickname: "@jonatasquirino",
    featured: "landing",
  },
  {
    name: "Evandro Calado",
    body: 'Acompanho o trabalho de vocês a algum tempo, acho que desde que vi um de vocês no Papinho tech. Acho que vocês fazem um trabalho incrível de conteúdo frontend. \u003Cspan className="color-underline decoration-brand-500"\u003EMuito potencial para ser o melhor conteúdo de front do Brasil se já não for\u003C/span\u003E.',
    avatar_url:
      "https://s3-sa-east-1.amazonaws.com/codante/testimonials/avatars/e9cfd511b0c041384af11da6f5373bab.webp",
    social_media_link: "https://www.instagram.com/evandro__calado",
    social_media_nickname: "@evandro__calado",
    featured: "landing",
  },
];

export default function NextJsLandingPage() {
  return (
    <div className="container mx-auto">
      <main className="text-center">
        <header className="mt-10">
          <p className="text-amber-400 font-cursive text-sm font-extralight">
            com Roberto Cestari
          </p>
          <h1 className="text-6xl font-bold">Aprenda Next.js</h1>
          <p className="text-gray-500 dark:text-gray-300 text-3xl font-extralight mt-0">
            ++ do zero ao avançado
          </p>
        </header>
        <img
          src={imageSrc}
          className="mx-auto px-8 mt-10 hero-dashboard-border-gradient xs:h-[400px] sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]"
        />

        <p>
          Não preciso nem dizer o porque Next.js é importante. (empresas que
          usam)
        </p>
        <p>Aqui, um pouco da metodologia</p>

        <section className="mt-12 w-full flex flex-col md:flex-row items-center bg-gray-900 text-white rounded-2xl shadow-lg p-8 gap-8 max-w-4xl mx-auto">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={imageSrc}
              alt="Instrutor"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            <p className="text-xs text-center mt-2 text-amber-300 font-semibold">
              MEET YOUR INSTRUCTOR
            </p>
          </div>
          {/* Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Roberto Cestari</h2>
            <p className="mb-4 text-gray-200">
              Roberto é um engenheiro de software que já escreveu livros e
              cursos sobre JavaScript e React. Possui mais de uma década de
              experiência desenvolvendo aplicações web e consultoria para
              startups e empresas globais. Atuou em projetos para empresas como
              MakerDAO e o governo dos EUA, entre outros.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> Bestselling
                JavaScript Book Author
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 3.000.000+ Blog
                Visits/ano
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 80.000+
                Leitores/Alunos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 50.000+ Newsletter
                Readers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 23.000+ Twitter
                Followers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 10.000+ LinkedIn
                Followers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 8.000+ GitHub
                Followers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 6.000+ GitHub Stars
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> GitHub Star Award
                (várias vezes)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> Co-fundador Técnico
                do CloudCamping
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> Pai de dois meninos
                incríveis
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <header>
            <h2 className="text-4xl font-bold mb-2">
              Tecnologia que vamos aprender
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <SiNextdotjs className="w-8 h-8 text-black dark:text-white" />
                </div>
                <div>
                  <span className="text-lg">Next.js 15</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Esse é o framework frontend mais popular do mundo. E o
                    melhor, não é só front não - o Next.js é fullstack!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <SiReact className="w-8 h-8 text-[#61DAFB]" />
                </div>
                <div>
                  <span className="text-lg">React 19</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    React é a biblioteca frontend mais popular do mundo. Saber
                    front e não conhecer React não combina!
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <SiReact className="w-8 h-8 text-[#61DAFB]" />
                </div>
                <div>
                  <span className="text-lg">React Server Components</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    O novo paradigma React e Next.js. Você irá perceber como é
                    mais fácil (e performático) fazer as coisas no Next.js
                    usando componentes de servidor.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <FaServer className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="text-lg">Server Functions</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mutações de dados e interações com o servidor de forma
                    integrada ao React. Usando Server Functions você consegue um
                    código mais coeso e fácil de entender.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <SiTailwindcss className="w-8 h-8 text-[#06B6D4]" />
                </div>
                <div>
                  <span className="text-lg">TailwindCSS</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Framework CSS mais popular do mundo. Preciso falar mais
                    alguma coisa?
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <BsShield className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="text-lg">Shadcn/UI</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Coleção de componentes reutilizáveis construídos com Radix
                    UI e Tailwind CSS. E o melhor - componentes que moram no seu
                    projeto.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <SiTypescript className="w-8 h-8 text-[#3178C6]" />
                </div>
                <div>
                  <span className="text-lg">Typescript</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Desenvolva confiança usando Typescript. Aplicações mais
                    confiáveis e com menos bugs. Ideal para manter projetos
                    escaláveis.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <SiPrisma className="w-8 h-8 text-[#2D3748]" />
                </div>
                <div>
                  <span className="text-lg">Prisma</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    ORM moderno que simplifica o acesso ao banco de dados com
                    type safety e autocompletar inteligente.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-800/80 rounded-xl shadow p-5 transition hover:bg-gray-700/80">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-gray-100 dark:bg-gray-800 shadow-sm">
                  <FaLock className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                </div>
                <div>
                  <span className="text-lg">NextAuth (Auth.js)</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    O NextAuth (ou Auth.js) é a biblioteca mais popular de
                    autenticação para o Next.js. Totalmente integrado aos Server
                    Actions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <header>
            <h2 className="text-4xl font-bold mb-6">Estrutura do Curso</h2>
          </header>
          <ul className="max-w-3xl mx-auto text-left space-y-4 text-lg">
            <li>
              <span className="font-semibold text-amber-400">Módulo 1:</span>{" "}
              Introdução ao Next.js e configuração do ambiente
            </li>
            <li>
              <span className="font-semibold text-amber-400">Módulo 2:</span>{" "}
              Fundamentos do React e Server Components
            </li>
            <li>
              <span className="font-semibold text-amber-400">Módulo 3:</span>{" "}
              Roteamento, páginas e layouts dinâmicos
            </li>
            <li>
              <span className="font-semibold text-amber-400">Módulo 4:</span>{" "}
              Integração com banco de dados e autenticação
            </li>
            <li>
              <span className="font-semibold text-amber-400">Módulo 5:</span>{" "}
              Deploy, boas práticas e próximos passos
            </li>
          </ul>
        </section>

        <section
          id="testimonials"
          className="container flex justify-center w-full mt-32"
        >
          <div className="mt-10 flex flex-col items-center mb-10 justify-center ">
            <div className="relative w-full">
              <BlurRevealText
                element="h1"
                className="mb-8 text-4xl sm:text-5xl font-lexend max-w-2xl mt-10"
              >
                Veja alguns depoimentos da nossa comunidade
              </BlurRevealText>
            </div>

            <motion.section
              className="rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-10 gap-5 w-full mt-8"
              initial={{ x: 2 }}
            >
              {featuredTestimonials.map((testimonial, index) => {
                return (
                  <TestimonialCard
                    wide={[2, 4].includes(index)}
                    key={index}
                    testimonial={testimonial.body}
                    avatarUrl={testimonial.avatar_url}
                    name={testimonial.name}
                    socialMediaProfileName={testimonial.social_media_nickname}
                    socialMediaProfileUrl={testimonial.social_media_link}
                  />
                );
              })}
            </motion.section>
          </div>
        </section>
      </main>
    </div>
  );
}
