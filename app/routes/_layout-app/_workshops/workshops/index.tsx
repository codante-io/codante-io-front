import type { MetaArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/ui/cards/card";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import { getWorkshops } from "~/lib/models/workshop.server";

export function meta({ matches }: MetaArgs) {
  const parentMeta = matches
    .flatMap((match) => match.meta ?? [])
    .filter((meta) => !("title" in meta))
    .filter((meta) => (meta as any).name !== "description");
  return [
    ...parentMeta,
    { title: "Workshops | Codante.io" },
    {
      name: "description",
      content:
        "Tópicos atuais de front end ensinados de forma prática e objetiva por profissionais do mercado.",
    },
  ];
}

export const loader = async ({ request }: { request: Request }) => {
  return json({
    workshops: await getWorkshops(),
  });
};
export default function Workshops() {
  const { workshops } = useLoaderData<typeof loader>();

  const pastWorkshops = workshops.filter(
    (workshop) =>
      workshop.published_at && new Date(workshop.published_at) < new Date(),
  );
  const upcomingWorkshops = workshops.filter(
    (workshop) =>
      workshop.published_at && new Date(workshop.published_at) >= new Date(),
  );

  return (
    <main className="container mx-auto text-center">
      <h1 className="mb-10 text-4xl font-lexend">
        Todos os{" "}
        <span className="font-bold border-b-4 border-amber-400">Workshops</span>
      </h1>

      {upcomingWorkshops.length > 0 && (
        <Card
          border={"none"}
          className="mb-10 rounded-xl flex flex-col items-center justify-start bg-background-100 shadow-none dark:bg-background-900 py-4"
        >
          <h3 className="text-sm text-gray-400 dark:text-gray-300 mb-1">
            🎬 Em breve e ao vivo:
          </h3>
          {upcomingWorkshops.map((workshop) => (
            <WorkshopCard key={workshop.slug} workshop={workshop} />
          ))}
        </Card>
      )}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-3 place-items-center auto-rows-fr">
        {pastWorkshops.map((workshop) => (
          <WorkshopCard key={workshop.slug} workshop={workshop} />
        ))}
      </section>
    </main>
  );
}
