import { Link } from "@remix-run/react";
import { AiOutlineFork, AiOutlineStar } from "react-icons/ai";

export default function RepositoryCard({
  repository,
}: {
  // @TODO: change this to price when the API is ready
  repository: any;
}) {
  return (
    <Link to={repository?.url}>
      <article className="relative w-full bg-slate-50 dark:bg-gray-dark shadow-md rounded-lg p-4 pt-3 font-inter border-[1.5px] border-gray-300 dark:border-slate-600">
        <section>
          <span className="font-extralight">{repository?.organization} / </span>
          <span className="font-bold">{repository?.name}</span>
        </section>
        <section className="mt-6 flex gap-8">
          <span className="flex items-center">
            <AiOutlineStar />
            {repository?.stars}
          </span>{" "}
          <span className="flex items-center">
            <AiOutlineFork />
            {repository?.forks}
          </span>
        </section>
      </article>
    </Link>
  );
}
