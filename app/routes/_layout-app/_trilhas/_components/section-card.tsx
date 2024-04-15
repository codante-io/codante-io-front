import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import type { TrackItem, TrackSection } from "~/lib/models/track.server";
import { InstructorsList } from "~/routes/_layout-app/_trilhas/_components/instructors-list";

interface SectionCardProps {
  section: TrackSection;
  index: number;
  userCompleted: number;
}

function SectionCard({ section, index, userCompleted }: SectionCardProps) {
  const totalTrackables = section.trackables.filter(
    (trackable) => (trackable as TrackItem)?.type !== "markdown",
  ).length;

  const completedPercentage = (userCompleted / totalTrackables) * 100;

  return (
    <Card className="text-start overflow-visible" border="brand-l">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <span className="text-lg text-gray-500">
            {(index + 1).toString().padStart(2, "0")}.
          </span>{" "}
          {section.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{section.description}</CardDescription>
        <div className="border-t border-gray-200 dark:border-gray-800 my-4 px-2" />

        <section>
          <h3 className="mb-2">
            Você vai{" "}
            <span className="font-bold border-b-2 border-brand-500">
              aprender
            </span>
          </h3>
          <div>
            <ul className="list-disc text-start ml-4">
              {section.tags.map((tag, index) => (
                <li
                  key={index}
                  className="text-xs text-gray-600 dark:text-gray-400"
                >
                  {tag.name}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="border-t border-gray-200 dark:border-gray-800 my-4 px-2" />

        <section>
          <h3 className="mb-2">
            Quem vai te{" "}
            <span className="font-bold border-b-2 border-brand-500">
              ensinar
            </span>
          </h3>
          <div className="flex flex-row items-center justify-start mt-6 w-full">
            <InstructorsList instructors={section.instructors} />
          </div>
        </section>
        <div className="border-t border-gray-200 dark:border-gray-800 my-4 px-2" />

        <section>
          <h3 className="mb-2">
            Seu{" "}
            <span className="font-bold border-b-2 border-brand-500">
              progresso
            </span>{" "}
            <span className="text-xs dark:text-gray-400 text-gray-700">{`(${userCompleted}/${totalTrackables})`}</span>
          </h3>

          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700 mt-4">
            <div
              className="bg-blue-600 text-xs font-medium h-3 text-blue-100 text-center p-0.5 leading-none rounded-full"
              style={{
                width: userCompleted > 0 ? `${completedPercentage}%` : "10%",
              }}
            ></div>
          </div>
        </section>
      </CardContent>
    </Card>
  );
}

export default SectionCard;
