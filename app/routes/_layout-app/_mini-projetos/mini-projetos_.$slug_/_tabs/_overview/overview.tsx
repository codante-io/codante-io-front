import MarkdownRenderer from "~/components/ui/markdown-renderer";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import RepositoryInfoSection from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/_tabs/_overview/components/repository-info-section";
import JoinChallengeSection from "./components/steps/join-challenge-section";
import ResolutionSection from "./components/resolution-section";
import ResourcesSection from "./components/resources-section";
import { Card } from "~/components/ui/cards/card";
import CurrentStatus from "./components/current-status";
import type { ChallengeUser } from "~/lib/models/user.server";
import type { UserStep } from "../../build-steps.server";
import type { Challenge } from "~/lib/models/challenge.server";

export default function Overview({
  challenge,
  hasSolution,
  steps,
  challengeUser,
}: {
  challenge: Challenge;
  hasSolution: boolean;
  steps: UserStep[];
  challengeUser: ChallengeUser;
}) {
  return (
    <div className="container grid grid-cols-3 gap-6 xl:gap-10">
      <Card
        border={"default"}
        className="col-span-3 space-y-10 overflow-hidden lg:space-y-20 lg:col-span-2"
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
            wrapperClasses="mx-auto px-2 md:px-4 pb-12"
          />
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

        <ResolutionSection
          isAvailable={hasSolution}
          thumbnailUrl={challenge.workshop?.image_url}
          challenge={challenge}
        />
      </div>
    </div>
  );
}
