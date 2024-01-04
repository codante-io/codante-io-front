import { json } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import TrackCard from "~/components/ui/cards/track-card";
import { metaV1 } from "@remix-run/v1-meta";
import { getTracks } from "~/lib/models/track.server";

export function meta(args: any) {
  return metaV1(args, {
    title: "Trilhas | Codante.io",
    description:
      "Nas trilhas você tem a união de workshops e mini projetos para aprender temas específicos em programação.",
  });
}

export const loader = async ({ request }: { request: Request }) => {
  return json({
    tracks: await getTracks(),
  });
};
export default function Workshops() {
  const { tracks } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto text-center">
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
