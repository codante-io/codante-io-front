import axios from "axios";
import type { Reactions } from "~/models/reactions.server";
import { currentToken } from "~/services/auth.server";
import type { Tag } from "./tag.server";
import type { Workshop } from "./workshop.server";

export type Challenge = {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published" | "soon" | "archived";
  short_description: string;
  repository_name: string;
  stars?: number;
  forks?: number;
  description?: string;
  image_url: string;
  video_url?: string;
  difficulty: 1 | 2 | 3;
  duration_in_minutes: number;
  enrolled_users_count: number;
  base_color?: string;
  published_at?: string;
  tags: Tag[];
  workshop?: Workshop;
  users?: { avatar_url: string }[];
  pivot?: {
    trackable_type: string;
  };
  current_user_is_enrolled: boolean;
  resources: {
    name: string;
    type: string;
    url: string;
  }[];
};

export type ChallengeCard = {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published" | "soon" | "archived";
  short_description: string;
  image_url: string;
  difficulty: 1 | 2 | 3;
  tags: Tag[];
  has_workshop: boolean;
  users?: { avatar_url: string; is_pro: number }[];
  enrolled_users_count: number;
  current_user_is_enrolled: boolean;
};

export type ChallengeParticipants = {
  count: number;
  avatars: { avatar_url: string; is_pro: number }[];
};

export type ChallengeSubmission = {
  id: string;
  user_name: string;
  user_avatar_url: string;
  user_github_user: string;
  submission_url: string;
  submission_image_url: string;
  reactions: Reactions;
  is_pro: 0 | 1;
};

export async function getChallenges(
  request: Request
): Promise<Array<ChallengeCard>> {
  const token = await currentToken({ request });
  const challenges = await axios
    .get(`${process.env.API_HOST}/challenges`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data);
  return challenges;
}

export async function getChallenge(
  slug: string,
  request: Request
): Promise<Challenge> {
  const token = await currentToken({ request });

  const challenge = await axios
    .get(`${process.env.API_HOST}/challenges/${slug}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
      throw new Error("Erro ao buscar o mini projeto");
    });
  return challenge;
}

export async function getChallengeParticipants(
  slug: string
): Promise<ChallengeParticipants> {
  const challengeParticipants = await axios
    .get(`${process.env.API_HOST}/challenges/${slug}/participants`)
    .then((res) => res.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
      throw new Error("Erro ao buscar participantes do mini projeto");
    });
  return challengeParticipants;
}

export async function joinChallenge({
  slug,
  request,
}: {
  slug: string;
  request: Request;
}): Promise<{ success?: string; error?: string }> {
  try {
    let token = await currentToken({ request });

    await axios
      .post(
        `${process.env.API_HOST}/challenges/${slug}/join`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => res.data);
    return { success: "Sua participação no mini projeto foi registrada." };
  } catch (err) {
    return { error: "Não foi possível registrar sua participação." };
  }
}

export async function userJoinedChallenge(
  slug: string,
  request: Request
): Promise<Challenge> {
  let token = await currentToken({ request });

  const challengeUser = await axios
    .get(`${process.env.API_HOST}/challenges/${slug}/joined`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);
  return challengeUser;
}

export async function getUserFork(
  userGithubLogin: string,
  challengeSlug: string
) {
  const repos = await axios
    .get(`https://api.github.com/repos/codante-io/${challengeSlug}/forks`, {
      headers: {
        Authorization: `BEARER ${process.env.GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    })
    // .get(`https://api.github.com/repos/miniprojects-io/countdown-timer/forks`)
    .then((res) => res.data);

  const userFork = repos.find(
    (repo: { owner: { login: string } }) => repo.owner.login === userGithubLogin
  );

  return userFork;
}

export async function updateChallengeUser({
  slug,
  body,
  request,
}: {
  slug: string;
  body: { fork_url?: string; joined_discord?: boolean; completed?: boolean };
  request: Request;
}): Promise<Challenge> {
  let token = await currentToken({ request });

  const challengeUser = await axios
    .put(`${process.env.API_HOST}/challenges/${slug}`, body, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data);
  return challengeUser;
}

export async function verifyAndUpdateForkURL({
  slug,
  request,
}: {
  slug: string;
  request: Request;
}): Promise<{ success?: string; error?: string }> {
  let token = await currentToken({ request });

  const hasForked = await axios
    .get(`${process.env.API_HOST}/challenges/${slug}/forked`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data);

  return hasForked
    ? { success: "Fork encontrado." }
    : { error: "Não encontramos o seu fork. Tente novamente" };
}

export async function updateUserJoinedDiscord({
  slug,
  joinedDiscord,
  request,
}: {
  slug: string;
  joinedDiscord: boolean;
  request: Request;
}): Promise<{ success?: string; error?: string }> {
  try {
    await updateChallengeUser({
      slug,
      body: { joined_discord: joinedDiscord },
      request,
    });

    return { success: "Passo concluído." };
  } catch (err) {
    return {
      error:
        "Não foi possível concluir este passo. Por favor, tente novamente.",
    };
  }
}

export async function updateChallengeCompleted({
  slug,
  completed,
  request,
}: {
  slug: string;
  completed: boolean;
  request: Request;
}): Promise<{ success?: string; error?: string }> {
  try {
    await updateChallengeUser({
      slug,
      body: { completed },
      request,
    });

    return { success: "Parabéns! Você concluiu esse mini-projeto." };
  } catch (err) {
    return {
      error:
        "Não foi possível concluir este passo. Por favor, tente novamente.",
    };
  }
}

export async function getChallengeSubmissions(
  request: Request,
  slug: string
): Promise<ChallengeSubmission[]> {
  let token = await currentToken({ request });

  const challenge = await axios
    .get(`${process.env.API_HOST}/challenges/${slug}/submissions`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
      throw new Error("Erro ao buscar as submissões do mini-projeto");
    });
  return challenge;
}

export async function submitChallenge(
  request: Request,
  slug: string,
  submissionUrl: string
): Promise<{ success?: string; error?: string }> {
  let token = await currentToken({ request });

  return axios
    .post(
      `${process.env.API_HOST}/challenges/${slug}/submit`,
      {
        submission_url: submissionUrl,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then(() => ({ success: "Submissão registrada com sucesso." }))
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Não foi possível submeter o seu mini projeto. Por favor, tente novamente.",
      };
    });
}
