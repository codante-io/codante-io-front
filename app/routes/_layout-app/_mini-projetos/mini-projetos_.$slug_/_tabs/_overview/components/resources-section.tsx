import {
  FiDownload,
  FiExternalLink,
  FiFigma,
  FiGithub,
  FiGlobe,
} from "react-icons/fi";
import type { Challenge } from "~/models/challenge.server";

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

      {resources.map((resource) => (
        <a
          href={resource.url}
          key={resource.url}
          target="_blank"
          rel="noreferrer"
        >
          <article className="mt-4 group relative w-full bg-white dark:bg-background-800 shadow-md rounded-lg p-4 font-inter border-[1.5px] border-gray-300 hover:border-brand-300 dark:hover:border-brand-300 dark:border-slate-600 transition-colors">
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
          </article>
        </a>
      ))}
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
