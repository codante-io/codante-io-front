import { useLoaderData, Outlet, MetaFunction } from "react-router";
import TrackCard from "~/components/ui/cards/track-card";
import { getTracks } from "~/lib/models/track.server";

export const meta: MetaFunction = () => {
  const title = "Trilhas | Codante.io";
  const description =
    "Nas trilhas você tem a união de workshops e mini projetos para aprender temas específicos em programação.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
  ];
};

export const loader = async () => {
  const tracks = await getTracks();
  return { tracks };
};
export default function Workshops() {
  const { tracks } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto text-center">
      <h1 className="mb-10 text-3xl md:text-4xl text-center font-lexend">
        Aprenda com nossas{" "}
        <span className="font-bold border-b-4 border-amber-400">Trilhas</span>
      </h1>

      <section>
        <div className="flex flex-col items-center ">
          <p className="mt-2 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-3xl">
            Aprenda tecnologias seguindo um{" "}
            <span className="text-brand-400 font-bold"> plano sequencial</span>.{" "}
            <br /> Assista <span className="font-bold">workshops</span>,
            consulte <span className="font-bold">materiais externos</span> e
            faça nossos <span className="font-bold">projetos</span>.
          </p>
        </div>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
        {tracks.map((track) => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </section>
      <Outlet />
    </main>
  );
}
