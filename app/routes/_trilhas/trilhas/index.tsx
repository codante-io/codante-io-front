import { json } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { getTracks } from "../../../models/track.server";
import TrackCard from "~/components/cards/track-card";

export function meta() {
  return {
    title: "Trilhas | Codante.io",
    description:
      "Nas trilhas você tem a união de workshops e mini projetos para aprender temas específicos em programação.",
  };
}

export const loader = async ({ request }: { request: Request }) => {
  return json({
    tracks: await getTracks(),
  });
};
export default function Workshops() {
  const { tracks } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto mt-10 text-center">
      <h1 className="mb-10 text-4xl font-lexend">Trilhas</h1>
      <section className="grid grid-cols-1 gap-5 ">
        {tracks.map((track) => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </section>
      <Outlet />
    </main>
  );
}
