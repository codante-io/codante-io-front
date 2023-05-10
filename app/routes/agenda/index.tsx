import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChallengeCard from "~/components/cards/challenge-card";
import WorkshopCard from "~/components/cards/workshop-card";
import { AddToCalendarButton } from "add-to-calendar-button-react";
import { motion } from "framer-motion";

import { getUpcoming } from "~/models/upcoming.server";

export async function loader({ request }: { request: Request }) {
  const upcomingData = await getUpcoming();

  return json({
    upcomingData,
  });
}

export default function Schedule() {
  const { upcomingData } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto mt-10 text-center">
      <h1 className="mb-10 text-4xl text-center font-lexend">Agenda</h1>

      <div>
        {Object.keys(upcomingData)?.map((upcoming, i) => (
          <div
            key={upcoming}
            className="relative flex flex-wrap items-start justify-between lg:my-20"
          >
            <div
              className={`absolute pointer-events-none w-full pt-0 pb-14 px-10 text-left text-black border-b-2  z-0   top-0 `}
            ></div>
            <motion.div
              whileInView={{ opacity: 1, y: "0" }}
              initial={{ opacity: 0, y: "100px" }}
              className="z-20 p-4 mb-6 text-left bg-gray-100 shadow-lg lg:ml-4 dark:bg-gray-600 lg:mb-0"
            >
              <div className="text-gray-800 dark:text-black text-7xl">
                {Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(
                  new Date(upcoming)
                )}
              </div>
              <div className="text-4xl text-gray-800 dark:text-black font-lexend">
                {Intl.DateTimeFormat("pt-BR", { month: "long" })
                  .format(new Date(upcoming))
                  .charAt(0)
                  .toUpperCase() +
                  Intl.DateTimeFormat("pt-BR", { month: "long" })
                    .format(new Date(upcoming))
                    .slice(1)}
              </div>
              <div className="mt-2 mb-6 font-light text-gray-600 dark:text-gray-800">
                {Intl.DateTimeFormat("pt-BR", { year: "numeric" }).format(
                  new Date(upcoming)
                )}
              </div>
              <AddToCalendarButton
                buttonStyle="flat"
                size="3"
                language="pt"
                hideBackground
                hideCheckmark
                // label="Adicionar ao calendário"
                name={`Codante - ${
                  upcomingData[upcoming.toString()][0].type === "workshop"
                    ? "Workshop"
                    : "Mini Projeto"
                } - ${upcomingData[upcoming.toString()][0].name}`}
                startDate={upcoming}
                options={["Apple", "Google", "Yahoo", "iCal"]}
              ></AddToCalendarButton>
              <div></div>
            </motion.div>

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
          </div>
        ))}
      </div>
    </main>
  );
}
