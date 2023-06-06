import { Link, useOutletContext } from "@remix-run/react";
import { FiExternalLink } from "react-icons/fi";

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
          <a
            key={submission.user_github_user}
            href={submission.submission_url}
            target="_blank"
            rel="noreferrer"
          >
            <article className="max-w-[377px] overflow-hidden rounded-xl border-[1.5px] dark:border-background-600 border-background-200 shadow-sm text-gray-800 dark:text-white hover:shadow-lg transition-shadow group">
              <div className="relative overflow-hidden">
                <button className="absolute inset-0 z-10 flex items-center justify-center w-12 h-12 p-4 m-auto transition-all opacity-0 bg-background-100 rounded-xl dark:bg-background-700 group-hover:opacity-100">
                  <FiExternalLink className="text-4xl text-gray-800 dark:text-white" />{" "}
                </button>
                <img
                  src={submission.submission_image_url}
                  alt="Screenshot da aplicação submetida"
                  className="w-full transition-all aspect-video group-hover:blur-sm group-hover:opacity-40 "
                />
              </div>

              <footer className="flex items-center gap-4 p-4 dark:bg-background-700 ">
                <img
                  src={submission.user_avatar_url}
                  alt="Avatar do usuário"
                  className="w-10 h-10 border rounded-full border-background-200 dark:border-background-600"
                />
                <div className="">
                  <h4 className="text-xs dark:text-gray-400 font-regular">
                    Resolução de
                  </h4>
                  <h3 className="font-semibold">{submission.user_name}</h3>
                </div>
              </footer>
            </article>
          </a>
        ))}
      </div>
    </>
  );
}
