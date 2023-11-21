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
import WorkshopCard from "~/components/cards/workshop-card";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";
import VimeoPlayer from "~/components/vimeo-player";
import type { ChallengeCard as ChallengeCardType } from "~/models/challenge.server";
import { getHome } from "~/models/home.server";
import type { User } from "~/models/user.server";
import {
  freePlanDetails,
  freePlanFeatures,
  proPlanDetails,
  proPlanFeatures,
} from "~/components/cards/pricing/pricing-data";
import BannerAlert from "~/components/banner-alert";
import { MdLiveTv } from "react-icons/md";
import { useColorMode } from "~/contexts/color-mode-context";
import UserAvatar from "~/components/user-avatar";
import SubmissionCard from "./_layout-app/_mini-projetos/mini-projetos_.$slug_/components/submission-card";
import { useState } from "react";

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
        <Testimony />
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

  const participants = {
    avatars: [
      {
        avatar_url: "https://github.com/icaroharry.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/felipemuller20.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/robertotcestari.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/icaroharry.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/felipemuller20.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/robertotcestari.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/icaroharry.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/felipemuller20.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/robertotcestari.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/icaroharry.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/felipemuller20.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/robertotcestari.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/icaroharry.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/felipemuller20.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/robertotcestari.png",
        is_pro: true,
      },
      {
        avatar_url: "https://github.com/icaroharry.png",
        is_pro: true,
      },
    ],
  };

  return (
    <section id="headline" className="flex flex-col items-center w-full">
      <div className="container flex flex-col items-center">
        {/* Live Streaming Banner */}
        {homeInfo.live_streaming_workshop && (
          <BannerAlert
            bgColor="dark:bg-transparent bg-white"
            borderColor="border-red-500"
            className="w-full max-w-2xl mt-2 md:-mb-5"
          >
            <MdLiveTv className="w-10 h-10 mb-4 text-red-500 fill-current dark:text-red-300 md:mb-0 md:w-8 md:h-8 md:mr-6 md:block " />
            <div>
              <BannerAlert.Title
                textColor="dark:text-white text-gray-800"
                className="mb-3 text-center md:text-left md:mb-0"
              >
                Existe um workshop acontecendo ao vivo agora!
              </BannerAlert.Title>
              <BannerAlert.Subtitle textColor="dark:text-white text-gray-800 text-center md:text-left">
                Clique para assistir juntos o streaming do workshop:{" "}
                <Link
                  to={`/workshops/${homeInfo.live_streaming_workshop.slug}`}
                  className="underline"
                >
                  <b>{homeInfo.live_streaming_workshop.name}</b>
                </Link>
              </BannerAlert.Subtitle>
            </div>
          </BannerAlert>
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
      <div className="container flex mt-16 lg:mt-24 gap-6 lg:flex-row flex-col h-full">
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
                    <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg bg-gradient-to-r animate-bg from-amber-100 via-amber-200 to-amber-400">
                      <FaCrown className="mr-2 text-amber-400" /> Seja
                      <b className="ml-1">PRO</b>
                    </button>
                  </Link>
                )}

                {!user && (
                  <Link to="/login">
                    <button className="flex items-center px-4 py-2 text-gray-700 rounded-lg bg-background-200">
                      <BsFillPersonFill className="mr-2" color="#5282FF" />{" "}
                      Cadastre-se
                    </button>
                  </Link>
                )}
                <Link
                  to="https://discord.gg/fmVw468ZMR"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-lg animate-bg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
                >
                  <BsDiscord />
                  Entre na comunidade
                </Link>
              </>
            </div>
          </div>

          <div className="flex flex-col lg:self-auto self-center justify-between md:w-[28rem] lg:w-full bg-transparent h-full lg:h-28 xl:h-36 rounded-xl p-4 border-[1.5px] bg-background-200 dark:border-background-700 lg:mt-0 mt-16 lg:gap-0 gap-4">
            <h3 className="text-center lg:text-start font-inter dark:text-gray-300 text-gray-800 xl:text-base text-sm sm:text-base lg:text-xs">
              Junte-se à nossa comunidade de{" "}
              <b className="italic dark:text-brand-400 text-brand-500">
                1613 devs
              </b>{" "}
              que estão evoluindo suas habilidades de front-end.
            </h3>
            <section>
              <div className="flex lg:justify-start justify-center flex-wrap -space-x-3">
                {/* {currentUserIsEnrolled && (
                  <UserAvatar
                    avatarUrl={userAvatar}
                    className="w-16 h-16"
                    isPro={currentUserIsPro}
                  />
                )} */}
                {false
                  ? participants?.avatars
                      .filter((info) => info.avatar_url !== userAvatar)
                      .map((info, index) => (
                        <UserAvatar
                          key={index}
                          avatarUrl={info.avatar_url}
                          className="xl:w-9 xl:h-9 h-6 w-6"
                          isPro={info.is_pro}
                        />
                      ))
                  : participants?.avatars.map((info, index) => (
                      <UserAvatar
                        key={index}
                        avatarUrl={info.avatar_url}
                        className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                        isPro={info.is_pro}
                      />
                    ))}
              </div>
            </section>
          </div>
        </section>
        <div className="relative flex-1 basis-2/5">
          <VimeoPlayer vimeoUrl="https://player.vimeo.com/video/827298711" />
        </div>
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
      className="flex justify-center w-full text-gray-800 bg-transparent dark:text-gray-50 mt-16 lg:mt-24"
    >
      <div className="container mb-10 flex flex-col items-center justify-center border-t border-gray-300 dark:border-gray-700">
        <div className="relative">
          <h1 className="mt-14 mb-8 text-4xl font-light font-lexend text-center">
            Workshops
          </h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[85px] -z-10"
          />
        </div>
        <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-center w-full md:w-3/4">
          Aprenda de forma prática e objetiva com{" "}
          <span className="italic font-bold text-brand-400">workshops</span>{" "}
          ensinados por profissionais do mercado. Os workshops são gravados ao
          vivo e posteriormente editados e disponibilizados na plataforma.
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
  const { user } = useOutletContext<{ user: User }>();
  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  function sortByEnrolledUsersCount(challengesList: ChallengeCardType[]) {
    if (!challengesList) return [];
    return challengesList.sort(
      (a, b) => b.enrolled_users_count - a.enrolled_users_count,
    );
  }

  <div className="relative">
  <h1 className="mt-14 mb-8 text-4xl font-light font-lexend text-center">
    Workshops
  </h1>
  <img
    src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
    alt="Line stroke effect"
    className="absolute top-[85px] -z-10"
  />
</div>

  const orderedChallengeList = sortByEnrolledUsersCount(
    homeInfo.featured_challenges,
  );
  return (
    <section
      id="mini-projects"
      className="flex justify-center w-full"
    >
      <div className="container flex flex-col items-center w-full border-t border-gray-300 dark:border-gray-700 mt-10">
        <div className="relative">
          <h1 className="text-center mt-20 mb-8 text-4xl font-light font-lexend">
            Mini projetos
          </h1>
          <img
            src={`/img/pencil-stroke-subtitle-${colorMode}.svg`}
            alt="Line stroke effect"
            className="absolute top-[109px] -z-10"
          />
        </div>
        <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-center w-full md:w-3/4">
          O melhor jeito de aprender é praticando! Melhore suas skills fazendo{" "}
          <span className="italic font-bold text-brand-400">mini projetos</span>{" "}
          e depois assista a resolução feita por profissionais do mercado.
        </p>
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {orderedChallengeList.map((challenge) => (
            <div key={challenge.slug} className="mx-auto">
              <ChallengeCard loggedUser={user} challenge={challenge} />
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
  const submissions = [
    {
      id: 1132,
      user_name: "André Lucas",
      user_avatar_url: "https://avatars.githubusercontent.com/u/66281231?v=4",
      user_github_user: "andrelucca99",
      submission_url: "https://mp-lista-de-paises-next-liard.vercel.app/",
      fork_url: "https://github.com/andrelucca99/mp-lista-de-paises-next",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/66281231.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 1,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 884,
      user_name: "Wallace Barbosa",
      user_avatar_url: "https://avatars.githubusercontent.com/u/104037331?v=4",
      user_github_user: "WallaceMuylaert",
      submission_url: "https://mp-lista-de-paises-next-teal.vercel.app/",
      fork_url: "https://github.com/WallaceMuylaert/mp-lista-de-paises-next",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/104037331.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 1,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 732,
      user_name: "Marcus Evandro Galvão Boni",
      user_avatar_url: "https://avatars.githubusercontent.com/u/115600640?v=4",
      user_github_user: "Marcus-Boni",
      submission_url: "https://api-list-of-countries.vercel.app/",
      fork_url: "https://github.com/Marcus-Boni/API-List-of-Countries",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/115600640.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "rocket",
            count: 1,
          },
          {
            reaction: "like",
            count: 2,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 693,
      user_name: "Caio Silva",
      user_avatar_url: "https://avatars.githubusercontent.com/u/36521875?v=4",
      user_github_user: "bladellano",
      submission_url: "https://mp-lista-de-paises-next-chi.vercel.app/",
      fork_url: "https://github.com/bladellano/mp-lista-de-paises-next",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/36521875.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 2,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 712,
      user_name: "Joseph",
      user_avatar_url: "https://avatars.githubusercontent.com/u/49536612?v=4",
      user_github_user: "Khufos",
      submission_url:
        "https://mp-lista-de-paises-next-6b2f3gjq8-khufos.vercel.app/",
      fork_url: "https://github.com/Khufos/mp-lista-de-paises-next",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/49536612.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 2,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 700,
      user_name: "schmaiske",
      user_avatar_url: "https://avatars.githubusercontent.com/u/38104901?v=4",
      user_github_user: "schmaiske",
      submission_url: "https://lista-de-paises-two.vercel.app/",
      fork_url: "https://github.com/schmaiske/mp-lista-de-paises-next",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/38104901.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 4,
          },
          {
            reaction: "exploding-head",
            count: 1,
          },
          {
            reaction: "fire",
            count: 1,
          },
          {
            reaction: "rocket",
            count: 1,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 550,
      user_name: "THIAGO CREDICO",
      user_avatar_url: "https://avatars.githubusercontent.com/u/55001968?v=4",
      user_github_user: "thiagocredico",
      submission_url:
        "https://mp-lista-de-paises-next-thiagocredico.vercel.app/",
      fork_url: "https://github.com/thiagocredico/mp-lista-de-paises-next",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/55001968.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 6,
          },
          {
            reaction: "exploding-head",
            count: 2,
          },
          {
            reaction: "fire",
            count: 2,
          },
          {
            reaction: "rocket",
            count: 2,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 658,
      user_name: "Vinícius Teixeira",
      user_avatar_url: "https://avatars.githubusercontent.com/u/94622701?v=4",
      user_github_user: "tex008",
      submission_url:
        "https://lista-de-paises-next-imntmmhz8-tex008.vercel.app/",
      fork_url: "https://github.com/tex008/Lista-de-Paises-NextJS",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/94622701.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 3,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 627,
      user_name: "Igor Montezuma ",
      user_avatar_url: "https://avatars.githubusercontent.com/u/85948415?v=4",
      user_github_user: "IgorMontezuma20",
      submission_url: "https://lista-de-paises-nextjs.vercel.app/",
      fork_url: "https://github.com/IgorMontezuma20/mp-lista-de-paises-next",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/85948415.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 4,
          },
          {
            reaction: "exploding-head",
            count: 3,
          },
          {
            reaction: "fire",
            count: 3,
          },
          {
            reaction: "rocket",
            count: 3,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 642,
      user_name: "MaateusMDS",
      user_avatar_url: "https://avatars.githubusercontent.com/u/96087111?v=4",
      user_github_user: "MaateusMDS",
      submission_url: "https://codante-api-countries.vercel.app/",
      fork_url: "https://github.com/MaateusMDS/codante-api-countries",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/96087111.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 5,
          },
          {
            reaction: "exploding-head",
            count: 2,
          },
          {
            reaction: "fire",
            count: 2,
          },
          {
            reaction: "rocket",
            count: 2,
          },
        ],
        user_reactions: [],
      },
    },
    {
      id: 549,
      user_name: "sumoyama",
      user_avatar_url: "https://avatars.githubusercontent.com/u/75846766?v=4",
      user_github_user: "sumoyama",
      submission_url: "https://mp-lista-de-paises-next-gamma.vercel.app/",
      fork_url: "https://github.com/sumoyama/mp-lista-de-paises-next",
      is_pro: 0,
      submission_image_url:
        "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/75846766.png",
      reactions: {
        reaction_counts: [
          {
            reaction: "like",
            count: 5,
          },
          {
            reaction: "rocket",
            count: 3,
          },
          {
            reaction: "fire",
            count: 3,
          },
          {
            reaction: "exploding-head",
            count: 3,
          },
        ],
        user_reactions: [],
      },
    },
    // {
    //   id: 559,
    //   user_name: "Felipe Muller",
    //   user_avatar_url: "https://avatars.githubusercontent.com/u/78622334?v=4",
    //   user_github_user: "felipemuller20",
    //   submission_url: "https://paises-do-mundo-murex.vercel.app/",
    //   fork_url: "https://github.com/felipemuller20/mp-lista-de-paises-next",
    //   is_pro: 0,
    //   submission_image_url:
    //     "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/78622334.png",
    //   reactions: {
    //     reaction_counts: [
    //       {
    //         reaction: "like",
    //         count: 6,
    //       },
    //       {
    //         reaction: "exploding-head",
    //         count: 3,
    //       },
    //       {
    //         reaction: "fire",
    //         count: 3,
    //       },
    //       {
    //         reaction: "rocket",
    //         count: 3,
    //       },
    //     ],
    //     user_reactions: [],
    //   },
    // },
    // {
    //   id: 560,
    //   user_name: "Ícaro Harry",
    //   user_avatar_url: "https://avatars.githubusercontent.com/u/6475893?v=4",
    //   user_github_user: "icaroharry",
    //   submission_url:
    //     "https://mp-lista-de-paises-next-9elqot0sx-icaroharry.vercel.app/",
    //   fork_url: "https://github.com/icaroharry/mp-lista-de-paises-next",
    //   is_pro: 0,
    //   submission_image_url:
    //     "https://s3-sa-east-1.amazonaws.com/codante/challenges/lista-de-paises-next/6475893.png",
    //   reactions: {
    //     reaction_counts: [
    //       {
    //         reaction: "like",
    //         count: 6,
    //       },
    //     ],
    //     user_reactions: [],
    //   },
    // },
  ];

  return (
    <section id="community-submission" className="">
      <div className="max-w-[94vw] md:max-w-[98vw] flex flex-col items-center w-full overflow-hidden scrollbar-hide flex-shrink-0 scroll-auto border-t border-gray-300 dark:border-gray-700 mt-10">
        <h1 className="text-center mt-20 mb-4 text-4xl font-light font-lexend">
          Veja o que a nossa <span className="text-brand-500 text-bold">comunidade</span> está construindo
        </h1>
        <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-center w-full md:w-3/4">
          Essas são algumas submissões realizadas nos nossos Mini Projetos
        </p>
        <section className="flex gap-4 post-list mb-4">
          {submissions.map((submission, index) => (
            <SubmissionCard
              key={index}
              isHomePage
              submission={submission}
              user={{
                is_pro: submission.is_pro,
                avatar_url: submission.user_avatar_url,
                name: submission.user_name,
              }}
              showReactions={false}
              // reactions={submission.reactions}
              size="small"
              className="flex-shrink-0"
            />
          ))}
        </section>
        <section className="flex gap-4 scroll-auto post-list2 mb-20">
          {submissions.map((submission, index) => (
            <SubmissionCard
              isHomePage
              key={index}
              submission={submission}
              // submission={{
              //   submission_image_url: submission.submission_image_url,
              // }}
              // user={users}
              user={{
                is_pro: submission.is_pro,
                avatar_url: submission.user_avatar_url,
                name: submission.user_name,
              }}
              showReactions={false}
              // reactions={submission.reactions}
              size="small"
              className="flex-shrink-0"
            />
          ))}
        </section>
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

function Testimony() {
  const testimonials = [
    {
      testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      avatarUrl: "https://github.com/robertotcestari.png",
      name: "Roberto Cestari",
      socialMediaProfileName: "@robertotcestari",
      socialMediaProfileUrl: "https://www.linkedin.com/in/felipeavmuller",
    },
    {
      testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      avatarUrl: "https://github.com/icaroharry.png",
      name: "Icaro Harry",
      socialMediaProfileName: "@icaroharry",
      socialMediaProfileUrl: "https://www.linkedin.com/in/felipeavmuller",
    },
    {
      testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      avatarUrl: "https://github.com/felipemuller20.png",
      name: "Felipe Muller",
      socialMediaProfileName: "@felipemuller20",
      socialMediaProfileUrl: "https://www.linkedin.com/in/felipeavmuller",
    },
    {
      testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      avatarUrl: "https://github.com/robertotcestari.png",
      name: "Roberto Cestari",
      socialMediaProfileName: "@robertotcestari",
      socialMediaProfileUrl: "https://www.linkedin.com/in/felipeavmuller",
    },
    {
      testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      avatarUrl: "https://github.com/icaroharry.png",
      name: "Icaro Harry",
      socialMediaProfileName: "@icaroharry",
      socialMediaProfileUrl: "https://www.linkedin.com/in/felipeavmuller",
    },
    {
      testimony: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
      avatarUrl: "https://github.com/felipemuller20.png",
      name: "Felipe Muller",
      socialMediaProfileName: "@felipemuller20",
      socialMediaProfileUrl: "https://www.linkedin.com/in/felipeavmuller",
    },
  ]
  const [current, setCurrent] = useState(0);

  
  const nextSlide = () => {
    setCurrent((current + 1) % testimonials.length);
  };
  
  const prevSlide = () => {
    setCurrent(current === 0 ? testimonials.length - 1 : current - 1);
  };
  
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="flex justify-center w-full text-center mb-10">
      <div className="mt-10 container flex flex-col items-center mb-10 justify-center border-t border-gray-300 dark:border-gray-700">
        <h1 className="mt-16 text-3xl font-light font-lexend">
          Depoimentos
        </h1>
        <p className="mt-6 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-4xl">
          Veja o que estão falando sobre o Codante
        </p>
        <section className="flex gap-5 p-20 rounded-lg overflow-hidden">
          {
            testimonials.map((testimonial, index) => (
                <TestimonyCard
                  key={index}
                  testimony={testimonial.testimony}
                  avatarUrl={testimonial.avatarUrl}
                  name={testimonial.name}
                  socialMediaProfileName={testimonial.socialMediaProfileName}
                  socialMediaProfileUrl={testimonial.socialMediaProfileUrl}
                />
            ))
          }
        </section>
      </div>
    </section>
  );
}

function TestimonyCard({
  testimony, avatarUrl, name, socialMediaProfileName, socialMediaProfileUrl
} : {
  testimony: string,
  avatarUrl: string,
  name: string,
  socialMediaProfileName: string,
  socialMediaProfileUrl: string
}) {
  return (
    <article className="flex flex-col justify-between w-72 bg-background-50 h-80 dark:bg-background-800 p-5 text-sm rounded-xl border-[1.5px] border-background-200 dark:border-background-600
    hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg transition-shadow translate-x-2">
      <p className="text-start">{testimony}</p>
      <div className="flex items-center gap-5">
        <div>
          <img src={avatarUrl} alt="Avatar" className="w-10 rounded-full"/>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-brand-500 font-bold">{name}</h3>
          <a
            href={socialMediaProfileUrl}
            target="_blank"
            rel="noreferrer"
          >
            {socialMediaProfileName}
          </a>
          
        </div>
      </div>
    </article>
  )
}