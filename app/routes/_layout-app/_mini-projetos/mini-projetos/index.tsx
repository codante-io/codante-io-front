import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import { getChallenges } from "~/lib/models/challenge.server";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";

import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { metaV1 } from "@remix-run/v1-meta";
import { NewButton } from "~/components/ui/new-button";

export function meta(args: any) {
  const title = "Mini Projetos | Codante.io";
  const description =
    "Mini Projetos de programação para você aprender praticando. Escolha um Mini Projeto para você se desafiar e aprender ainda mais.";
  const imageUrl = getOgGeneratorUrl("Mini Projetos");

  return metaV1(args, {
    title: title,
    description: description,
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "og:type": "website",
    "og:url": `https://codante.io/mini-projetos`,

    "twitter:card": "summary_large_image",
    "twitter:domain": "codante.io",
    "twitter:url": `https://codante.io/mini-projetos`,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
    "twitter:image:alt": "Mini Projetos Codante",
  });
}

export async function loader({ request }: { request: Request }) {
  return json({
    challenges: await getChallenges(request),
  });
}

// export function headers() {
//   return {
//     "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
//   };
// }

export default function Projects() {
  const { challenges } = useLoaderData<typeof loader>();

  // const featuredChallenge = challenges.find(
  //   (challenge) => challenge.is_weekly_featured === true,
  // );
  const featuredChallenge = null;

  // const challengesWithoutFeatured = challenges.filter(
  //   (challenge) => challenge.is_weekly_featured !== true,
  // );

  return (
    <main className="container mx-auto">
      <h1 className="mb-10 text-3xl md:text-4xl text-center font-lexend">
        Mini Projetos
      </h1>

      {featuredChallenge && (
        <section
          className="md:relative md:h-[375px] lg:h-[350px] mb-32 mt-[80px] rounded-lg  p-10 md:pl-[380px] border-[1.5px] border-brand bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-700 to-indigo-900 md:flex justify-center items-center flex-col
        "
        >
          <div className="flex-col">
            <h3 className="font-light text-yellow-400 ">
              Mini Projeto em destaque
            </h3>
            <h1 className="text-2xl font-bold text-white ">
              {featuredChallenge.name}
            </h1>
            <p className="mt-3 text-gray-100 font-extralight md:text-sm lg:text-base">
              Participe do Mini Projeto da semana com a gente. Toda semana um
              novo Mini Projeto que será resolvido oficialmente pela equipe do
              Codante.
            </p>
            <p className="mt-4 text-sm ">
              <span className="inline-flex items-center gap-1 text-brand-200 dark:text-brand-200">
                <CalendarDaysIcon className="inline w-4 h-4 " />
                Resolução:
                <strong className="text-white dark:text-white ">
                  {new Date(
                    Date.parse(
                      featuredChallenge.solution_publish_date as string,
                    ),
                  ).toLocaleDateString("pt-BR", {
                    dateStyle: "short",
                  }) +
                    ", " +
                    new Date(
                      Date.parse(
                        featuredChallenge.solution_publish_date as string,
                      ),
                    ).toLocaleTimeString("pt-BR", {
                      timeStyle: "short",
                    })}
                </strong>
              </span>{" "}
            </p>

            <Countdown featuredChallenge={featuredChallenge} />
            <Link to={`/mini-projetos/${featuredChallenge.slug}`}>
              <NewButton
                type="button"
                className="hidden text-white bg-transparent border-2 border-yellow-400 md:block hover:bg-blue-600 "
              >
                Participe do Mini Projeto
              </NewButton>
            </Link>
          </div>

          <div className="flex justify-center md:absolute md:-top-[50px] md:left-10 md:shadow-xl rounded-2xl">
            <ChallengeCard
              className="shadow-[7px_7px_20px_0px_rgba(255,255,255,0.10)] dark:hover:shadow-[7px_7px_20px_0px_rgba(255,255,255,0.20)]"
              challenge={featuredChallenge}
            />
          </div>
        </section>
      )}

      <section className="mt-4 flex flex-col gap-20">
        {Object.keys(challenges).map((technologyName, index) => (
          <div key={technologyName}>
            <h2 className="mb-8 text-3xl">
              Projetos para aprender
              <span className="font-bold">{" " + technologyName}</span>
              {/* <CardItemMainTechnology
                technologyName={technologyName}
                technologyImgSrc={
                  challenges[technologyName][0].main_technology?.image_url
                }
              /> */}
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-min">
              {challenges[technologyName].map(
                (challenge: ChallengeCardType) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    className=""
                  />
                ),
              )}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

function Countdown({
  featuredChallenge,
}: {
  featuredChallenge: ChallengeCardType;
}) {
  const [remainingTime, setRemainingTime] = useState<null | number>(null);
  const [timerEnded, setTimerEnded] = useState(false);

  let days, hours, minutes, seconds;

  if (remainingTime) {
    days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
      .toString()
      .padStart(2, "0");
    minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    seconds = Math.floor((remainingTime % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
  }

  useEffect(() => {
    if (featuredChallenge && featuredChallenge.solution_publish_date) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance =
          new Date(
            featuredChallenge?.solution_publish_date as string,
          ).getTime() - now;
        setRemainingTime(distance);

        if (distance < 0) {
          clearInterval(intervalId);
          setTimerEnded(true);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [featuredChallenge]);

  if (!remainingTime)
    return (
      <p className="mt-2 mb-8 text-sm h-10">
        <span className="inline-flex items-center gap-1 text-brand-200 dark:text-brand-200 ">
          <ClockIcon className="inline w-4 h-4 " />
          Faltam:
        </span>
      </p>
    );
  // return (
  //   // {remainingTime && (
  // <strong className="text-white dark:text-white">
  //   {days === 0 ? "" : `${days} ${days === 1 ? "dia" : "dias"}, `}
  //   {hours}:{minutes}:{seconds}
  // </strong>
  // )

  return (
    <>
      <p className="mt-2 mb-8 text-sm h-10">
        {!timerEnded ? (
          <span className="inline-flex items-center gap-1 text-brand-200 dark:text-brand-200 ">
            <ClockIcon className="inline w-4 h-4 " />
            Faltam:
            <strong className="text-white dark:text-white">
              {days === 0 ? "" : `${days} ${days === 1 ? "dia" : "dias"}, `}
              {hours}:{minutes}:{seconds}
            </strong>
          </span>
        ) : (
          <strong className="inline-flex items-center gap-1 text-brand-200 dark:text-brand-200 text-md">
            Resolução será publicada em breve
          </strong>
        )}
      </p>
    </>
  );
}
