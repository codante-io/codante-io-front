import { Link } from "@remix-run/react";
import React from "react";
import type { Lesson } from "~/models/lesson.server";
import type { Workshop } from "~/models/workshop.server";
import { fromSecondsToTimeString } from "~/utils/interval";

type WorkshopLessonsListProps = {
  workshop: Workshop;
};

export default function WorkshopLessonsList({
  workshop,
}: WorkshopLessonsListProps) {
  return (
    <ol className="mt-4">
      {workshop.lessons.map((lesson: Lesson, id: number) => (
        <Link key={lesson.id} to={`/workshops/${workshop.slug}/${lesson.slug}`}>
          <li className="flex items-center justify-between gap-3 px-3 py-3 transition rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800">
            <span className="mr-3 text-sm text-brand ">{id + 1}.</span>
            <h4 className="flex-1 inline-block mr-2 font-light text-slate-700 dark:text-slate-200">
              {lesson.name}
            </h4>
            <span className="text-sm text-slate-500">
              {fromSecondsToTimeString(lesson.duration_in_seconds)}
            </span>
          </li>
        </Link>
      ))}
    </ol>
  );
}
