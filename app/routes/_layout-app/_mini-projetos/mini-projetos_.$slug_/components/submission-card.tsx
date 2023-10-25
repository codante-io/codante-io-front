import { BsGithub, BsGlobe } from "react-icons/bs";
import ReactionsButton from "~/components/reactions-button";
import UserAvatar from "~/components/user-avatar";
import type { Reactions } from "~/models/reactions.server";
import type { User } from "~/models/user.server";

export default function SubmissionCard({
  submissionUrl,
  githubUrl,
  submissionImage,
  user,
  reactions,
  submissionId,
}: {
  submissionUrl: string;
  githubUrl: string;
  submissionImage: string;
  user: User;
  reactions: Reactions;
  submissionId: string;
}) {
  return (
    <article className="relative max-w-[377px] overflow-hidden rounded-xl border-[1.5px] dark:border-background-600 border-background-200 shadow-sm text-gray-800 dark:text-white transition-shadow">
      <section className="relative overflow-hidden group">
        <button
          className="absolute inset-0 z-10 flex items-center justify-center w-20 h-16 p-6 m-auto transition-all shadow-lg opacity-100 md:w-14 md:h-14 md:p-4 right-32 bg-background-100 rounded-xl dark:bg-background-700 md:opacity-0 md:group-hover:opacity-100"
          onClick={() => window.open(submissionUrl, "_blank")}
        >
          <BsGlobe className="text-4xl text-gray-800 dark:text-white" />{" "}
        </button>
        <button
          className="absolute inset-0 z-10 flex items-center justify-center w-20 h-16 p-6 m-auto transition-all shadow-lg opacity-100 md:w-14 md:h-14 md:p-4 left-32 bg-background-100 rounded-xl dark:bg-background-700 md:opacity-0 md:group-hover:opacity-100"
          onClick={() => window.open(githubUrl, "_blank")}
        >
          <BsGithub className="text-4xl text-gray-800 dark:text-white" />{" "}
        </button>
        <img
          src={submissionImage}
          alt="Screenshot da aplicação submetida"
          className="w-full transition-all delay-75 opacity-40 aspect-video blur-xs md:blur-none md:group-hover:blur-sm md:opacity-100 md:group-hover:opacity-40"
        />
      </section>

      <footer className="flex items-center justify-between gap-4 px-4 dark:bg-background-700">
        <div className="flex items-center gap-4 my-4">
          <UserAvatar
            isPro={user.is_pro}
            avatarUrl={user.avatar_url}
            className="w-10 h-10"
          />
          <div className="">
            <h4 className="text-xs dark:text-gray-400 font-regular">
              Resolução de
            </h4>
            <h3 className="font-semibold line-clamp-1">{user.name}</h3>
          </div>
        </div>
        <ReactionsButton
          reactions={reactions}
          reactableId={submissionId}
          reactableType="ChallengeUser"
        />
      </footer>
    </article>
  );
}
