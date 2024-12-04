import { Link } from "@remix-run/react";
import type { Challenge } from "~/lib/models/challenge.server";
import { Lesson } from "~/lib/models/lesson.server";
import type { Workshop } from "~/lib/models/workshop.server";
import Breadcrumbs from "~/routes/_layout-raw/_player/components/workshop-breadcrumbs";

export default function WorkshopTitle({
  workshop,
  isChallenge = false,
  challenge = null,
  lesson,
}: {
  workshop: Workshop;
  isLoggedIn?: boolean;
  challenge?: Challenge | null;
  isChallenge?: boolean;
  lesson: Lesson;
}) {
  return (
    <div className="flex flex-col justify-center">
      <h3 className="text-lg font-bold ">
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
      <div className=" text-xs text-brand">
        <Breadcrumbs
          workshop={workshop}
          lesson={lesson}
          isChallenge={isChallenge}
          challenge={challenge}
        />
      </div>
    </div>
  );
}
