import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import axios from "axios";
import React, { useEffect } from "react";
import invariant from "tiny-invariant";
import {
  getChallenge,
  getChallengeParticipants,
  getUserFork,
  joinChallenge,
  updateChallengeCompleted,
  updateUserJoinedDiscord,
  userJoinedChallenge,
  verifyAndUpdateForkURL,
} from "~/models/challenge.server";
import { logout } from "~/services/auth.server";
import { logout, user as getUser } from "~/services/auth.server";
import { abort404 } from "~/utils/responses.server";
import { buildInitialSteps } from "../../build-steps.server";
import { Link, useActionData, useLoaderData } from "@remix-run/react";
import { useColorMode } from "~/contexts/color-mode-context";
import { toast } from "react-hot-toast";
import JoinChallengeSection from "../../join-challenge-section";
import RepositoryInfoSection from "~/components/repository-info-section";
import CardItemRibbon from "~/components/cards/card-item-ribbon";
import { BsFillPlayFill } from "react-icons/bs";

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

export default function ChallengeIndex() {
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
    <div className="container">
      <h1 className="flex items-center text-2xl font-semibold font-lexend">
        Resolução
      </h1>
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
