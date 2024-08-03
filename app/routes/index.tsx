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
import BackgroundBlur from "~/components/_layouts/background-blur";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import { getHome } from "~/lib/models/home.server";
import type { User } from "~/lib/models/user.server";

import { useColorMode } from "~/lib/contexts/color-mode-context";
import UserAvatar from "~/components/ui/user-avatar";
import { motion } from "framer-motion";
import DiscordButton from "~/components/features/auth/discord-button";
import { buttonVariants } from "~/components/ui/button";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import { cn } from "~/lib/utils";
import CarouselSubmissionCard from "../components/features/submission-card/carousel-submission-card";
import AlertBanner from "~/components/ui/alert-banner";
import useLazyLoading from "~/lib/hooks/use-lazy-loading";
import AlertBannerPortal from "~/components/ui/alert-banner-portal";
import ProPricingCard from "~/components/ui/cards/pricing/pro";
import FreePricingCard from "~/components/ui/cards/pricing/free";

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
        <WorkShops />
        <Challenges />
        <Submissions />
        <Testimonial />
        <Pricing />
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
  const { colorMode } = useColorMode();
  const { user } = useOutletContext<{ user: User }>();

  const avatarSection = homeInfo.avatar_section;

  return (
    <section
      id="headline"
      className="flex flex-col items-center w-full lg:min-h-[calc(100vh_-_68px)]"
    >
      <AlertBannerPortal
        icon={
          <div className="w-10 h-10 mb-4 md:mb-0 md:w-8 md:h-8 md:mr-6 md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <mask id="circleFlagsOlympics0">
                <circle cx="256" cy="256" r="256" fill="#fff" />
              </mask>
              <g mask="url(#circleFlagsOlympics0)">
                <path fill="#eee" d="M0 0h512v512H0z" />
                <path
                  fill="#338af3"
                  d="M109.6 153.1A71.8 71.8 0 0 0 38 224.7a71.8 71.8 0 0 0 71.6 71.6a71.8 71.8 0 0 0 71.6-71.6a71.8 71.8 0 0 0-71.6-71.6m0 20c28.6 0 51.6 23 51.6 51.6s-23 51.6-51.6 51.6s-51.6-23-51.6-51.6s23-51.6 51.6-51.6"
                />
                <path
                  fill="#333"
                  d="M256 153.1a71.8 71.8 0 0 0-71.6 71.6a71.8 71.8 0 0 0 71.6 71.6a71.8 71.8 0 0 0 71.6-71.6a71.8 71.8 0 0 0-71.6-71.6m0 20c28.6 0 51.6 23 51.6 51.6s-23 51.6-51.6 51.6s-51.6-23-51.6-51.6s23-51.6 51.6-51.6"
                />
                <path
                  fill="#d80027"
                  d="M402.4 153.1a71.8 71.8 0 0 0-71.6 71.6a71.8 71.8 0 0 0 71.6 71.6a71.8 71.8 0 0 0 71.6-71.6a71.8 71.8 0 0 0-71.6-71.6m0 20c28.6 0 51.6 23 51.6 51.6s-23 51.6-51.6 51.6s-51.6-23-51.6-51.6s23-51.6 51.6-51.6"
                />
                <path
                  fill="#ffda44"
                  d="M182.8 215.7a71.8 71.8 0 0 0-71.6 71.6a71.8 71.8 0 0 0 71.6 71.6a71.8 71.8 0 0 0 71.6-71.6a71.8 71.8 0 0 0-71.6-71.6m0 20c28.6 0 51.6 23 51.6 51.6s-23 51.6-51.6 51.6s-51.6-23-51.6-51.6s23-51.6 51.6-51.6"
                />
                <path
                  fill="#6da544"
                  d="M329.2 215.7a71.8 71.8 0 0 0-71.6 71.6a71.8 71.8 0 0 0 71.6 71.6a71.8 71.8 0 0 0 71.6-71.6a71.8 71.8 0 0 0-71.6-71.6m0 20c28.6 0 51.6 23 51.6 51.6s-23 51.6-51.6 51.6s-51.6-23-51.6-51.6s23-51.6 51.6-51.6"
                />
                <path
                  fill="#338af3"
                  d="m166.9 181.7l-16 12a51.5 51.5 0 0 1 0 61.9l16 12a71.6 71.6 0 0 0 0-85.9"
                />
                <path
                  fill="#333"
                  d="m313.3 181.7l-16 12a51.5 51.5 0 0 1 0 61.9l16 12a71.6 71.6 0 0 0 0-85.9M225 266l-12 16a71.7 71.7 0 0 0 43 14.3v-20a51.5 51.5 0 0 1-31-10.3"
                />
                <path
                  fill="#d80027"
                  d="m371.4 266l-12 16a71.7 71.7 0 0 0 43 14.3v-20a51.5 51.5 0 0 1-31-10.3"
                />
              </g>
            </svg>
          </div>
        }
        position="bottom"
        title={<h1>Hackathon Olimpíadas de Paris 2024 </h1>}
        subtitle={
          <p>
            Participe gratuitamente e concorra a prêmios.{" "}
            <Link
              to="/mini-projetos/hackathon-olimpiadas"
              className="font-bold underline"
            >
              Acesse aqui.
            </Link>
          </p>
        }
      />
      <div className="container flex flex-col items-center">
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

        <h1 className="text-5xl font-light text-center md:mt-10 font-lexend lg:text-7xl">
          Evolua na programação <br />
          <span className="relative pr-4 px-6 font-bold text-transparent animate-bg bg-gradient-to-r dark:from-blue-200 dark:to-blue-500 from-blue-500 via-indigo-500 to-blue-900 bg-clip-text">
            front-end
            <img
              src={`/img/pencil-stroke-${colorMode}.webp`}
              alt="Line stroke effect"
              className="absolute top-[55%] md:top-[55%] md:h-10 h-6 left-6 w-full md:left-10 -z-10"
            />
          </span>
        </h1>
      </div>
      <div className="mb-16 container flex mt-16 lg:mt-24 gap-6 lg:flex-row flex-col h-full">
        <section className="flex flex-col basis-2/5 lg:pr-10 justify-between">
          <div>
            <p className="font-light text-center lg:text-start font-inter text-lg">
              Nossos <span className="italic font-bold">Workshops</span> e{" "}
              <span className="italic font-bold">Mini Projetos</span> juntam
              teoria e prática para criar uma experiência{" "}
              <span className="italic">única</span> de aprendizagem.
            </p>

            <div className="flex flex-wrap w-full justify-center gap-4 mt-4 lg:justify-start flex-row lg:text-sm">
              <>
                {user && !user.is_pro && (
                  <Link to="/assine">
                    <button
                      className={`${buttonVariants({
                        size: "sm",
                        variant: "pro",
                      })}
                    flex items-center px-4 py-2 rounded-lg`}
                    >
                      <FaCrown className="mr-2 text-amber-400" /> Seja
                      <b className="ml-1">PRO</b>
                    </button>
                  </Link>
                )}

                {!user && (
                  <Link to={`/login`}>
                    <button
                      className={`${buttonVariants({
                        size: "sm",
                        variant: "register",
                      })}
                    flex items-center px-4 py-2 text-gray-700 rounded-lg bg-background-200`}
                    >
                      <BsFillPersonFill className="mr-2" color="#5282FF" />{" "}
                      Cadastre-se
                    </button>
                  </Link>
                )}
                {user ? (
                  <DiscordButton>
                    <BsDiscord className="mr-2" />
                    Entre na Comunidade
                  </DiscordButton>
                ) : (
                  <Link
                    to="https://discord.gg/fmVw468ZMR"
                    target="_blank"
                    rel="noreferrer"
                    className={`${buttonVariants({
                      size: "sm",
                    })} flex items-center gap-2 px-4 py-2 text-white rounded-lg animate-bg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700`}
                  >
                    <BsDiscord />
                    Entre na comunidade
                  </Link>
                )}
              </>
            </div>
          </div>

          <div className="flex flex-col lg:self-auto self-center justify-between md:w-[28rem] lg:w-full bg-transparent h-full lg:h-28 xl:h-36 rounded-xl p-4 border-[1.5px] bg-background-200 dark:border-background-700 lg:mt-0 mt-16 lg:gap-0 gap-4">
            <h3 className="text-center lg:text-start font-inter dark:text-gray-300 text-gray-800 xl:text-base text-sm sm:text-base lg:text-xs">
              Junte-se à nossa comunidade de{" "}
              <b className="italic dark:text-brand-400 text-brand-500">
                {`${avatarSection.user_count} devs`}
              </b>{" "}
              que estão evoluindo suas habilidades de front-end.
            </h3>
            <section>
              <div className="flex lg:justify-start justify-center flex-wrap -space-x-3">
                {user && (
                  <UserAvatar
                    avatar={user.avatar}
                    className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                  />
                )}
                {user
                  ? avatarSection.avatars
                      .filter(
                        (avatar) =>
                          avatar.avatar_url !== user.avatar.avatar_url,
                      )
                      .slice(0, 15)
                      .map((avatar, index) => (
                        <UserAvatar
                          key={index}
                          avatar={avatar}
                          className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                        />
                      ))
                  : avatarSection.avatars.map((avatar, index) => (
                      <UserAvatar
                        key={index}
                        avatar={avatar}
                        className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                      />
                    ))}
              </div>
            </section>
          </div>
        </section>
        <div className="relative flex-1 basis-2/5">
          <VimeoPlayer
            thumbnailURL="https://codante.s3.amazonaws.com/img/homepage/homevideoposter.avif"
            vimeoUrl="https://player.vimeo.com/video/827298711"
            showPlayIcon={false}
            thumbnailOpacity={false}
          />
        </div>
      </div>
    </section>
  );
}

