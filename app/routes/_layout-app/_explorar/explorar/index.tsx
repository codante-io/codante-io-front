import { json } from "@remix-run/node";
import { useLoaderData, Outlet } from "@remix-run/react";
import { getTracks } from "../../../../models/track.server";
import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

export function meta() {
  return {
    title: "Explorar | Codante.io",
    description:
      "Nas Explorar você tem a união de workshops e mini projetos para aprender temas específicos em programação.",
  };
}

export const loader = async ({ request }: { request: Request }) => {
  return json({
    tracks: await getTracks(),
  });
};
export default function Workshops() {
  const { tracks } = useLoaderData<typeof loader>();
  const [selectedTrack, setSelectedTrack] = useState(0);
  const tracksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // console.log(selectedTrack);
  }, [selectedTrack]);

  const scroll = (direction: "left" | "right") => {
    tracksRef.current?.scrollTo({
      left:
        direction === "left"
          ? tracksRef.current.scrollLeft - 100
          : tracksRef.current.scrollLeft + 100,
      behavior: "smooth",
    });

    setTimeout(() => {
      tracksRef.current?.scrollBy(1, 0); // This will make the browser snap to the 2nd child
    }, 200);
  };

  return (
    <div className="container mx-auto text-center">
      <h1 className="mb-10 text-4xl font-lexend">Explorar</h1>
      <section className="flex items-center gap-2">
        <button
          onMouseUp={() => scroll("left")}
          className="flex items-center justify-center w-12 h-12 p-2 rounded-xl bg-background-800 border-background-600 hover:bg-background-700"
        >
          <MdKeyboardArrowLeft size={24} />
        </button>
        <ul
          role="radiogroup"
          aria-required
          className="flex w-full max-w-full gap-3 p-4 overflow-x-scroll no-scrollbar rounded-xl bg-background-800 snap-x snap-proximity"
          ref={tracksRef}
        >
          {tracks.map((track) => (
            <li
              className="flex items-center gap-1 p-2 border cursor-pointer min-w-fit rounded-xl border-background-600 hover:bg-background-700 aria-checked:bg-background-600"
              key={track.slug}
              role="radio"
              onClick={() => setSelectedTrack(tracks.indexOf(track))}
              aria-checked={selectedTrack === tracks.indexOf(track)}
            >
              <img
                className="w-6 h-6 rounded-lg"
                src={track.image_url}
                alt="track icon"
              />
              {track.name}
            </li>
          ))}
        </ul>
        <button
          onClick={() => scroll("right")}
          className="flex items-center justify-center w-12 h-12 p-2 rounded-xl bg-background-800 border-background-600 hover:bg-background-700"
        >
          <MdKeyboardArrowRight size={24} />
        </button>
      </section>
      {/* <section className="grid grid-cols-1 gap-5 ">
        {tracks.map((track) => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </section> */}
      <Outlet />
    </div>
  );
}
