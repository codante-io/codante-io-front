import MarkdownRenderer from "~/components/ui/markdown-renderer";
import VimeoPlayer from "~/components/ui/video-players/vimeo-player";
import RepositoryInfoSection from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/_tabs/_overview/components/repository-info-section";
import JoinChallengeSection from "./components/join-challenge-section";
import ResolutionSection from "./components/resolution-section";
import ResourcesSection from "./components/resources-section";

export default function Overview({
  challenge,
  hasSolution,
  initialSteps,
}: {
  challenge: any;
  hasSolution: boolean;
  initialSteps: any;
}) {
  return (
    <div className="container grid grid-cols-3 gap-10">
      <div className="col-span-3 space-y-10 overflow-hidden rounded-lg lg:space-y-20 lg:col-span-2 dark:md:bg-background-800 md:border-[1.5px] md:border-gray-300 dark:md:border-gray-600 shadow-md">
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
        <div className="!mt-6">
          <MarkdownRenderer
            markdown={challenge?.description}
            wrapperClasses="mx-auto px-2 md:px-4 pb-12"
          />
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

        <ResolutionSection
          isAvailable={hasSolution}
          thumbnailUrl={challenge.workshop?.image_url}
          challenge={challenge}
        />
      </div>
    </div>
  );
}
