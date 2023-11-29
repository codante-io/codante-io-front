import { Link, useOutletContext } from "@remix-run/react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { FaCrown } from "react-icons/fa";
import ProSpanWrapper from "~/components/pro-span-wrapper";
import { useColorMode } from "~/contexts/color-mode-context";
import type { ChallengeSubmission, Challenge } from "~/models/challenge.server";
import type { User } from "~/models/user.server";

export default function SolutionCode() {
  const { challengeSubmissions, challenge, user } = useOutletContext<{
    challengeSubmissions: ChallengeSubmission[];
    challenge: Challenge;
    user: User;
  }>();

  const { colorMode } = useColorMode();

  const solutionSubmission = challengeSubmissions.find(
    (submission) => submission.is_solution,
  );

  if (!challenge?.has_solution || !solutionSubmission) {
    return (
      <section className="container">
        <Navigate to={`/mini-projetos/${challenge.slug}`}></Navigate>
      </section>
    );
  }

  function handleClick(event: React.MouseEvent) {
    if (!user || !user?.is_pro) {
      event?.preventDefault();
      toast((t) => (
        <p>
          Apenas membros <ProSpanWrapper>PRO</ProSpanWrapper> podem acessar essa
          resolução.
        </p>
      ));
    }
  }

  return (
    <section className="container">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Resolução em Código
      </h1>
      <div className="relative w-full h-[65vh] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-cover lg:bg-fill bg-center bg-no-repeat blur-sm bg-[url('/img/cover-stackblitz-light.png')] dark:bg-[url('/img/cover-stackblitz-dark.png')]"></div>
        {user && user?.is_pro ? (
          <iframe
            title="slug"
            src={`https://stackblitz.com/github/${solutionSubmission?.fork_url.replace(
              "https://github.com/",
              "",
            )}?ctl=1&showSidebar=1&embed=1&terminalHeight=0&file=src%2Fapp%2Fpage.tsx&hideNavigation=1&view=editor&theme=${colorMode}`}
            className="w-full h-full rounded-lg shadow blur-none relative z-10"
          ></iframe>
        ) : (
          <div className="absolute z-20 p-3 bg-white border border-gray-200 rounded-lg shadow-2xl shadow-background-700 dark:border- dark:bg-background-800 dark:border-background-600 md:p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="font-bold md:text-2xl text-brand font-lexend">
              Ops...{" "}
            </h3>
            <span>
              Você precisa ser um membro <ProSpanWrapper>PRO</ProSpanWrapper>{" "}
              para acessar essa aula
            </span>
            <Link to="/assine" className="w-full inline-block mt-4">
              <button className="mx-auto w-full flex gap-1 justify-center items-center px-4 py-4 text-gray-700 rounded-lg bg-gradient-to-r animate-bg from-amber-200 via-amber-300 to-amber-400">
                <FaCrown className="mr-2 text-amber-500" />
                <span>
                  Seja
                  <b className="ml-1">PRO </b>
                </span>
              </button>
            </Link>
          </div>
        )}
      </div>
      <div className="mt-10 w-full flex md:gap-8 gap-4">
        <a
          className={`dark:bg-[#17212B] flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 justify-between dark:border-background-700 w-full rounded-lg p-5 cursor-pointer`}
          href={`${solutionSubmission.fork_url}/blob/main/README.md`}
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
          href={solutionSubmission?.submission_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-xs md:text-base lg:text-lg">
            Acessar o deploy da aplicação
          </p>
          <BsGlobe className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600" />
        </a>
      </div>
    </section>
  );
}
