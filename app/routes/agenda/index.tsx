import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChallengeCard from "~/components/cards/challenge-card";
import WorkshopCard from "~/components/cards/workshop-card";
import { AddToCalendarButton } from "add-to-calendar-button-react";

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
          <div key={upcoming} className="relative my-20">
            <div
              className={`absolute pointer-events-none w-full pt-0 pb-14 px-10 text-left text-black border-b-2  z-0   top-0 `}
            >
              <div className="">
                <div className="text-gray-800 text-7xl">
                  {Intl.DateTimeFormat("pt-BR", { day: "numeric" }).format(
                    new Date(upcoming)
                  )}
                </div>
                <div className="text-4xl text-gray-800 font-lexend">
                  {Intl.DateTimeFormat("pt-BR", { month: "long" })
                    .format(new Date(upcoming))
                    .charAt(0)
                    .toUpperCase() +
                    Intl.DateTimeFormat("pt-BR", { month: "long" })
                      .format(new Date(upcoming))
                      .slice(1)}
                </div>
                <div className="mt-2 font-light text-gray-600">
                  {Intl.DateTimeFormat("pt-BR", { year: "numeric" }).format(
                    new Date(upcoming)
                  )}
                </div>
                <AddToCalendarButton
                  name="Test-Event"
                  startDate="2023-05-22"
                  options={["Apple", "Google", "Yahoo", "iCal"]}
                  onClick={() => alert("cli")}
                ></AddToCalendarButton>
              </div>
            </div>

            {Object.values(upcomingData[upcoming])?.map((item: any) => (
              <div className="text-right mb-36" key={`${item.type}_${item.id}`}>
                {item.type === "workshop" ? (
                  <div className="inline-block lg:mr-10 ">
                    <WorkshopCard workshop={item} />
                  </div>
                ) : null}
                {item.type === "challenge" ? (
                  <div className="inline-block lg:mr-10">
                    <ChallengeCard challenge={item} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
