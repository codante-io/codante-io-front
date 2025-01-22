import { Link } from "@remix-run/react";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";

type FeaturedChallengeSectionProps = {
  featuredChallenge?: ChallengeCardType;
};

export default function FeaturedChallengeSection({
  featuredChallenge,
}: FeaturedChallengeSectionProps) {
  if (!featuredChallenge) return null;
  return (
    <>
      <section className="md:relative py-8 mb-20 md:mb-32 mt-[80px] rounded-lg md:pl-[420px] border-[1.5px] border-brand bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-sky-700 to-indigo-900 md:flex justify-center items-center flex-col">
        <div className="flex-col px-6">
          <h3 className="font-cursive text-yellow-400 ">
            Mini Projeto em destaque
          </h3>
          <h1 className="text-2xl font-bold text-white ">
            {featuredChallenge.name}
          </h1>
          <p className="mt-3 text-gray-100 font-extralight md:text-sm lg:text-base">
            Participe do Mini Projeto da semana com a gente. Toda semana um novo
            Mini Projeto que será resolvido oficialmente pela equipe do Codante.
          </p>
          <p className="mt-4 text-sm ">
            <span className="inline-flex items-center gap-1 text-brand-200 dark:text-brand-200">
              <CalendarDaysIcon className="inline w-4 h-4 " />
              Resolução:
              <strong className="text-white dark:text-white ">
                {new Date(
                  Date.parse(featuredChallenge.solution_publish_date as string),
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
              className="hidden text-white bg-transparent border-2 border-yellow-400 md:block hover:bg-blue-600"
            >
              Participe do Mini Projeto
            </Button>
          </Link>
        </div>

        <div className="flex justify-center md:absolute md:-top-[50px] md:left-10">
          <div className="w-96">
            <ChallengeCard
              className="shadow-[7px_7px_20px_0px_rgba(255,255,255,0.10)] dark:hover:shadow-[7px_7px_20px_0px_rgba(255,255,255,0.20)]"
              challenge={featuredChallenge}
            />
          </div>
        </div>
      </section>
      <div className="w-full h-[1px] dark:bg-background-800 bg-background-200 mb-12" />
    </>
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
            Tutorial será publicado em breve
          </strong>
        )}
      </p>
    </>
  );
}
