import { json } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";
import { getWorkshops } from "../../../models/workshop.server";
import WorkshopCard from "~/components/cards/workshop-card";

export const loader = async ({ request }: { request: Request }) => {
  return json({
    workshops: await getWorkshops(),
  });
};
export default function Workshops() {
  const { workshops } = useLoaderData<typeof loader>();

  return (
    <main className="mt-10 text-center">
      <h1 className="text-4xl font-lexend mb-10">Workshops</h1>
      <section className="font-lexend grid gap-5 grid-cols-2">
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.slug} workshop={workshop} />
        ))}
      </section>
      <Outlet />
    </main>
  );
}