function WorkShops() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  useLazyLoading();

  return (
    <section
      id="workshops"
      className="flex justify-center w-full text-gray-800 bg-transparent dark:text-gray-50"
    >
      <div className="container flex flex-col  overflow-hidden items-center justify-center border-t border-gray-200 dark:border-gray-800 mb-10">
        <div className="relative w-full">
          <h1 className="mt-14 mb-8 text-4xl font-light font-lexend text-center">
            Workshops
          </h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[83px] w-64 left-1/2 transform -translate-x-1/2 -z-10"
          />
          <img
            src={`/img/blue-smoke.svg`}
            alt="Smoke effect"
            className="absolute top-0 w-full left-1/2 transform translate-x-[-50%]"
          />
        </div>
        <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-center w-full md:w-3/4">
          Aprenda de forma prática e objetiva com{" "}
          <span className="italic font-bold text-brand-400">workshops</span>{" "}
          ensinados por profissionais do mercado. Os workshops são gravados ao
          vivo e posteriormente editados e disponibilizados na plataforma.
        </p>
        <section className="grid justify-center w-full grid-cols-1 gap-4 px-0 md:grid-cols-2 lg:grid-cols-3">
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
          <h1 className="mt-14 mb-8 text-4xl font-light font-lexend text-center">
            Mini projetos
          </h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[83px] w-64 left-1/2 transform -translate-x-1/2 -z-10"
          />
          <img
            src={`/img/yellow-smoke.svg`}
            alt="Smoke effect"
            className="absolute top-0 w-full left-1/2 transform -translate-x-1/2"
          />
        </div>
        <p className="mt-2 mb-16 font-light font-inter text-md md:text-xl text-center w-full md:w-3/4">
          O melhor jeito de aprender é praticando! Melhore suas skills fazendo{" "}
          <span className="italic font-bold text-brand-400">mini projetos</span>{" "}
          e depois assista a resolução feita por profissionais do mercado.
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

function Submissions() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const submissions = homeInfo.featured_submissions;

  return (
    <section id="community-submission" className="w-full max-w-[1920px]">
      <div className="flex flex-col items-center w-full overflow-hidden scrollbar-hide flex-shrink-0 scroll-auto border-t border-gray-200 dark:border-gray-800 mt-10">
        <h1 className="mt-14 mb-8 text-4xl font-light font-lexend text-center">
          Veja o que a nossa{" "}
          <span className="text-brand-500 text-bold">comunidade</span> está
          construindo
        </h1>
        <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-center w-full md:w-3/4">
          Essas são algumas submissões realizadas nos nossos Mini Projetos
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
          <FreePricingCard />
          <ProPricingCard />
        </section>
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
