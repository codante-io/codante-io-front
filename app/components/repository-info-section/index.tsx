import { Link } from "@remix-run/react";
import { AiFillGithub, AiOutlineFork, AiOutlineStar } from "react-icons/ai";

export default function RepositoryInfoSection({
  repository,
}: {
  repository: {
    stars?: number;
    forks?: number;
    organization: string;
    name: string;
  };
}) {
  const repoUrl = `https://github.com/${repository?.organization}/${repository?.name}`;

  return (
    <Link to={repoUrl} target="_blank">
      <article className="relative w-full bg-white dark:bg-background-800 shadow-md rounded-lg p-4 pt-3 font-inter border-[1.5px] border-gray-300 dark:border-slate-600">
        <section>
          <AiFillGithub className="inline-block w-6 h-6 mr-2" />
          <span className="font-extralight">{repository?.organization} / </span>
          <span className="font-bold">{repository?.name}</span>
        </section>
        <section className="flex gap-4 mt-6">
          <span className="flex items-center">
            <AiOutlineStar />
            <span className="ml-1">{repository?.stars || 0}</span>
          </span>{" "}
          <span className="flex items-center">
            <AiOutlineFork />
            <span className="ml-1">{repository?.forks || 0}</span>
          </span>
        </section>
      </article>
    </Link>
  );
}
