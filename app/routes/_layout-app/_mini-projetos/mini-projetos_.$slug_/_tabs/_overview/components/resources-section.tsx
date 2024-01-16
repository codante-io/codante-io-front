import { Link } from "@remix-run/react";
import {
  FiDownload,
  FiExternalLink,
  FiFigma,
  FiGithub,
  FiGlobe,
} from "react-icons/fi";
import { cardVariants } from "~/components/ui/cards/card";
import type { Challenge } from "~/lib/models/challenge.server";

export default function ResourcesSection({
  challenge,
}: {
  challenge: Challenge;
}) {
  type Resource = {
    type: string;
    url: string;
    name: string;
  };
  const resources = challenge.resources?.filter(
    (resource: Resource) =>
      resource.type === "figma" ||
      resource.type === "file" ||
      resource.type === "github",
  );

  // Por enquanto apenas aceitando recursos do tipo Figma, file e github
  const hasResourcesToShow = resources && resources?.length > 0;

  if (!hasResourcesToShow) {
    return null;
  }
  return (
    <div>
      <h1 className="flex items-center mb-4 text-xl font-semibold text-gray-700 font-lexend dark:text-gray-300">
        Recursos
      </h1>

      <div className="flex flex-col items-center justify-center gap-2">
        {resources.map((resource) => (
          <Link
            to={resource.url}
            key={resource.url}
            target="_blank"
            className={cardVariants({
              hover: "brand-light",
              className: "block text-left relative w-full p-4 group",
            })}
          >
            <section className="flex items-center">
              <Icon resource={resource} />
              <p className="flex items-center gap-2 font-extralight ">
                {resource.name}
                {resource.type !== "file" && (
                  <span className="text-sm text-gray-400">
                    <FiExternalLink />
                  </span>
                )}
              </p>
            </section>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Icon({ resource }: { resource: any }) {
  const classnames =
    "inline-block w-5 h-5 mr-2 text-gray-700 transition-colors dark:text-gray-300 group-hover:text-brand-500 dark:group-hover:text-brand-300";
  if (resource.type === "figma") {
    return <FiFigma className={classnames} />;
  }

  if (resource.type === "file") {
    return <FiDownload className={classnames} />;
  }

  if (resource.type === "github") {
    return <FiGithub className={classnames} />;
  }

  if (resource.type === "url") {
    return <FiGlobe className={classnames} />;
  }

  return null;
}
