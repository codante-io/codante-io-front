import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card } from "~/components/ui/cards/card";
import WorkshopCard from "~/components/ui/cards/workshop-card";
import { getWorkshops } from "~/lib/models/workshop.server";

export const meta = () => {
  return [
    { title: "Workshops | Codante.io" },
    {
      name: "description",
      content:
        "Os workshops do Codante são ensinados por especialistas da indústria de tecnologia usando uma abordagem prática e técnicas modernas de front-end",
    },
    {
      property: "og:title",
      content: "Workshops | Codante.io",
    },
    {
      property: "og:description",
      content:
        "Os workshops do Codante são ensinados por especialistas da indústria de tecnologia usando uma abordagem prática e técnicas modernas de front-end",
    },
  ];
};

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
        Aprenda com nossos{" "}
        <span className="font-bold underline decoration-4 decoration-red-400">
          Workshops
        </span>{" "}
        e{" "}
        <span className="font-bold underline decoration-4 decoration-green-400">
          Tutoriais
        </span>
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
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:grid-cols-3 place-items-center auto-rows-fr mt-16">
        {pastWorkshops.map((workshop) => (
          <WorkshopCard key={workshop.slug} workshop={workshop} />
        ))}
      </section>
    </main>
  );
}
