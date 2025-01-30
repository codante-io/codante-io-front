import { Card } from "~/components/ui/cards/card";
import MarkdownRenderer from "~/components/ui/markdown-renderer";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import type { Challenge } from "~/lib/models/challenge.server";
import type { ChallengeUser } from "~/lib/models/user.server";
import RepositoryInfoSection from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/_tabs/_overview/components/repository-info-section";
import type { UserStep } from "../../build-steps.server";
import CurrentStatus from "./components/current-status";
import ResourcesSection from "./components/resources-section";
import JoinChallengeSection from "./components/steps/join-challenge-section";
import { generateSimpleLoremIpsum } from "~/lib/utils/string-utils";
import { SmallBecomeProCard } from "~/components/ui/become-pro-card";

export default function Overview({
  challenge,
  steps,
  challengeUser,
  userCanJoinChallenge,
}: {
  challenge: Challenge;
  steps: UserStep[];
  challengeUser: ChallengeUser;
  userCanJoinChallenge: boolean;
}) {
  return (
    <div className="container grid grid-cols-3 gap-6 xl:gap-10">
      <Card
        border="default"
        className="col-span-3 space-y-10 overflow-hidden lg:space-y-20 lg:col-span-2 relative"
      >
        {challenge.video_url ? (
          <div>
            <section className="relative">
              <VimeoPlayer vimeoUrl={challenge.video_url} roundedClassName="" />
            </section>
          </div>
        ) : (
          <img
            src={challenge.image_url}
            alt="Project preview"
            className="object-scale-down w-full bg-gradient-to-br from-brand-500 via-indigo-300 to-indigo-500 max-h-96"
          />
        )}
        {/* TODO: Trocar aqui para a aula do challenge */}
        <div className="!mt-6">
          <MarkdownRenderer
            markdown={challenge?.description ?? ""}
            wrapperClasses="mx-auto px-2 md:px-4"
          />

          {!userCanJoinChallenge && (
            <div className="relative">
              <MarkdownRenderer
                markdown={generateSimpleLoremIpsum()}
                wrapperClasses="mx-auto px-2 md:px-4 pb-12 blur-sm"
              />
              <div className="absolute flex justify-center items-center top-0 left-0 right-0 mx-auto p-10 md:px-4">
                <SmallBecomeProCard />
              </div>
            </div>
          )}
        </div>
      </Card>

      <div className="col-span-3 space-y-10 lg:space-y-12 lg:col-span-1">
        <div>
          {challengeUser && (
            <CurrentStatus className="mb-5" challengeUser={challengeUser} />
          )}
          <div className="flex flex-wrap items-center justify-between xl:flex-nowrap"></div>
          <JoinChallengeSection
            steps={steps}
            slug={challenge?.slug}
            githubRepoUrl={challenge.repository_name}
            userCanJoinChallenge={userCanJoinChallenge}
          />
        </div>

        <RepositoryInfoSection
          repository={{
            organization: "codante-io",
            name: challenge.repository_name,
            forks: challenge?.forks,
            stars: challenge?.stars,
          }}
        />
        <ResourcesSection challenge={challenge} />
      </div>
    </div>
  );
}
