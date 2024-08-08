import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import { useEffect, useState } from "react";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import type { WorkshopCard as WorkshopCardType } from "~/lib/models/workshop.server";

type FeaturedWorkshopSectionProps = {
  featuredWorkshop?: WorkshopCardType;
};

export default function FeaturedWorkshopSection({
  featuredWorkshop,
}: FeaturedWorkshopSectionProps) {
  if (!featuredWorkshop) return null;
  return (
    <>
      <section className="lg:relative mb-20 lg:mb-32 mt-[80px] rounded-xl border-[1.5px] border-background-800 bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-transparent flex lg:flex-row justify-center items-center px-14 flex-col-reverse">
        <div className="flex justify-center lg:left-10">
          <div className="w-96 py-14">
            <WorkshopCard withChip={false} workshop={featuredWorkshop} />
          </div>
        </div>

        {featuredWorkshop.status === "streaming" ? (
          <WorkshopStreamingInfo featuredWorkshop={featuredWorkshop} />
        ) : (
          <WorkshopSoonInfo featuredWorkshop={featuredWorkshop} />
        )}
      </section>
    </>
  );
}

function WorkshopSoonInfo({
  featuredWorkshop,
}: {
  featuredWorkshop: WorkshopCardType;
}) {
  return (
    <div className="flex-col px-6 pt-6 text-center lg:text-start">
      <h3 className="font-light text-brand-400 ">Próximo workshop ao vivo</h3>

      <h1 className="text-2xl font-bold text-white ">
        {featuredWorkshop.name}
      </h1>
      <p className="mt-3 text-gray-100 font-extralight md:text-sm lg:text-base">
        Esse workshop será transmitido ao vivo do nosso estúdio. Cadastre-se
        gratuitamente para receber as novidades.
      </p>
      <p className="mt-4 text-sm ">
        <span className="inline-flex items-center gap-1 text-brand-200 dark:text-brand-200">
          <CalendarDaysIcon className="inline w-4 h-4 " />
          Data:
          <strong className="text-white dark:text-white ">
            {new Date(
              Date.parse(featuredWorkshop.published_at as string),
            ).toLocaleDateString("pt-BR", {
              dateStyle: "short",
            }) +
              ", " +
              new Date(
                Date.parse(featuredWorkshop.published_at as string),
              ).toLocaleTimeString("pt-BR", {
                timeStyle: "short",
              })}
          </strong>
        </span>{" "}
      </p>

      <Countdown featuredWorkshop={featuredWorkshop} />
    </div>
  );
}

function WorkshopStreamingInfo({
  featuredWorkshop,
}: {
  featuredWorkshop: WorkshopCardType;
}) {
  return (
    <div className="flex-col px-6 pt-6 h-full text-center lg:text-start ">
      <h3 className="font-light text-red-400 ">
        🔴 Workshop acontecendo agora
      </h3>

      <h1 className="text-2xl font-bold text-white ">
        {featuredWorkshop.name}
      </h1>
      <p className="mt-3 text-gray-100 font-extralight md:text-sm lg:text-base">
        Esse workshop está sendo transmitido ao vivo do nosso estúdio. Acompanhe
        aqui de forma gratuita!
      </p>
    </div>
  );
}

function Countdown({
  featuredWorkshop,
}: {
  featuredWorkshop: WorkshopCardType;
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
    if (featuredWorkshop && featuredWorkshop.published_at) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();
        const distance =
          new Date(featuredWorkshop?.published_at as string).getTime() - now;
        setRemainingTime(distance);

        if (distance < 0) {
          clearInterval(intervalId);
          setTimerEnded(true);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [featuredWorkshop]);

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
