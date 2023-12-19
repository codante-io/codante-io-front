import { Link, useOutletContext } from "@remix-run/react";
import { Navigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";
import ProSpanWrapper from "~/components/pro-span-wrapper";
import { useColorMode } from "~/contexts/color-mode-context";
import type { Challenge } from "~/models/challenge.server";
import type { ChallengeUser, User } from "~/models/user.server";
import SolutionButtonsSection from "../../components/solution-buttons-section";

export default function SolutionCode() {
  const { challengeUsers, challenge, user } = useOutletContext<{
    challengeUsers: ChallengeUser[];
    challenge: Challenge;
    user: User;
  }>();

  const { colorMode } = useColorMode();

  const solutionSubmission = challengeUsers.find(
    (challengeUser) => challengeUser.is_solution,
  );

  if (!challenge?.has_solution || !solutionSubmission) {
    return (
      <section className="container">
        <Navigate to={`/mini-projetos/${challenge.slug}`}></Navigate>
      </section>
    );
  }

  function getStackblitzUrl() {
    if (!solutionSubmission || !solutionSubmission.fork_url) return false;
    if (
      challenge.resources.find(
        (resource) => resource.type === "stackblitz-embed",
      )
    ) {
      return challenge.resources.find(
        (resource) => resource.type === "stackblitz-embed",
      )?.url;
    } else {
      return `https://stackblitz.com/github/${solutionSubmission.fork_url.replace(
        "https://github.com/",
        "",
      )}`;
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
            src={
              getStackblitzUrl() +
              `?&showSidebar=1&embed=1&terminalHeight=0&file=src%2Fapp%2Fpage.tsx&hideNavigation=1&view=editor&theme=${colorMode}`
            }
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
      <SolutionButtonsSection challengeUser={solutionSubmission} user={user} />
    </section>
  );
}
