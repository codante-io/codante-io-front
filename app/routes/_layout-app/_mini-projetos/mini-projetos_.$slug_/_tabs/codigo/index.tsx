import { useOutletContext } from "@remix-run/react";
import { Navigate } from "react-router-dom";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import type { Challenge } from "~/lib/models/challenge.server";
import type { ChallengeUser, User } from "~/lib/models/user.server";
import SolutionButtonsSection from "../../components/solution-buttons-section";
import BecomeProCard from "~/components/ui/become-pro-card";
import SignInCard from "~/components/ui/sign-in-card";

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
      challenge.resources?.find(
        (resource) => resource.type === "stackblitz-embed",
      )
    ) {
      return challenge.resources?.find(
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
      <div className="relative w-full h-[65vh] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-cover lg:bg-fill bg-center bg-no-repeat blur-xs bg-[url('/img/cover-stackblitz-light.png')] dark:bg-[url('/img/cover-stackblitz-dark.png')]"></div>
        {(user && user?.is_pro) || (user && !challenge.is_premium) ? (
          <iframe
            title="slug"
            src={
              getStackblitzUrl() +
              `?&showSidebar=1&embed=1&terminalHeight=0&file=src%2Fapp%2Fpage.tsx&hideNavigation=1&view=editor&theme=${colorMode}`
            }
            className="w-full h-full rounded-lg shadow-xs blur-none relative z-10"
          ></iframe>
        ) : (
          <div className="absolute flex w-full h-full justify-center items-center">
            <div className="max-w-md">
              {user || challenge.is_premium ? (
                <BecomeProCard />
              ) : (
                <SignInCard />
              )}
            </div>
          </div>
        )}
      </div>
      <SolutionButtonsSection
        challenge={challenge}
        challengeUser={solutionSubmission}
        user={user}
      />
    </section>
  );
}
