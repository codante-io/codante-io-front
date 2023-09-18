import { useOutletContext } from "@remix-run/react";
import { FiExternalLink } from "react-icons/fi";
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
            className=" relative max-w-[377px] overflow-hidden rounded-xl border-[1.5px] dark:border-background-600 border-background-200 shadow-sm text-gray-800 dark:text-white hover:shadow-lg transition-shadow"
          >
            <a
              href={submission.submission_url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="relative overflow-hidden group">
                <button className="absolute inset-0 z-10 flex items-center justify-center w-12 h-12 p-4 m-auto transition-all opacity-0 bg-background-100 rounded-xl dark:bg-background-700 group-hover:opacity-100">
                  <FiExternalLink className="text-4xl text-gray-800 dark:text-white" />{" "}
                </button>
                <img
                  src={submission.submission_image_url}
                  alt="Screenshot da aplicação submetida"
                  className="w-full transition-all delay-75 aspect-video group-hover:blur-sm group-hover:opacity-40 "
                />
              </div>
            </a>

            <footer className="flex items-center justify-between gap-4 px-4 dark:bg-background-700">
              <div className="flex items-center gap-4 my-4">
                <UserAvatar
                  avatarUrl={submission.user_avatar_url}
                  className="w-10 h-10 border border-background-200 dark:border-background-600"
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
