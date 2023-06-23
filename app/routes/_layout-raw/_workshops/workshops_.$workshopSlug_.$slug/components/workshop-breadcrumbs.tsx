import { Link } from "@remix-run/react";
import type { Lesson } from "~/models/lesson.server";
import type { Workshop } from "~/models/workshop.server";

export default function Breadcrumbs({
  workshop,
  lesson,
}: {
  workshop: Workshop;
  lesson: Lesson;
}) {
  return (
    <div className="text-sm text-gray-500 dark:text-gray-400">
      <Link to="/workshops" className=" hover:underline">
        Workshops
      </Link>
      <span className="mx-1 text-brand-500">{">"}</span>
      <Link to={`/workshops/${workshop.slug}`} className=" hover:underline">
        {workshop.name}
      </Link>
      <span className="mx-1 text-brand-500">{">"}</span>
      <span className="text-gray-800 dark:text-white ">{lesson.name}</span>
    </div>
  );
}
