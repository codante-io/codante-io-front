import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData, useNavigate, useOutletContext } from "@remix-run/react";
import type { Challenge } from "~/models/challenge.server";
import type { ChallengeUser, User } from "~/models/user.server";
import UserAvatar from "~/components/user-avatar";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { LuLinkedin } from "react-icons/lu";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import ReactionsButton from "~/components/reactions-button";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  return {
    params,
  };
}


export default function MySolution() {
  const {
    params,
  } = useLoaderData<typeof loader>();

  const { challengeUser, challenge, challengeUsers, user } = useOutletContext<{
    challengeUser: ChallengeUser;
    challenge: Challenge;
    challengeUsers: ChallengeUser[];
    user: User;
  }>();

  function normalizeName(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  const navigate = useNavigate();
  const submissionUser = challengeUsers.find((user) => user.user_github_user === params.username)
  
  if (!submissionUser) return (
    <div className="flex flex-col items-start justify-center h-full container">
      <h1 className="mb-5 text-2xl font-bold dark:text-gray-300 text-gray-800">Nenhuma submissão encontrada</h1>
      <p className="text-gray-600 dark:text-gray-500">Este usuário ainda não submeteu uma solução para este Mini Projeto.</p>
    </div>
  )

  // console.log(challenge)
  // console.log(challengeUser)
  // console.log(challengeUsers)

  return (
    <div className="container text-center">
      <h1
        className="text-2xl md:text-4xl font-lexend mb-2 cursor-pointer hover:opacity-80"
        onClick={() => navigate(`/mini-projetos/${params.slug}`)}
      >
        {challenge.name}
      </h1>
      <h2 className="text-lg md:text-xl mb-14 md:mb-24">Solução de <span className="md:text-xl font-bold text-brand-500">{normalizeName(submissionUser.user_name)}</span></h2>

      <main className="relative">
        <UserAvatar
          avatar={submissionUser.avatar}
          className="lg:w-32 lg:h-32 absolute left-1/2 transform -translate-x-1/2 lg:-top-16 md:w-24 md:h-24 md:-top-12 w-16 h-16 -top-8"
          showTooltip={false}
        />
        <div className="overflow-hidden rounded-xl border-[1.5px] shadow-sm text-gray-800 dark:text-white transition-shadow dark:border-background-600  border-background-200 w-full dark:bg-background-700">
          <header className="h-12 md:h-20 lg:h-32 flex justify-center gap-24 md:gap-36 lg:gap-40 items-center">
            <FaLinkedinIn className="lg:text-4xl md:text-3xl text-2xl" />
            <FaGithub
              className="lg:text-4xl md:text-3xl text-2xl cursor-pointer hover:animate-pulse"
              onClick={() => window.open(`https://www.github.com/${submissionUser.user_github_user}`, "_blank")}
            />
          </header>
          <img
            className="cursor-pointer"
            src={submissionUser.submission_image_url}
            alt={`Print Screen da submissão de ${normalizeName(submissionUser.user_name)}`}
            onClick={() => window.open(submissionUser.submission_url, "_blank")}
          />
        </div>
      </main>
      <section className="flex justify-between mt-6">
        <div
          className="flex items-center cursor-pointer gap-2 hover:opacity-70"
          onClick={() => window.open(submissionUser.fork_url as string, "_blank")}  
        >
          {/* <BsGithub className="text-lg"/> */}
          <h3 
            className="font-light "
          >Acessar no GitHub</h3>
        </div>
        <ReactionsButton
          reactions={submissionUser.reactions}
          reactableId={submissionUser.id}
          reactableType="ChallengeUser"
          iconSize="text-2xl"
        />
      </section>
    </div>
  )
}