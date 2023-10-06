import { useOutletContext } from "@remix-run/react";
import { BsGlobe } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import ReactionsButton from "~/components/reactions-button";
import UserAvatar from "~/components/user-avatar";

import type { ChallengeSubmission } from "~/models/challenge.server";

export default function Submissions() {
  const { challengeSubmissions } = useOutletContext<{
    challengeSubmissions: ChallengeSubmission[];
  }>();

  return (
    <>
      <div className="container">
        <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
          Galeria de Submissões
        </h1>
      </div>
      <div className="container grid justify-center gap-10 lg:grid-cols-3 md:grid-cols-2">
        {challengeSubmissions.map((submission) => (
          <article
            key={submission.user_github_user}
            className="relative max-w-[377px] overflow-hidden rounded-xl border-[1.5px] dark:border-background-600 border-background-200 shadow-sm text-gray-800 dark:text-white transition-shadow"
          >
            <div className="relative overflow-hidden group">
              <button
                className="absolute inset-0 z-10 flex items-center justify-center w-20 h-16 p-6 m-auto transition-all shadow-lg opacity-100 md:w-14 md:h-14 md:p-4 right-32 bg-background-100 rounded-xl dark:bg-background-700 md:opacity-0 md:group-hover:opacity-100"
                onClick={() => window.open(submission.submission_url, "_blank")}
              >
                <BsGlobe className="text-4xl text-gray-800 dark:text-white" />{" "}
              </button>
              <button
                className="absolute inset-0 z-10 flex items-center justify-center w-20 h-16 p-6 m-auto transition-all shadow-lg opacity-100 md:w-14 md:h-14 md:p-4 left-32 bg-background-100 rounded-xl dark:bg-background-700 md:opacity-0 md:group-hover:opacity-100"
                onClick={() => window.open(submission.fork_url, "_blank")}
              >
                <BsGithub className="text-4xl text-gray-800 dark:text-white" />{" "}
              </button>
              <img
                src={submission.submission_image_url}
                alt="Screenshot da aplicação submetida"
                className="w-full transition-all delay-75 opacity-40 aspect-video blur-xs md:blur-none md:group-hover:blur-sm md:opacity-100 md:group-hover:opacity-40"
              />
            </div>

            <footer className="flex items-center justify-between gap-4 px-4 dark:bg-background-700">
              <div className="flex items-center gap-4 my-4">
                <UserAvatar
                  isPro={submission.is_pro}
                  avatarUrl={submission.user_avatar_url}
                  className="w-10 h-10"
                />
                <div className="">
                  <h4 className="text-xs dark:text-gray-400 font-regular">
                    Resolução de
                  </h4>
                  <h3 className="font-semibold line-clamp-1">
                    {submission.user_name}
                  </h3>
                </div>
              </div>
              <ReactionsButton
                reactions={submission.reactions}
                reactableId={submission.id}
                reactableType="ChallengeUser"
              />
            </footer>
          </article>
        ))}
      </div>
    </>
  );
}
