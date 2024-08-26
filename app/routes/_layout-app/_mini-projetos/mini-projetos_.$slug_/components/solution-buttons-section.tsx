import toast from "react-hot-toast";
import { BsGithub, BsGlobe } from "react-icons/bs";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import type { Challenge } from "~/lib/models/challenge.server";
import type { ChallengeUser, User } from "~/lib/models/user.server";

export default function SolutionButtonsSection({
  challenge,
  challengeUser,
  user,
}: {
  challenge: Challenge;
  challengeUser: ChallengeUser;
  user: User;
}) {
  function handleClick(event: React.MouseEvent) {
    // se usuário não for pro e os botões forem de resolução, não deixa acessar.

    if (
      (!user || (!user?.is_pro && !!challenge.is_premium)) &&
      challengeUser.is_solution
    ) {
      event?.preventDefault();
      toast(() =>
        user || challenge.is_premium ? (
          <p>
            Apenas membros <ProSpanWrapper>PRO</ProSpanWrapper> podem acessar
            essa resolução.
          </p>
        ) : (
          <p>Faça login para acessar o código.</p>
        ),
      );
    }
  }

  return (
    <div className="mt-10 w-full flex md:gap-8 gap-4">
      <a
        className={`dark:bg-background-800/50 hover:dark:bg-background-800/100 transition-colors flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 justify-between dark:border-background-700 border-gray-300 w-full rounded-lg p-5 cursor-pointer`}
        href={challengeUser.fork_url ?? ""}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(event) => handleClick(event)}
      >
        <p className="text-xs md:text-base lg:text-lg">
          Acessar o código no GitHub
        </p>
        <BsGithub className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600 transition-colors" />
      </a>

      {challengeUser.submission_url && (
        <a
          className={`dark:bg-background-800/50 hover:dark:bg-background-800/100 transition-colors flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 justify-between dark:border-background-700 border-gray-300 w-full rounded-lg p-5`}
          href={challengeUser?.submission_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-xs md:text-base lg:text-lg">
            Acessar o deploy da aplicação
          </p>
          <BsGlobe className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600 transition-colors" />
        </a>
      )}
    </div>
  );
}
