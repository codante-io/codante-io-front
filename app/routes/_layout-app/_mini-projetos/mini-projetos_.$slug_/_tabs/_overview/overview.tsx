import MarkdownRenderer from "~/components/markdown-renderer";
import VimeoPlayer from "~/components/vimeo-player";
import RepositoryInfoSection from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/_tabs/_overview/components/repository-info-section";
import JoinChallengeSection from "./components/join-challenge-section";
import ResolutionSection from "./components/resolution-section";
import ResourcesSection from "./components/resources-section";

export default function Overview({
  challenge,
  challengeUser,
  hasSolution,
  initialSteps,
}: {
  challenge: any;
  challengeUser: any;
  hasSolution: boolean;
  initialSteps: any;
}) {
  return (
    <div className="container grid grid-cols-3 gap-10">
      <div className="col-span-3 space-y-10 lg:space-y-20 lg:col-span-2">
        {challenge.video_url ? (
          <div>
            {/* <h1 className="flex items-center text-2xl font-semibold font-lexend text-brand">Intro</h1> */}
            <section className="relative mb-8">
              <VimeoPlayer vimeoUrl={challenge.video_url} />
            </section>
          </div>
        ) : (
          <img
            src={challenge.image_url}
            alt="Project preview"
            className="rounded-lg bg-gradient-to-br from-brand-500 via-indigo-300 to-indigo-500"
          />
        )}
        <div>
          <MarkdownRenderer markdown={challenge?.description} />
        </div>
      </div>
      <div className="col-span-3 space-y-10 lg:space-y-12 lg:col-span-1">
        <div>
          <div className="flex flex-wrap items-center justify-between xl:flex-nowrap"></div>
          <JoinChallengeSection
            initialSteps={initialSteps}
            slug={challenge?.slug}
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

        {!challenge?.slug.includes("rinha") && (
          <ResolutionSection
            isAvailable={hasSolution}
            thumbnailUrl={challenge.workshop?.image_url}
            challenge={challenge}
          />
        )}
      </div>
    </div>
  );
}
