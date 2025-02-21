import { json } from "@remix-run/node";
import {
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useOutletContext,
  useRouteError,
} from "@remix-run/react";
import AppLayout from "~/components/_layouts/root-layout";
import BackgroundBlur from "~/components/_layouts/background-blur";
import { motion } from "framer-motion";
import AlertBanner from "~/components/ui/alert-banner";
import { getHome } from "~/lib/models/home.server";
import type { User } from "~/lib/models/user.server";
import UserAvatar from "~/components/ui/user-avatar";

import { useRef } from "react";
import { RiLiveLine } from "react-icons/ri";
import { ArrowRight, PencilRuler } from "lucide-react";
import { BlurReveal } from "~/components/ui/motion/blur-reveal";
import Sparkles from "~/components/ui/motion/sparkles";
import NotFound from "~/components/features/error-handling/not-found";
import { Error500 } from "~/components/features/error-handling/500";
import AvatarsSection from "~/routes/_landing-page/components/headline/avatars";
import Demo from "~/routes/_landing-page/components/headline/demo";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import { BlurRevealText } from "~/components/ui/motion/blur-reveal/text";
import CarouselSubmissionCard from "~/components/features/submission-card/carousel-submission-card";
import useLazyLoading from "~/lib/hooks/use-lazy-loading";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import DiscordButton from "~/components/features/auth/discord-button";
import { BsDiscord } from "react-icons/bs";
import TestimonialCard from "~/routes/_landing-page/components/testimonials/card";
import FreePricingCard from "~/components/ui/cards/pricing/free";
import YearlyPricingCard from "~/components/ui/cards/pricing/yearly";
import ProPricingCard from "~/components/ui/cards/pricing/pro";
import faqQuestions from "~/routes/_layout-app/_subscription/faq-questions";
import FaqItem from "~/components/ui/faq-item";
import SocialNetworksList from "~/routes/_landing-page/components/social-networks/list";
import RequirementsList from "~/routes/_landing-page/components/projects/requirements-list";
import Backend from "~/routes/_landing-page/components/projects/backend";
import Deploy from "~/routes/_landing-page/components/projects/deploy";
import CarouselWorkshops from "~/routes/_landing-page/components/workshops/carousel";

import CTAButtons from "~/routes/_landing-page/components/headline/cta-buttons";

export const loader = async () => {
  return json({
    homeInfo: await getHome(),
  });
};

