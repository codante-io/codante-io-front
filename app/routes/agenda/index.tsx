import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChallengeCard from "~/components/cards/challenge-card";
import WorkshopCard from "~/components/cards/workshop-card";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { motion } from "framer-motion";

import { getUpcoming } from "~/models/upcoming.server";
import { useColorMode } from "~/contexts/color-mode-context";
import { getPublishedDateAndTime } from "~/utils/interval";

// meta function
export function meta() {
  return {
    title: "Agenda | Codante.io",
    description:
      "Acompanhe a agenda de workshops e mini projetos ao vivo do Codante.",
  };
}

export async function loader({ request }: { request: Request }) {
  const upcomingData = await getUpcoming();

  return json({
    upcomingData,
  });
}

export default function Schedule() {
  const { upcomingData } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  const upcomingDates = Object.keys(upcomingData)?.filter(
    (key) => key !== "soon"
  );

  return (
    <main className="container mx-auto text-center">
      <h1 className="mb-10 text-4xl text-center font-lexend">Agenda</h1>

      <div>
        {upcomingDates.map((upcoming, i) => {
          const [publishedDate, publishedTime] = getPublishedDateAndTime(
            upcomingData[upcoming][0].published_at
          );

          let endTime = undefined;
          if (publishedTime) {
            endTime = new Date(upcomingData[upcoming][0].published_at);
            // add 2 hours to the published time - default duration of a challenge
            endTime.setHours(endTime.getHours() + 2);
            if (upcomingData[upcoming][0].type === "workshop") {
              // if workshop, add 2 more hours
              endTime.setHours(endTime.getHours() + 2);
            }
            endTime = Intl.DateTimeFormat("pt-BR", {
              hour: "numeric",
              minute: "numeric",
            }).format(endTime);
          }
          return (
            <motion.div
              whileInView={{ opacity: 1, y: "0" }}
              initial={{ opacity: 0, y: "100px" }}
              key={upcoming}
              className="relative flex flex-wrap items-start justify-center max-w-5xl gap-6 mx-auto lg:justify-between lg:my-20"
            >
              <div
                className={`absolute pointer-events-none w-full pt-0 pb-14 px-10 text-left text-black border-b-2 dark:border-gray-700  z-0   top-0 `}
              ></div>
              <div className="z-20 max-w-xs p-4 mb-0 text-center text-gray-800 bg-gray-100 rounded-lg shadow-lg lg:text-left dark:text-gray-300 lg:ml-4 dark:bg-gray-dark lg:mb-0">
                <div className="text-7xl text-brand">
                  {Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(
                    new Date(upcoming + "T00:00-0300") // esse timezone é necessário para a data funcionar corretamente
                  )}
                </div>
                <div className="text-4xl font-lexend">
                  {Intl.DateTimeFormat("pt-BR", { month: "long" })
                    .format(new Date(upcoming + "T00:00-0300"))
                    .charAt(0)
                    .toUpperCase() +
                    Intl.DateTimeFormat("pt-BR", { month: "short" })
                      .format(new Date(upcoming + "T00:00-0300"))
                      .slice(1)}
                  /{""}
                  {Intl.DateTimeFormat("pt-BR", { year: "numeric" }).format(
                    new Date(upcoming + "T00:00-0300")
                  )}
                </div>
                <div className="mt-2 text-2xl font-light "></div>
                {publishedTime && (
                  <div className="mb-3 font-light text-gray-400 ">
                    às {publishedTime}
                  </div>
                )}
                <p className="mt-3 text-xs text-gray-500">
                  {upcomingData[upcoming][0]["type"] === "challenge"
                    ? "Resolução do Mini Projeto"
                    : "Workshop ao Vivo"}
                  : <strong>{upcomingData[upcoming][0]["name"]}</strong>
                </p>
                <hr className="mx-8 mt-4 mb-3 text-xs text-gray-400 text-light"></hr>
                <div className="flex justify-center w-full ">
                  <AddToCalendarButton
                    buttonStyle="round"
                    size="3"
                    language="pt"
                    hideBackground
                    hideCheckmark
                    lightMode={colorMode === "light" ? "light" : "dark"}
                    // label="Adicionar ao calendário"
                    name={`[Codante] ${
                      upcomingData[upcoming.toString()][0].type === "workshop"
                        ? "Workshop"
                        : "Mini Projeto"
                    } - ${upcomingData[upcoming.toString()][0].name}`}
                    startDate={upcoming}
                    startTime={publishedTime ?? undefined}
                    endTime={endTime ?? undefined}
                    timeZone="America/Sao_Paulo"
                    styleDark="--btn-shadow: ''; --btn-shadow-hover: ''; --btn-background: #17212B; --btn-background-hover: #0E141A; --list-background: #17212B; --list-background-hover: #0E141A; --btn-border:#475569"
                    styleLight="--btn-shadow: ''; --btn-shadow-hover: '';"
                    options={[
                      "Google",
                      "Apple",
                      "Microsoft365",
                      "Outlook.com",
                      "iCal",
                    ]}
                  ></AddToCalendarButton>
                </div>
                <div></div>
              </div>

              {Object.values(upcomingData[upcoming])?.map((item: any) => (
                <div
                  className="mb-16 text-right lg:mb-16"
                  key={`${item.type}_${item.id}`}
                >
                  {item.type === "workshop" ? (
                    <motion.div
                      whileInView={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      className="inline-block lg:mr-10 "
                    >
                      <WorkshopCard workshop={item} />
                    </motion.div>
                  ) : null}
                  {item.type === "challenge" ? (
                    <motion.div
                      className="inline-block lg:mr-10"
                      whileInView={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                    >
                      <ChallengeCard challenge={item} />
                    </motion.div>
                  ) : null}
                </div>
              ))}
            </motion.div>
          );
        })}
      </div>
      <div>
        {upcomingData?.soon?.length > 0 ? (
          <>
            <h2 className="mb-10 text-2xl font-lexend">Sem data definida</h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {upcomingData?.soon?.map((item: any) => (
                <div
                  className="mb-16 text-right lg:mb-16"
                  key={`${item.type}_${item.id}`}
                >
                  {item.type === "workshop" ? (
                    <motion.div
                      whileInView={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                      className="inline-block lg:mr-10 "
                    >
                      <WorkshopCard workshop={item} />
                    </motion.div>
                  ) : null}
                  {item.type === "challenge" ? (
                    <motion.div
                      className="inline-block lg:mr-10"
                      whileInView={{ opacity: 1 }}
                      initial={{ opacity: 0 }}
                    >
                      <ChallengeCard challenge={item} />
                    </motion.div>
                  ) : null}
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </main>
  );
}
