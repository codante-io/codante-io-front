import { Link } from "react-router";
import type { Track } from "~/lib/models/track.server";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import CardItemRibbon from "~/components/ui/cards/card-item-ribbon";
import { cn } from "~/lib/utils/cn";

function TrackCard({ track }: { track: Track }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      key={track?.id}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={`/trilhas/${track?.slug}`}
        aria-disabled={track.status === "soon"}
        className={cn(
          "cursor-pointer relative block p-3 h-full w-full",
          track.status === "soon" && "pointer-events-none",
        )}
        tabIndex={track.status === "soon" ? -1 : 0}
      >
        <AnimatePresence>
          {isHovered && (
            <motion.span
              className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-background-700 block rounded-3xl -z-10"
              layoutId="hoverBackground"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.15 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, delay: 0.2 },
              }}
            />
          )}
        </AnimatePresence>
        <article className="group relative aspect-square border-[1.5px] border-gray-300 dark:border-background-700 rounded-2xl bg-background-50 dark:bg-background-800 shadow-2xs hover:border-blue-300 hover:shadow-lg dark:hover:border-blue-900 dark:hover:shadow-lg flex flex-col items-center justify-center transition-all duration-500">
          {track?.status === "soon" && <CardItemRibbon text="Em breve" />}

          <img
            src={track.image_url}
            alt={`Logo da trilha ${track?.name}`}
            className="h-16 md:h-24 m-4 mb-24 track-image rounded-xl group-hover:scale-105 transition-transform duration-500"
          />
          <h2 className="mb-2 text-2xl text-gray-800 dark:text-gray-50 font-lexend font-light">
            {track?.name}
          </h2>
        </article>
      </Link>
    </div>
  );
}

export default TrackCard;
