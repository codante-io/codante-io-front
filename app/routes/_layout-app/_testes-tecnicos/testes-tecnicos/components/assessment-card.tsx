import { Link } from "@remix-run/react";
import IconsAside from "./icons-aside";
import type { Assessment } from "~/lib/models/assessments.server";
import { useColorMode } from "~/lib/contexts/color-mode-context";

function borderColor(type: string) {
  switch (type) {
    case "frontend":
      return "rgb(82 130 255)";
    case "fullstack":
      return "linear-gradient(to bottom, rgb(82 130 255) 50%, #facc15 50%) bottom, linear-gradient(to bottom, #facc15 50%, rgb(82 130 255) 50%) top";
    case "backend":
      return "#facc15";
    default:
      return "rgb(82 130 255)";
  }
}

export default function AssessmentCard({
  assessment,
}: {
  assessment: Assessment;
}) {
  const { colorMode } = useColorMode();

  return (
    <Link key={assessment.slug} to={`/testes-tecnicos/${assessment.slug}`}>
      <div
        className="pl-1.5 rounded-lg h-full"
        style={{
          background: borderColor(assessment.type),
        }}
      >
        <article className="h-full flex items-start gap-3 justify-center p-3 bg-white rounded-r-lg shadow-xs border-[1.5px] border-l-0 border-background-200 dark:border-background-700 dark:bg-background-800 ">
          <div className="flex items-center justify-center w-16 h-16 ">
            <img
              src={
                colorMode === "dark"
                  ? (assessment.image_url_dark ?? assessment.image_url)
                  : assessment.image_url
              }
              alt="Logo da Empresa"
              className="w-full border border-gray-200 rounded-lg dark:border-background-700"
            />
          </div>
          <div className="flex-1">
            <h2 className="mb-2 leading-tight font-lexend">
              {assessment.title}
            </h2>
            <p className="text-xs text-gray-700 dark:text-gray-400">
              {assessment.tags?.join(", ")}
            </p>
          </div>
          <IconsAside assessment={assessment} />
        </article>
      </div>
    </Link>
  );
}
