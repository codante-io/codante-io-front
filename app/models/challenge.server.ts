import axios from "axios";
import { currentToken, user } from "~/services/auth.server";
import type { Tag } from "./tag.server";
import type { Workshop } from "./workshop.server";

export type ChallengeCardInfo = {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published" | "soon" | "archived";
  short_description: string;
  repository_url: string;
  description?: string;
  image_url: string;
  video_url?: string;
  difficulty: 1 | 2 | 3;
  duration_in_minutes: number;
  enrolled_users_count: number;
  tags: Tag[];
  workshop?: Workshop;
};

export type ChallengeParticipants = {
  count: number;
  avatars: string[];
};

export async function getChallenges(): Promise<Array<ChallengeCardInfo>> {
  const challenges = await axios
    .get(`${process.env.API_HOST}/challenges`)
    .then((res) => res.data.data);
  return challenges;
}

export async function getChallenge(slug: string): Promise<ChallengeCardInfo> {
  const challenge = await axios
    .get(`${process.env.API_HOST}/challenges/${slug}`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
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
): Promise<ChallengeCardInfo> {
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
}): Promise<ChallengeCardInfo> {
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
  githubUser,
  request,
}: {
  slug: string;
  githubUser: string;
  request: Request;
}): Promise<{ success?: string; error?: string }> {
  const userFork = await getUserFork(githubUser, slug);

  if (!userFork) return { error: "Não encontramos o seu fork." };

  try {
    await updateChallengeUser({
      slug,
      body: { fork_url: userFork.html_url },
      request,
    });

    return { success: "Encontramos e registramos o seu fork." };
  } catch (err) {
    return {
      error:
        "Não foi possível registrar o seu fork. Por favor, tente novamente.",
    };
  }
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

    return { success: "Parabéns! Você concluiu esse mini projeto." };
  } catch (err) {
    return {
      error:
        "Não foi possível concluir este passo. Por favor, tente novamente.",
    };
  }
}
