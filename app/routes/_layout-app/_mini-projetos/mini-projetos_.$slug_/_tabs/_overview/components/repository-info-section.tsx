import { Link } from "@remix-run/react";
import { AiFillGithub, AiOutlineFork, AiOutlineStar } from "react-icons/ai";
import BecomeProDialog from "~/components/ui/become-pro-dialog";
import { cardVariants } from "~/components/ui/cards/card";

export default function RepositoryInfoSection({
  repository,
  userCanJoinChallenge,
}: {
  repository: {
    stars?: number;
    forks?: number;
    organization: string;
    name: string;
  };
  userCanJoinChallenge: boolean;
}) {
  const repoUrl = `https://github.com/${repository?.organization}/${repository?.name}`;

  const RepoCardContent = () => (
    <>
      <section>
        <AiFillGithub className="inline-block w-6 h-6 mr-2 transition-colors group-hover:text-brand-500 dark:group-hover:text-brand-300" />
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
    </>
  );

  return (
    <div>
      <h1 className="flex items-center mb-4 text-xl font-semibold text-gray-700 font-lexend dark:text-gray-300">
        Repositório
      </h1>
      {userCanJoinChallenge ? (
        <Link
          to={repoUrl}
          target="_blank"
          className={cardVariants({
            hover: "brand-light",
            className: "block text-left relative w-full p-4 pt-3 group",
          })}
        >
          <RepoCardContent />
        </Link>
      ) : (
        <BecomeProDialog
          trigger={
            <div
              className={cardVariants({
                hover: "brand-light",
                className: "block text-left relative w-full p-4 pt-3 group",
              })}
            >
              <RepoCardContent />
            </div>
          }
        />
      )}
    </div>
  );
}
