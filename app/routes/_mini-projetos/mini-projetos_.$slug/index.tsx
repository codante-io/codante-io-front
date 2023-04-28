import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { BsFillPlayFill } from "react-icons/bs";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import invariant from "tiny-invariant";
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";

import CardItemDifficulty from "~/components/cards/card-item-difficulty";
import JoinChallengeSection from "./join-challenge-section";
import ParticipantsSection from "./participants-section";

import RepositoryInfoSection from "~/components/repository-info-section";
import { useColorMode } from "~/contexts/color-mode-context";
import {
  getChallenge,
  joinChallenge,
  updateChallengeCompleted,
  updateUserJoinedDiscord,
  userJoinedChallenge,
  verifyAndUpdateForkURL,
  getChallengeParticipants,
} from "~/models/challenge.server";
import { logout, user as getUser } from "~/services/auth.server";
import { buildInitialSteps } from "./build-steps.server";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { abort404 } from "~/utils/responses.server";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import NotFound from "~/components/errors/not-found";
import { Error500 } from "~/components/errors/500";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const intent = formData.get("intent") as string;
  const redirectTo = formData.get("redirectTo") as string;
  const slug = redirectTo.split("/")[2];
  const user = await getUser({ request });

  switch (intent) {
    case "connect-github":
      return logout({ request, redirectTo: `/login?redirectTo=${redirectTo}` });
    case "join-challenge":
      return joinChallenge({ request, slug });
    case "verify-fork":
      return verifyAndUpdateForkURL({
        slug,
        githubUser: user.github_user,
        request,
      });
    case "join-discord":
      return updateUserJoinedDiscord({
        slug,
        joinedDiscord: true,
        request,
      });
    case "finish-challenge":
      return updateChallengeCompleted({
        slug,
        completed: true,
        request,
      });
  }
}

export const loader = async ({ params, request }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  const [challenge, participants] = await Promise.all([
    getChallenge(params.slug),
    getChallengeParticipants(params.slug),
  ]);

  if (!challenge) {
    abort404();
  }

  const user = await getUser({ request });

  let challengeUser;
  if (user) {
    try {
      challengeUser = await userJoinedChallenge(params.slug, request);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err?.response?.status) challengeUser = null;
      }
    }
  }

  return json({
    user,
    slug: params.slug,
    challenge,
    participants,

    challengeUser,
    initialSteps: buildInitialSteps({
      user,
      challengeUser,
      repositoryUrl: challenge.repository_url,
    }),
  });
};

export default function ChallengeSlug() {
  const { challenge, initialSteps, participants, challengeUser } =
    useLoaderData<typeof loader>();
  const actionData = useActionData();
  const { colorMode } = useColorMode();

  useEffect(() => {
    if (actionData?.error) {
      toast.error(actionData?.error);
    }

    if (actionData?.success) {
      toast.success(actionData?.success);
    }
  }, [actionData]);

  return (
    <div className="flex flex-col items-center justify-center -mb-10 text-gray-900 dark:text-white">
      <section
        id="title"
        className="flex flex-col items-center w-full mb-16 text-gray-800 bg-transparent dark:text-white"
      >
        <div className="container">
          <CardItemDifficulty
            difficulty={challenge?.difficulty}
            className="mb-2"
          />

          <h1 className="flex items-center justify-between text-3xl font-light font-lexend">
            <span>
              <MdKeyboardDoubleArrowRight
                size={24}
                className="inline mr-2 text-blue-300 dark:text-blue-900"
              />
              <span className="font-extralight">Projeto</span>{" "}
              <span className="font-bold underline decoration-solid">
                {challenge.name}
              </span>
            </span>
          </h1>
          <p className="mt-2 mb-4 font-light font-inter text-md md:text-xl text-start">
            {challenge.short_description}
          </p>
        </div>
        <div className="container grid grid-cols-12 gap-10 mt-10">
          <div className="col-span-12 space-y-20 lg:col-span-8">
            <div>
              <h1 className="flex items-center text-2xl font-semibold font-lexend">
                Vídeo de introdução
              </h1>
              <section className="relative mt-4 mb-8">
                <div className="relative aspect-video">
                  <div className="absolute top-0 z-0 w-full overflow-hidden opacity-1 lg:rounded-xl">
                    <div
                      style={{ padding: "56.30% 0 0 0", position: "relative" }}
                    >
                      <iframe
                        src="https://player.vimeo.com/video/238455692"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        style={{
                          position: "absolute",
                          top: "0",
                          left: "0",
                          width: "100%",
                          height: "100%",
                        }}
                        title="C0193vid007-1"
                      ></iframe>
                    </div>
                    <script src="https://player.vimeo.com/api/player.js"></script>
                  </div>
                </div>
              </section>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend">
                Descrição
              </h1>
              <p className="mt-2 mb-4 font-light font-inter text-md md:text-xl text-start ">
                {challenge?.description}
              </p>
            </div>
          </div>
          <div className="col-span-12 space-y-20 lg:col-span-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold font-lexend">
                  {challengeUser ? "Seu progresso" : "Participe"}
                </h1>
                {challengeUser && (
                  <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-100 px-1.5 py-0.5 text-xs font-medium text-green-700 shadow-sm">
                    <svg
                      className="h-1.5 w-1.5 fill-green-500 animate-pulse"
                      viewBox="0 0 6 6"
                      aria-hidden="true"
                    >
                      <circle cx={3} cy={3} r={3} />
                    </svg>
                    Você está ativo!
                  </span>
                )}
              </div>
              <JoinChallengeSection initialSteps={initialSteps} />
            </div>

            <div>
              <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend">
                Repositório
              </h1>
              <RepositoryInfoSection
                repository={{
                  organization: "codante-io",
                  name: challenge?.slug,
                  stars: challenge?.stars,
                  forks: challenge?.forks,
                }}
              />
            </div>
            <ResolutionSection
              isAvailable={challenge?.workshop?.status === "published"}
            />
          </div>
        </div>
      </section>

      {colorMode && (
        <img
          src={`/img/wave-top-${colorMode}.svg`}
          className="relative w-full"
          alt="Wave detail"
        />
      )}
      <section
        id="mini-projects"
        className="flex justify-center w-full text-gray-800 dark:bg-slate-800 bg-slate-100 dark:text-white"
      >
        <div className="container relative -top-12">
          <ParticipantsSection participants={participants} />
        </div>
      </section>
    </div>
  );
}

function ResolutionSection({ isAvailable }: { isAvailable: boolean }) {
  return (
    <div>
      <h1 className="flex items-center mb-2 text-2xl font-semibold font-lexend">
        Resolução
      </h1>
      {!isAvailable && (
        <p className="text-sm text-slate-400">
          Esta resolução será publicada em breve!{" "}
          <button className="text-xs underline text-brand">Me avise!</button>
        </p>
      )}
      <Link to="resolucao">
        <div
          className={`relative w-full h-[250px] sm:h-[400px] lg:h-[210px] bg-black flex items-center justify-center rounded-lg mt-6 mb-20 ${
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
      </Link>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return (
    <div>
      <Error500 />
    </div>
  );
}
