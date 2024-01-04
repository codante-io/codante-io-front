import { Link } from "@remix-run/react";
import type { Workshop } from "~/lib/models/workshop.server";
import { fromSecondsToTimeString } from "~/lib/utils/interval";
import ProgressBar from "./progress-bar";
import type { Challenge } from "~/lib/models/challenge.server";

export default function WorkshopTitle({
  workshop,
  isChallenge = false,
  challenge = null,
  isLoggedIn = false,
}: {
  workshop: Workshop;
  isLoggedIn?: boolean;
  challenge?: Challenge | null;
  isChallenge?: boolean;
}) {
  return (
    <div className="mb-4">
      <h3 className="mt-0 text-lg font-bold ">
        <Link
          className="hover:underline"
          to={
            isChallenge
              ? `/mini-projetos/${challenge?.slug}`
              : `/workshops/${workshop.slug}`
          }
        >
          {isChallenge ? challenge?.name : workshop.name}
        </Link>
      </h3>
      <p className="mb-4 text-xs text-brand">
        {isChallenge ? "Resolução de Mini Projeto" : "Workshop"}
      </p>
      <span className="block mt-0 text-xs font-light text-gray-400 dark:text-gray-500">
        {workshop.lessons.length}{" "}
        {workshop.lessons.length > 1 ? "vídeos" : "vídeo"}{" "}
        <span className="font-light text-blue-500"> &#8226; </span>
        {fromSecondsToTimeString(
          workshop.lessons.reduce(
            (acc, lesson) => acc + lesson.duration_in_seconds,
            0,
          ),
        )}
      </span>
      {isLoggedIn && <ProgressBar lessons={workshop.lessons} />}
    </div>
  );
}
