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
        {/* <Testimony /> */}
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
                {`${avatarSection.user_count} devs`}
              </b>{" "}
              que estão evoluindo suas habilidades de front-end.
            </h3>
            <section>
              <div className="flex lg:justify-start justify-center flex-wrap -space-x-3">
                {user && (
                  <UserAvatar
                    avatarUrl={user.avatar_url}
                    className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                    isPro={user.is_pro}
                  />
                )}
                {
                  user ? (
                    avatarSection.avatars.slice(0, 15).map((info, index) => (
                      <UserAvatar
                        key={index}
                        avatarUrl={info.avatar_url}
                        className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                        isPro={info.is_pro}
                      />
                    ))
                  ) : (
                    avatarSection.avatars.map((info, index) => (
                      <UserAvatar
                        key={index}
                        avatarUrl={info.avatar_url}
                        className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                        isPro={info.is_pro}
                      />
                    ))
                  )
                }
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

  const orderedChallengeList = sortByEnrolledUsersCount(
    homeInfo.featured_challenges,
  );

  return (
    <section
      id="mini-projects"
      className="flex justify-center w-full"
    >
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
  const { homeInfo } = useLoaderData<typeof loader>();
  console.log(homeInfo.featured_submissions)

  const submissions = homeInfo.featured_submissions;

  return (
    <section id="community-submission" className="">
      <div className="max-w-[100vw] flex flex-col items-center w-full overflow-hidden scrollbar-hide flex-shrink-0 scroll-auto border-t border-gray-200 dark:border-gray-800 mt-10">
        <h1 className="mt-14 mb-8 text-4xl font-light font-lexend text-center">
          Veja o que a nossa <span className="text-brand-500 text-bold">comunidade</span> está construindo
        </h1>
        <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-center w-full md:w-3/4">
          Essas são algumas submissões realizadas nos nossos Mini Projetos
        </p>
        {/* <div className="w-full shadow-[10px_0_10px_yellow_inset,_-10px_0_10px_yellow_inset] overflow-hidden"> */}
        <section className="flex gap-4 upper-post-list mb-4">
          {submissions.slice(0, 10).map((submission, index) => (
            <SubmissionCard
              footerPadding="px-2 py-2"
              key={index}
              isHomePage
              submission={{
                submission_image_url: submission.submission_image_url,
                id: submission.id,
                slug: submission.challenge.slug,
              }}
              user={{
                is_pro: submission.user_avatar.is_pro,
                avatar_url: submission.user_avatar.avatar_url,
                name: submission.user_avatar.name,
              }}
              showReactions={false}
              size="small"
              className="flex-shrink-0"
            />
          ))}
        </section>
        <section className="flex gap-4 scroll-auto lower-post-list mb-20">
          {submissions.slice(10).map((submission, index) => (
            <SubmissionCard
              footerPadding="px-2 py-2"
              key={index}
              isHomePage
              submission={{
                submission_image_url: submission.submission_image_url,
                id: submission.id,
                slug: submission.challenge.slug,
              }}
              user={{
                is_pro: submission.user_avatar.is_pro,
                avatar_url: submission.user_avatar.avatar_url,
                name: submission.user_avatar.name,
              }}
              showReactions={false}
              size="small"
              className="flex-shrink-0"
            />
          ))}
        </section>
        </div>
      {/* </div> */}
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

  // return (
  //   <section className="flex justify-center w-full text-center mb-10">
  //     <div className="mt-10 container flex flex-col items-center mb-10 justify-center border-t border-gray-200 dark:border-gray-800">
  //       <h1 className="mt-16 text-3xl font-light font-lexend">
  //         Depoimentos
  //       </h1>
  //       <p className="mt-6 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-4xl">
  //         Veja o que estão falando sobre o Codante
  //       </p>
  //       <section className="flex gap-5 p-20 rounded-lg overflow-hidden">
  //         {
  //           testimonials.map((testimonial, index) => (
  //               <TestimonyCard
  //                 key={index}
  //                 testimony={testimonial.testimony}
  //                 avatarUrl={testimonial.avatarUrl}
  //                 name={testimonial.name}
  //                 socialMediaProfileName={testimonial.socialMediaProfileName}
  //                 socialMediaProfileUrl={testimonial.socialMediaProfileUrl}
  //               />
  //           ))
  //         }
  //       </section>
  //     </div>
  //   </section>
  // );
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