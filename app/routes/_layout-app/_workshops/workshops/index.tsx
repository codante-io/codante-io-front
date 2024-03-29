import type { MetaArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
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

  return (
    <main className="container mx-auto text-center">
      <h1 className="mb-10 text-4xl font-lexend">Workshops</h1>
      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2 place-items-center">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.slug} workshop={workshop} />
        ))}
      </section>
      <Outlet />
    </main>
  );
}
