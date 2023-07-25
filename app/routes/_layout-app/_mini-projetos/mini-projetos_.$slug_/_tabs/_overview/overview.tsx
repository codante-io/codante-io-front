import { Link } from "@remix-run/react";
import JoinChallengeSection from "../../join-challenge-section";
import RepositoryInfoSection from "~/components/repository-info-section";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import { BsFillPlayFill } from "react-icons/bs";
import VimeoPlayer from "~/components/vimeo-player";
import MarkdownRenderer from "~/components/markdown-renderer";

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
      <div className="col-span-3 space-y-10 lg:space-y-20 lg:col-span-1">
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

        <div>
          <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend">
            Repositório
          </h1>
          <RepositoryInfoSection
            repository={{
              organization: "codante-io",
              name: challenge.repository_name,
              forks: challenge?.forks,
              stars: challenge?.stars,
            }}
          />
        </div>
        <ResolutionSection
          isAvailable={hasSolution}
          thumbnailUrl={challenge.workshop?.image_url}
        />
      </div>
    </div>
  );
}

function ResolutionSection({
  isAvailable,
  thumbnailUrl,
}: {
  isAvailable: boolean;
  thumbnailUrl?: string;
}) {
  return (
    <div>
      <h1 className="flex items-center mb-2 text-2xl font-semibold font-lexend">
        Resolução
      </h1>
      {!isAvailable && (
        <p className="text-sm text-gray-400">
          Esta resolução será publicada em breve!{" "}
          {/* <button className="text-xs underline text-brand">Me avise!</button> */}
        </p>
      )}
      {isAvailable ? (
        <Link to="../resolucao" className="relative">
          <img
            className="relative w-full rounded-lg aspect-video"
            src={thumbnailUrl}
            alt=""
          />
        </Link>
      ) : (
        <div
          className={`relative w-full aspect-video max-w-full max-h-full bg-background-200 dark:bg-background-800 flex items-center justify-center rounded-lg mt-6 mb-20 ${
            !isAvailable && "cursor-not-allowed"
          }`}
        >
          {!isAvailable && <CardItemRibbon text="Disponível em breve" />}
          <span
            className={`flex items-center justify-center w-8 h-8 text-gray-700 rounded-full bg-background-100 ${
              !isAvailable && "cursor-not-allowed"
            }`}
          >
            <BsFillPlayFill size={16} color="#5282FF" />
          </span>
        </div>
      )}
    </div>
  );
}
