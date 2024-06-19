import { json } from "@remix-run/node";
import { Link, useLoaderData, useSearchParams } from "@remix-run/react";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import { getChallenges } from "~/lib/models/challenge.server";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";

import { CalendarDaysIcon, ClockIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { metaV1 } from "@remix-run/v1-meta";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils/cn";

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
  const technology = new URL(request.url).searchParams.get("tecnologia");

  return json({
    challenges: await getChallenges({ technology }, request),
  });
}

export default function Projects() {
  const { challenges } = useLoaderData<typeof loader>();
  const [selectedTech, setSelectedTech] = useState<string>();
  const [searchParams, setSearchParams] = useSearchParams();

  const featured = challenges.technologies.find(
    (challenge) => challenge.name === "featured",
  );

  const challengesByTechnologies = challenges.technologies.filter(
    (challenge) => challenge.name !== "featured",
  );

  const featuredChallenge =
    featured && featured.challenges.length > 0 ? featured.challenges[0] : null;

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedTech) {
      params.set("tecnologia", selectedTech);
      setSearchParams(params);
    } else {
      params.delete("tecnologia");
      setSearchParams(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTech]);

  const selectTech = (technology: string) => {
    setSelectedTech(selectedTech === technology ? undefined : technology);
  };

  return (
    <main className="container mx-auto">
      <h1 className="mb-10 text-3xl lg:text-4xl font-lexend text-center">
        Aprenda com nossos{" "}
        <span className="font-bold underline decoration-amber-400">
          Mini Projetos
        </span>
      </h1>

      {featuredChallenge && (
        <>
          <section className="md:relative md:h-[500px] lg:h-[500px] mb-32 mt-[80px] rounded-lg md:pl-[420px] border-[1.5px] border-brand bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-700 to-indigo-900 md:flex justify-center items-center flex-col">
            <div className="flex-col px-6 pt-6">
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
                <Button
                  type="button"
                  className="hidden text-white bg-transparent border-2 border-yellow-400 md:block hover:bg-blue-600 "
                >
                  Participe do Mini Projeto
                </Button>
              </Link>
            </div>

            <div className="flex justify-center md:absolute md:-top-[50px] md:left-10">
              <div className="w-96">
                <ChallengeCard
                  className="shadow-[7px_7px_20px_0px_rgba(255,255,255,0.10)] dark:hover:shadow-[7px_7px_20px_0px_rgba(255,255,255,0.20)]"
                  animatedBackground={false}
                  challenge={featuredChallenge}
                />
              </div>
            </div>
          </section>
          <div className="w-full h-[1px] dark:bg-gray-800 bg-gray-200 mb-24" />
        </>
      )}

      <section className="mb-8">
        <h2 className="my-4 text-lg lg:text-xl dark:text-gray-300">
          Tecnologias
        </h2>

        <ul className="flex gap-6 lg:gap-8 px-3">
          {challenges.filters.technologies.map((technology, index) => (
            <li
              key={technology.name}
              className={cn(
                "cursor-pointer relative block h-16 w-16 lg:h-20 lg:w-20",
              )}
              onClick={() => selectTech(technology.name)}
            >
              <article
                className={cn(
                  "group relative aspect-square border-[1.5px] border-gray-300 dark:border-background-700 rounded-2xl bg-background-50 dark:bg-background-800 shadow-sm hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg flex flex-col items-center justify-center transition-all duration-500",
                  selectedTech === technology.name &&
                    "border-amber-400 shadow-lg dark:border-background-600 dark:bg-background-700",
                )}
              >
                <img
                  src={technology.image_url}
                  alt={`Logo da tecnologia ${technology.name}`}
                  className="h-6 md:h-8 md m-4 track-image rounded-sm group-hover:scale-105 transition-transform duration-500"
                />
              </article>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-4 flex flex-col gap-20">
        {challengesByTechnologies.map((technology, index) => (
          <div key={technology.name}>
            <h2 className="my-4 lg:mb-8 text-2xl lg:text-3xl">
              Projetos para aprender
              <span
                className={cn("font-bold border-b-2 border-amber-400 ml-2")}
                style={{
                  borderColor: technology.challenges[0].main_technology?.color,
                }}
              >
                {technology.name}
              </span>
            </h2>

            <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-min">
              {technology.challenges.map((challenge: ChallengeCardType) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
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
