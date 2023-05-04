import { Link, useLoaderData, useOutletContext } from "@remix-run/react";
import JoinChallengeSection from "../../join-challenge-section";
import RepositoryInfoSection from "~/components/repository-info-section";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import { BsFillPlayFill } from "react-icons/bs";
import VimeoPlayer from "~/components/vimeo-player";

export default function ChallengeIndex() {
  const { challenge, initialSteps, challengeUser, hasSolution } =
    useOutletContext<any>();
  return (
    <div className="container grid grid-cols-3 gap-10">
      <div className="col-span-3 space-y-10 lg:space-y-20 lg:col-span-2">
        <div>
          <h1 className="flex items-center text-2xl font-semibold font-lexend">
            Vídeo de introdução
          </h1>
          <section className="relative mt-4 mb-8">
            <VimeoPlayer vimeoUrl={challenge.video_url} />
          </section>
        </div>
        <div>
          <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend">
            Descrição
          </h1>
          <p className="mt-2 mb-4 font-light font-inter text-md md:text-xl text-start ">
            {challenge?.description}
          </p>
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
              name: challenge?.slug,
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
        <p className="text-sm text-slate-400">
          Esta resolução será publicada em breve!{" "}
          {/* <button className="text-xs underline text-brand">Me avise!</button> */}
        </p>
      )}
      {isAvailable ? (
        <Link to="../resolucao" className="relative">
          <img
            className="relative rounded-lg aspect-video"
            src={thumbnailUrl}
            alt=""
          />
          <span
            className={`absolute m-auto left-0 right-0 top-0 bottom-0
            flex items-center justify-center w-10 h-10 text-gray-700 opacity-80 rounded-full bg-slate-100 ${
              !isAvailable && "cursor-not-allowed"
            }`}
          >
            <BsFillPlayFill size={16} color="#5282FF" />
          </span>
        </Link>
      ) : (
        <div
          className={`relative w-full aspect-video bg-gray-200 dark:bg-gray-800 flex items-center justify-center rounded-lg mt-6 mb-20 ${
            !isAvailable && "cursor-not-allowed"
          }`}
        >
          {!isAvailable && <CardItemRibbon text="Disponível em breve" />}
          <span
            className={`flex items-center justify-center w-8 h-8 text-gray-700 rounded-full bg-slate-100 ${
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
