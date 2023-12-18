import { useNavigate } from "@remix-run/react";
import toast from "react-hot-toast";
import { BsGithub, BsGlobe } from "react-icons/bs";
import ProSpanWrapper from "~/components/pro-span-wrapper";
import type { ChallengeUser, User } from "~/models/user.server";

export default function SolutionButtonsSection({
  challengeUser,
  user,
  challengeSlug,
  sendoToSolutionPage = false,
}: {
  challengeUser: ChallengeUser;
  challengeSlug?: string;
  user: User;
  sendoToSolutionPage?: boolean;
}) {
  const navigate = useNavigate();
  function handleClick(event: React.MouseEvent) {
    if ((!user || !user?.is_pro) && challengeUser.is_solution) {
      event?.preventDefault();
      if (sendoToSolutionPage) {
        return navigate(`/mini-projetos/${challengeSlug}/resolucao-codigo`);
      }
      toast((t) => (
        <p>
          Apenas membros <ProSpanWrapper>PRO</ProSpanWrapper> podem acessar essa
          resolução.
        </p>
      ));
    }
  }

  return (
    <div className="mt-10 w-full flex md:gap-8 gap-4">
      <a
        className={`dark:bg-[#17212B] flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 justify-between dark:border-background-700 w-full rounded-lg p-5 cursor-pointer`}
        href={challengeUser.fork_url ?? ""}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => handleClick(event)}
      >
        <p className="text-xs md:text-base lg:text-lg">
          Acessar o código no GitHub
        </p>
        <BsGithub className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600" />
      </a>

      <a
        className={`dark:bg-[#17212B] flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 justify-between dark:border-background-700 w-full rounded-lg p-5`}
        href={challengeUser?.submission_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="text-xs md:text-base lg:text-lg">
          Acessar o deploy da aplicação
        </p>
        <BsGlobe className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600" />
      </a>
    </div>
  );
}