export default function HomePage() {
  const { user } = useOutletContext<{ user: User }>();

  return (
    <AppLayout user={user}>
      <div className="flex flex-col items-center justify-center text-gray-900 dark:text-gray-50">
        <BackgroundBlur />
        <Headline />
        <Challenges />
        <Workshops />
        <Community />
        <Testimonials />
        <Pricing />
        <Faq />
        <SocialNetworks />
      </div>
    </AppLayout>
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

function Headline() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const { user } = useOutletContext<{ user: User }>();

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="headline"
      className="flex flex-col items-center w-full lg:min-h-[calc(100vh_-_68px)] md:mx-0 relative"
      ref={containerRef}
    >
      <div className="container w-full flex flex-col items-center mx-12">
        {/* Live Streaming Banner */}
        {homeInfo.live_streaming_workshop && (
          <AlertBanner
            type="streaming"
            title="Existe um workshop acontecendo ao vivo agora!"
            subtitle={
              <span>
                Clique para assistir juntos o streaming do workshop:{" "}
                <Link
                  to={`/workshops/${homeInfo.live_streaming_workshop.slug}`}
                  className="underline"
                >
                  <b>{homeInfo.live_streaming_workshop.name}</b>
                </Link>
              </span>
            }
            className="mt-2 md:-mb-5"
          />
        )}

        <BlurReveal className="flex flex-col items-start w-full gap-4">
          <h1 className="text-4xl sm:text-5xl text-start md:mt-10 font-lexend lg:text-6xl max-w-2xl">
            Domine o frontend <Sparkles soundEnabled>moderno</Sparkles>
          </h1>
          <h2 className="text-xl dark:text-gray-300 text-gray-800 font-light text-start font-lexend lg:text-xl max-w-xl">
            Conheça a plataforma open-source que vai te ajudar a aprender as
            principais tecnologias de forma prática e objetiva com{" "}
            <span className="inline-flex items-baseline gap-1 cursor-pointer group">
              <PencilRuler className="w-4 h-4 pt-1 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:text-amber-400" />
              mini projetos
            </span>{" "}
            e{" "}
            <span className="inline-flex items-baseline gap-1 cursor-pointer group">
              <RiLiveLine className="w-4 h-4 pt-1 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:text-brand-400" />
              workshops
            </span>
          </h2>

          <AvatarsSection
            user={user}
            avatars={homeInfo.avatar_section.avatars}
            userCount={homeInfo.avatar_section.user_count}
          />
          <CTAButtons />
        </BlurReveal>
      </div>

      <div className="hidden lg:block xl:w-5/6 lg:w-4/5 mx-auto 2xl:w-full">
        <Demo parentRef={containerRef} />
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

  const submissions = homeInfo.featured_submissions;
  const submissionCount = homeInfo.submission_count;

  return (
    <>
      <section id="mini-projects" className="flex justify-center w-full">
        <div className="container flex flex-col items-center w-full mt-24">
          <div className="relative w-full">
            <BlurRevealText
              element="h1"
              className="mb-8 text-4xl sm:text-5xl font-lexend max-w-xl mt-10"
            >
              Aprenda na prática com nossos{" "}
              <Sparkles color="yellow">Mini Projetos</Sparkles>
            </BlurRevealText>

            <BlurRevealText
              element="p"
              delay={0.4}
              className="max-w-2xl mt-6 text-gray-600 dark:text-gray-300"
            >
              Os mini projetos são uma maneira prática de aprender, colocando a
              mão na massa em desafios com requisitos próximos à realidade. É
              como se você estivesse trabalhando em uma empresa e recebesse uma
              tarefa para cumprir.
            </BlurRevealText>
          </div>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 auto-rows-min mt-24">
            {orderedChallengeList.map((challenge) => (
              <div key={challenge.slug} className="mx-auto">
                <ChallengeCard openInNewTab challenge={challenge} />
              </div>
            ))}
          </section>
          <section className="flex justify-center md:justify-end w-full mt-10 mb-10">
            <Link
              to="/mini-projetos"
              target="_blank"
              className="px-4 py-2 bg-white rounded-2xl dark:bg-background-800 flex items-center gap-2 text-gray-800 dark:text-gray-300 z-10 border-[1.5px] border-background-200 dark:border-background-600"
            >
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </section>

          <div className="relative w-full flex ">
            <BlurRevealText
              element="h1"
              className="text-gray-600 dark:text-gray-400 mt-10 font-cursive"
            >
              <div className="p-4 bg-background-100 dark:bg-background-800 rounded-2xl bg-grainy overflow-hidden">
                <span>Veja como funciona</span>
              </div>
            </BlurRevealText>
          </div>
          <div className="flex gap-8 mt-10 mb-10 flex-col lg:flex-row w-full">
            <div className="flex flex-col gap-4">
              <BlurRevealText
                element="h1"
                className="text-4xl font-lexend max-w-xl"
              >
                <span className="font-light text-lg">01.</span> Entenda os
                requisitos
              </BlurRevealText>
              <BlurRevealText
                element="p"
                delay={0.4}
                className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
              >
                Para cada projeto, fornecemos uma lista de requisitos, como se
                um cliente ou <i>product manager</i> tivesse solicitado.
              </BlurRevealText>
            </div>
            <div className="w-full flex justify-end sticky top-0">
              <RequirementsList />
            </div>
          </div>

          <div className="flex gap-16 mt-32 mb-10 flex-col-reverse lg:flex-row-reverse w-full">
            <div className="w-full p-4 bg-background-100 dark:bg-background-800 rounded-2xl">
              <iframe
                src={`https://embed.figma.com/design/iNxDzf5Ulqnf793IT3UkAK/%5BMini-projeto%5D-SaaS-com-Next.js-e-Stripe-(Community)?node-id=1-139&p=f&t=X94yb9i10LbJMJO8-0&theme=${colorMode}&embed-host=codante-lp`}
                allowFullScreen
                className="w-full h-[500px] rounded-xl"
              ></iframe>
            </div>
            <div className="flex flex-col gap-4">
              <BlurRevealText
                element="h1"
                className="text-4xl font-lexend max-w-xl"
              >
                <span className="font-light text-lg">02.</span> Siga o design
              </BlurRevealText>
              <BlurRevealText
                element="p"
                delay={0.4}
                className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
              >
                Também disponibilizamos designs completos no Figma, com cores,
                tipografia e componentes para você seguir, como se o time de
                design da empresa tivesse desenhado.
              </BlurRevealText>
            </div>
          </div>

          <div className="flex gap-12 mt-40 mb-10 px-4 flex-col lg:flex-row w-full">
            <div className="flex flex-col gap-4">
              <BlurRevealText
                element="h1"
                className="text-4xl font-lexend max-w-xl"
              >
                <span className="font-light text-lg">03.</span> Conecte com o
                backend
              </BlurRevealText>
              <BlurRevealText
                element="p"
                delay={0.4}
                className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
              >
                Conecte com{" "}
                <a
                  href="https://apis.codante.io"
                  target="_blank"
                  className="underline"
                >
                  nossas APIs
                </a>{" "}
                ou crie o seu próprio backend. Alguns de nossos projetos já
                possuem um backend pronto para você usar, em outros casos, você
                pode criar o seu próprio backend para treinar suas habilidades
                fullstack.
              </BlurRevealText>
            </div>
            <div className="w-full flex justify-end">
              <Backend />
            </div>
          </div>

          <div className="flex gap-16 mt-48 mb-10 px-4 flex-col-reverse lg:flex-row-reverse w-full">
            <div className="w-full flex justify-end">
              <Deploy />
            </div>
            <div className="flex flex-col gap-4">
              <BlurRevealText
                element="h1"
                className="text-4xl font-lexend max-w-xl"
              >
                <span className="font-light text-lg">04.</span> Faça o deploy
              </BlurRevealText>
              <BlurRevealText
                element="p"
                delay={0.4}
                className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
              >
                Faça o deploy de seu projeto no Vercel, Netlify ou qualquer
                outro serviço de hospedagem que você preferir. Essa etapa é
                muito importante para você poder compartilhar seu projeto e
                utilizá-lo no seu portfólio quando fizer sentido.
              </BlurRevealText>
            </div>
          </div>

          <div className="flex gap-16 mt-48 mb-10 px-4 w-full">
            <div className="flex flex-col gap-4">
              <BlurRevealText
                element="h1"
                className="text-4xl font-lexend max-w-xl"
              >
                <span className="font-light text-lg">05.</span> Submeta seu
                projeto
              </BlurRevealText>
              <BlurRevealText
                element="p"
                delay={0.4}
                className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
              >
                Envie a sua solução para aparecer na nossa galeria. Você pode
                ver a solução de outras pessoas, votar e trocar feedbacks. Já
                temos{" "}
                <b className=" inline-block dark:bg-background-700 bold border dark:border-background-600 bg-background-100 border-background-150 px-1 rotate-1 rounded-lg">
                  {`${submissionCount} resoluções`}
                </b>{" "}
                submetidas por nossos usuários.
              </BlurRevealText>
            </div>
          </div>
        </div>
      </section>
      <section id="community-submission" className="w-full max-w-[1920px]">
        <div className="flex flex-col items-center w-full overflow-hidden scrollbar-hide flex-shrink-0 scroll-auto mt-10">
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
      <section id="challenge-solution" className="flex justify-center w-full">
        <div className="container flex flex-col lg:flex-row items-center w-full mt-24">
          <div className="flex gap-8 mt-20 mb-10 px-4 flex-col-reverse lg:flex-row-reverse">
            <div className="w-full flex justify-end">
              <img
                src="img/landing-page/mp-player.webp"
                alt="Fundo gradiente com screenshot do player de vídeo do mini projeto"
                className="w-full shrink-0 grow-0 rounded-xl border-8 border-background-200 dark:border-background-800"
              />
            </div>
            <div className="flex flex-col gap-4">
              <BlurRevealText
                element="h1"
                className="text-4xl font-lexend max-w-xl"
              >
                <span className="font-light text-lg">06.</span> Assista nossa
                resolução oficial
              </BlurRevealText>
              <BlurRevealText
                element="p"
                delay={0.4}
                className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
              >
                Para quem gosta de uma explicação detalhada, disponibilizamos
                nossas resoluções oficiais em código e em vídeo. <br /> <br />
                Mas não deixe de tentar fazer sozinho! A gente não quer te
                prender a nossa resolução, mas queremos te ajudar a aprender.
              </BlurRevealText>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Workshops() {
  const { homeInfo } = useLoaderData<typeof loader>();

  useLazyLoading();

  return (
    <section id="workshops" className="flex justify-center w-full">
      <div className="container flex flex-col items-center w-full mt-48">
        <div className="relative w-full">
          <BlurRevealText
            element="h1"
            className="mb-8 text-4xl sm:text-5xl font-lexend max-w-xl mt-10"
          >
            Mantenha-se atualizado com nossos{" "}
            <Sparkles color="blue">Workshops</Sparkles>
          </BlurRevealText>

          <BlurRevealText
            element="p"
            delay={0.4}
            className="max-w-2xl mt-6 text-gray-600 dark:text-gray-300"
          >
            Os workshops são aulas completas sobre temas específicos dentro do
            frontend. Quando você quiser começar com uma tecnologia nova ou
            aprender mais sobre a teoria de algo que você já conhece, os
            workshops vão te ajudar.
          </BlurRevealText>
        </div>
        <section className="grid justify-center w-full grid-cols-1 gap-4 px-0 md:grid-cols-2 lg:grid-cols-3 mt-16">
          {homeInfo?.featured_workshops?.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </section>
        <section className="flex justify-center md:justify-end w-full mt-10 mb-10">
          <Link
            to="/workshops"
            target="_blank"
            className="px-4 py-2 bg-white rounded-2xl dark:bg-background-800 flex items-center gap-2 text-gray-800 dark:text-gray-300 z-10 border-[1.5px] border-background-200 dark:border-background-600"
          >
            Ver todos <ArrowRight className="w-4 h-4" />
          </Link>
        </section>

        <div className="relative w-full flex ">
          <BlurRevealText
            element="h1"
            className="text-gray-600 dark:text-gray-400 mt-10 font-cursive"
          >
            <div className="p-4 bg-background-100 dark:bg-background-800 rounded-2xl bg-grainy overflow-hidden w-full md:w-auto">
              <span>Veja como funciona</span>
            </div>
          </BlurRevealText>
        </div>
        <div className="flex gap-8 mt-10 mb-10 px-4 flex-col lg:flex-row w-full">
          <div className="flex flex-col gap-4">
            <BlurRevealText
              element="h1"
              className="text-4xl font-lexend max-w-xl"
            >
              Foco na qualidade
            </BlurRevealText>
            <BlurRevealText
              element="p"
              delay={0.4}
              className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
            >
              Os workshops são transmitidos ao vivo para nossa comunidade,
              depois editamos e disponibilizamos aqui na plataforma, tudo em 4k.
              As transmissões são feitas direto do nosso estúdio em Ribeirão
              Preto - SP.
            </BlurRevealText>
          </div>
          <div className="w-full flex justify-end">
            <CarouselWorkshops />
          </div>
        </div>

        <div className="flex gap-16 mt-10 mb-10 px-4 flex-col-reverse lg:flex-row-reverse">
          <div className="w-full">
            <img
              src="img/landing-page/practice.webp"
              alt="Fundo gradiente com screenshot de uma aula do workshop de Tailwind CSS"
              className="w-full shrink-0 grow-0 rounded-xl border-8 border-background-200 dark:border-background-800"
            />
          </div>
          <div className="flex flex-col gap-4">
            <BlurRevealText
              element="h1"
              className="text-4xl font-lexend max-w-xl"
            >
              Teoria e prática
            </BlurRevealText>
            <BlurRevealText
              element="p"
              delay={0.4}
              className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
            >
              Nos workshops, entramos nas partes teóricas, mas ainda focando no
              aprendizado de forma prática, com muitos exercícios.
            </BlurRevealText>
          </div>
        </div>

        <div className="flex gap-8 mt-40 mb-10 px-4 flex-col lg:flex-row">
          <div className="flex flex-col gap-4">
            <BlurRevealText
              element="h1"
              className="text-4xl font-lexend max-w-xl"
            >
              Ganhe um certificado
            </BlurRevealText>
            <BlurRevealText
              element="p"
              delay={0.4}
              className="max-w-2xl mt-4 text-gray-600 dark:text-gray-300"
            >
              Ao finalizar um workshop pela nossa plataforma, os nossos usuários{" "}
              <ProSpanWrapper>PRO</ProSpanWrapper> ganham um certificado de
              conclusão.
            </BlurRevealText>
          </div>

          <div className="w-full">
            <motion.img
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.8 }}
              src="img/landing-page/certificate.webp"
              alt="Fundo gradiente com screenshot da tela de mini projetos"
              className="w-full shrink-0 grow-0 rounded-xl border-8 border-background-200 dark:border-background-800"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Community() {
  const { homeInfo } = useLoaderData<typeof loader>();

  const avatarSection = homeInfo.avatar_section;

  return (
    <section id="community" className="flex justify-center w-full">
      <div className="container flex flex-col items-center w-full mt-48">
        <div className="relative w-full">
          <BlurRevealText
            element="h1"
            className="mb-8 text-4xl sm:text-5xl font-lexend max-w-xl mt-10"
          >
            Faça parte de uma comunidade de devs
          </BlurRevealText>

          <BlurRevealText
            element="p"
            delay={0.4}
            className="max-w-2xl mt-6 text-gray-600 dark:text-gray-300"
          >
            Quem caminha em grupo vai mais longe! Por isso, nos esforçamos para
            manter uma comunidade de devs que se ajudam mutuamente e tratem com
            respeito todas as pessoas.
          </BlurRevealText>

          <BlurRevealText
            element="p"
            delay={0.4}
            className="max-w-2xl mt-6 text-gray-600 dark:text-gray-300"
          >
            Já somos{" "}
            <b className="rotate-2 inline-block dark:bg-background-700 bold border dark:border-background-600 bg-background-100 border-background-150 px-2 rounded-lg">
              {`${avatarSection.user_count} devs`}
            </b>{" "}
            evoluindo nossas habilidades de front-end.
          </BlurRevealText>
          <BlurRevealText element="div" delay={0.4} className="mt-10">
            <DiscordButton className="mt-10">
              <>
                <BsDiscord className="w-4 h-4 mr-2" />
                <span>Entre no nosso Discord</span>
              </>
            </DiscordButton>
          </BlurRevealText>
        </div>

        <section className="mt-20 mb-10 w-full">
          <div className="flex flex-wrap -space-x-3">
            {avatarSection.avatars.map((avatar, index) => (
              <UserAvatar
                key={index}
                avatar={avatar}
                className="xl:w-20 xl:h-20 lg:h-20 lg:w-20 w-16 h-16"
              />
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}

function Testimonials() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const featuredTestimonials = homeInfo.featured_testimonials;

  return (
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
  );
}

function Pricing() {
  return (
    <section
      id="pricing"
      className="flex justify-center w-full -mb-10 text-gray-800 dark:text-gray-50 mt-40"
    >
      <div className="container flex flex-col">
        <div className="relative w-full">
          <BlurRevealText
            element="h1"
            className="mb-8 text-4xl sm:text-5xl font-lexend max-w-2xl mt-10"
          >
            Domine o frontend moderno com o Codante{" "}
            <span className="text-white font-semibold dark:text-gray-900 text-4xl px-[3px] py-[2px] rounded bg-amber-400">
              PRO
            </span>
          </BlurRevealText>

          <BlurRevealText
            element="p"
            delay={0.4}
            className="max-w-2xl mt-6 text-gray-600 dark:text-gray-300"
          >
            Tenha acesso completo a todos os nossos{" "}
            <span className="font-bold">workshops</span> e{" "}
            <span className="font-bold">mini projetos</span>, além de poder
            receber certificados e participar dos nossos canais exclusivos para
            membros PRO no Discord.
          </BlurRevealText>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-8 mt-10 mb-20 lg:flex-row text-start flex-wrap">
          <FreePricingCard />
          <YearlyPricingCard />
          <ProPricingCard />
        </section>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="flex justify-center w-full mt-40">
      <div className="container flex flex-col items-center">
        <div className="relative w-full">
          <BlurRevealText
            element="h1"
            className="mb-8 text-4xl sm:text-5xl font-lexend max-w-2xl mt-10"
          >
            Tem alguma dúvida?
          </BlurRevealText>
          <BlurRevealText
            element="p"
            delay={0.4}
            className="max-w-2xl mt-6 text-gray-600 dark:text-gray-300"
          >
            Aqui você encontra respostas para as perguntas mais frequentes sobre
            o Codante.
          </BlurRevealText>
        </div>
        <section className="mt-14 flex flex-col items-start w-full">
          {faqQuestions.map((question, index) => (
            <FaqItem
              key={index}
              question={question.question}
              answer={question.answer}
              className="mx-0 lg:mx-0 xl:mx-0 2xl:mx-0 w-full lg:w-[70%]"
            />
          ))}
        </section>
      </div>
    </section>
  );
}

function SocialNetworks() {
  return (
    <section
      id="social-networks"
      className="flex justify-center w-full mt-40 mb-20"
    >
      <div className="container flex flex-col items-center">
        <div className="relative w-full">
          <BlurRevealText
            element="h1"
            className="mb-8 text-4xl sm:text-5xl font-lexend max-w-2xl mt-10"
          >
            Ajude nossa comunidade a crescer
          </BlurRevealText>
          <BlurRevealText
            element="p"
            delay={0.4}
            className="max-w-2xl mt-6 text-gray-600 dark:text-gray-300"
          >
            Siga nossas redes sociais e ajude a divulgar o Codante para nos
            ajudar a espalhar o conhecimento.
          </BlurRevealText>
        </div>

        <SocialNetworksList />
      </div>
    </section>
  );
}
