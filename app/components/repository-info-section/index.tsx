import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillGithub, AiOutlineFork, AiOutlineStar } from "react-icons/ai";
import { getRepoInfo } from "~/components/repository-info-section/get-repo-info";
import { useUser } from "~/hooks/useUser";

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
  const user = useUser();
  const repoUrl = `https://github.com/${repository?.organization}/${repository?.name}`;
  const [{ stars, forks }, setInfo] = useState({ stars: 0, forks: 0 });

  useEffect(() => {
    async function setRepoInfo() {
      setInfo(await getRepoInfo(repository?.name));
    }

    setRepoInfo();
  }, []);

  return (
    <Link
      to={repoUrl}
      target="_blank"
      // onClick={(e) => {
      //   if (!user) {
      //     e.preventDefault();
      //     toast.error(
      //       "Ops... você precisa estar logado para acessar essa página! \n \n Faça seu cadastro - é gratuito 🥳 "
      //     );
      //   }
      // }}
    >
      <article className="relative w-full bg-white dark:bg-gray-dark shadow-md rounded-lg p-4 pt-3 font-inter border-[1.5px] border-gray-300 dark:border-slate-600">
        <section>
          <AiFillGithub className="inline-block w-6 h-6 mr-2" />
          <span className="font-extralight">{repository?.organization} / </span>
          <span className="font-bold">{repository?.name}</span>
        </section>
        <section className="flex gap-4 mt-6">
          <span className="flex items-center">
            <AiOutlineStar />
            {/* <div className="w-6 h-4 ml-1 rounded dark:bg-slate-700 bg-slate-200"></div> */}
            {stars}
          </span>{" "}
          <span className="flex items-center">
            <AiOutlineFork />
            {/* <div className="w-8 h-4 ml-1 rounded dark:bg-slate-700 bg-slate-200"></div> */}
            {forks}
          </span>
        </section>
      </article>
    </Link>
  );
}
