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
        {challenge.video_url && (
          <div>
            {/* <h1 className="flex items-center text-2xl font-semibold font-lexend text-brand">Intro</h1> */}
            <section className="relative mb-8">
              <VimeoPlayer vimeoUrl={challenge.video_url} />
            </section>
          </div>
        )}
        <div>
          <MarkdownRenderer markdown={challenge?.description} />
        </div>
      </div>
      <div className="col-span-3 space-y-10 lg:space-y-12 lg:col-span-1">
        <div>
          <div className="flex flex-wrap items-center justify-between mb-4 xl:flex-nowrap">
            <h1 className="text-2xl font-semibold font-lexend">
              {challengeUser ? "Progresso" : "Participe"}
            </h1>
            {challengeUser && (
              <div className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 xl:text-xs text-[0.65rem] font-medium text-green-700 shadow-sm">
                <svg
                  className={"h-1.5 w-1.5 animate-pulse fill-green-500"}
                  viewBox="0 0 6 6"
                  aria-hidden="true"
                >
                  <circle cx={3} cy={3} r={3} />
                </svg>

                {challengeUser.pivot?.completed
                  ? "Projeto concluído!"
                  : "Você está participando!"}
              </div>
            )}
          </div>
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
