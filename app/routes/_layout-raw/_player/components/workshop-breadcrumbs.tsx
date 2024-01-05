import { Link } from "@remix-run/react";
import type { Lesson } from "~/lib/models/lesson.server";
import type { Workshop } from "~/lib/models/workshop.server";

export default function Breadcrumbs({
  workshop,
  lesson,
  isChallenge = false,
  challenge = null,
}: {
  workshop: Workshop;
  lesson: Lesson;
  isChallenge?: boolean;
  challenge?: any;
}) {
  return (
    <div className="text-xs text-gray-500  dark:text-gray-400">
      <Link
        to={`${isChallenge ? "/mini-projetos" : "/workshops"}`}
        className=" hover:underline"
      >
        {isChallenge ? "Mini Projetos" : "Workshops"}
      </Link>
      <span className="mx-1 text-brand-500">{">"}</span>
      {isChallenge ? (
        <Link
          to={`/mini-projetos/${challenge.slug}`}
          className=" hover:underline"
        >
          {challenge.name}
        </Link>
      ) : (
        <Link to={`/workshops/${workshop.slug}`} className=" hover:underline">
          {workshop.name}
        </Link>
      )}
      <span className="mx-1 text-brand-500">{">"}</span>
      <span className="text-gray-800 dark:text-white ">{lesson.name}</span>
    </div>
  );
}
