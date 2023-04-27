import { Link } from "@remix-run/react";
import { AiFillGithub, AiOutlineFork, AiOutlineStar } from "react-icons/ai";

export default function RepositoryInfoSection({
  repository,
}: {
  // @TODO: change this to price when the API is ready
  repository: any;
}) {
  return (
    <Link to={repository?.url}>
      <article className="relative w-full bg-slate-50 dark:bg-gray-dark shadow-md rounded-lg p-4 pt-3 font-inter border-[1.5px] border-gray-300 dark:border-slate-600">
        <section className="flex items-center">
          <AiFillGithub className="mr-3" />
          <span className="font-extralight">{repository?.organization} / </span>
          <span className="font-bold">{repository?.name}</span>
        </section>
        <section className="flex gap-4 mt-6">
          <span className="flex items-center">
            <AiOutlineStar />
            <div className="w-6 h-4 ml-1 rounded bg-slate-200"></div>
            {/* {repository?.stars} */}
          </span>{" "}
          <span className="flex items-center">
            <AiOutlineFork />
            <div className="w-8 h-4 ml-1 rounded bg-slate-200"></div>
            {/* {repository?.forks} */}
          </span>
        </section>
      </article>
    </Link>
  );
}
