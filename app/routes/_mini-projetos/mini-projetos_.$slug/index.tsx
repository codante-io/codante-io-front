import type { LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import type { AxiosError } from "axios";
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
} from "~/models/challenge.server";
import { logout, user as getUser } from "~/services/auth.server";
import { buildInitialSteps, getUserFork } from "./challenges.server";
import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { abort404 } from "~/utils/responses.server";
import NotFound from "~/components/not-found";

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
  const challenge = await getChallenge(params.slug);

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
    initialSteps: buildInitialSteps({
      user,
      challengeUser,
      repositoryUrl: challenge.repository_url,
    }),
  });
};

export default function ChallengeSlug() {
  const { challenge, initialSteps, user } = useLoaderData<typeof loader>();
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
          <CardItemDifficulty difficulty={2} className="mb-2" />

          <h1 className="flex items-center text-3xl font-light font-lexend">
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
              <div className="w-full h-[310px] sm:h-[436px] md:h-[510px] bg-black flex items-center justify-center rounded-lg mt-4 mb-8">
                <button className="flex items-center justify-center w-12 h-12 text-gray-700 rounded-full bg-slate-100">
                  <BsFillPlayFill size={24} color="#5282FF" />
                </button>
              </div>
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
              <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend">
                Participar
              </h1>
              <JoinChallengeSection initialSteps={initialSteps} user={user} />
            </div>

            <div>
              <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend">
                Repositório
              </h1>
              <RepositoryInfoSection
                repository={{
                  organization: "codante-io",
                  name: "countdown-timer",
                  stars: 36,
                  forks: 231,
                }}
              />
            </div>
            <div>
              <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend">
                Resolução
              </h1>
              <div className="w-full h-[180px] bg-black flex items-center justify-center rounded-lg mt-4 mb-20">
                <button className="flex items-center justify-center w-8 h-8 text-gray-700 rounded-full bg-slate-100">
                  <BsFillPlayFill size={16} color="#5282FF" />
                </button>
              </div>
            </div>
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
          <h1 className="flex justify-center mt-24 text-2xl font-light text-center font-lexend">
            <span>
              Junte-se a outras <span className="font-bold"> 36 pessoas </span>{" "}
              que estão fazendo esse mini projeto.
            </span>
          </h1>
          <ParticipantsSection />
        </div>
      </section>
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
      <h1>Ops...</h1>
      <p>Something went wrong.</p>
    </div>
  );
}
