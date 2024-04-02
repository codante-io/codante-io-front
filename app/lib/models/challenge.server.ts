import axios from "axios";
import { currentToken } from "~/lib/services/auth.server";
import type { Tag } from "./tag.server";
import type { Workshop } from "./workshop.server";
import type { ChallengeUser, UserAvatar } from "./user.server";
import { environment } from "./environment";

export type ChallengeDifficulty = "newbie" | "intermediate" | "advanced";
export type ChallengeEstimatedEffort = "1_day" | "2_days" | "1_week";
export type ChallengeCategory = "frontend" | "fullstack";

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
  difficulty: ChallengeDifficulty;
  estimated_effort: ChallengeEstimatedEffort;
  category: ChallengeCategory;
  main_technology: Tag;
  is_premium: boolean;
  duration_in_minutes: number;
  enrolled_users_count: number;
  has_solution: boolean;
  tags: Tag[];
  workshop?: Workshop;
  users?: { avatar_url: string }[];
  pivot?: {
    trackable_type: string;
    completed?: boolean;
  };
  current_user_is_enrolled: boolean;
  current_user_status:
    | null
    | "not-joined"
    | "joined"
    | "forked"
    | "joined-discord"
    | "submitted"
    | "completed";
  resources: {
    name: string;
    type: string;
    url: string;
  }[];
  weekly_featured_start_date: string | null;
  solution_publish_date: string | null;
  is_weekly_featured?: boolean;
};

export type ChallengeCard = {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published" | "soon" | "archived";
  short_description: string;
  image_url: string;
  difficulty: ChallengeDifficulty;
  estimated_effort: ChallengeEstimatedEffort;
  category: ChallengeCategory;
  main_technology: Tag;
  is_premium: boolean;
  tags: Tag[];
  has_solution: boolean;
  avatars: UserAvatar[];
  enrolled_users_count: number;
  current_user_is_enrolled: boolean;
  weekly_featured_start_date: string | null;
  solution_publish_date: string | null;
  is_weekly_featured: boolean;
};

export type ChallengeSummary = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  image_url: string;
  status: "draft" | "published" | "soon" | "archived";
  difficulty: ChallengeDifficulty;
};

export type ChallengeParticipants = {
  count: number;
  avatars: UserAvatar[];
};

export async function getChallenges(
  request: Request,
): Promise<Array<ChallengeCard>> {
  const token = await currentToken({ request });
  const challenges = await axios
    .get(`${environment().API_HOST}/challenges?groupedByTechnology=true`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data);
  return challenges;
}

export async function getChallenge(
  slug: string,
  request: Request,
): Promise<Challenge> {
  const token = await currentToken({ request });

  const challenge = await axios
    .get(`${environment().API_HOST}/challenges/${slug}`, {
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
  slug: string,
  request: Request,
): Promise<ChallengeParticipants> {
  const token = await currentToken({ request });

  const challengeParticipants = await axios
    .get(`${environment().API_HOST}/challenges/${slug}/participants`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
      throw new Error("Erro ao buscar participantes do mini projeto");
    });
  return challengeParticipants;
}

export async function getSubmissionFromGithubUser(
  slug: string,
  githubUser: string,
): Promise<{
  challenge_name: string;
  user_name: string;
  submission_image_url: string;
}> {
  const submission = await axios
    .get(
      `${environment().API_HOST}/challenges/${slug}/submissions/${githubUser}`,
    )
    .then((res) => res.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
      throw new Error("Erro ao buscar submissão pelo usuário do GitHub");
    });
  return submission;
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
        `${environment().API_HOST}/challenges/${slug}/join`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
      .then((res) => res.data);
    return { success: "Sua participação no mini projeto foi registrada." };
  } catch (err) {
    return { error: "Não foi possível registrar sua participação." };
  }
}

export async function userJoinedChallenge(
  slug: string,
  request: Request,
): Promise<ChallengeUser> {
  let token = await currentToken({ request });

  const challengeUser = await axios
    .get<{ data: ChallengeUser }>(
      `${environment().API_HOST}/challenges/${slug}/joined`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
    .then((res) => res.data.data);
  return challengeUser;
}

export async function getUserFork(
  userGithubLogin: string,
  challengeSlug: string,
) {
  const repos = await axios
    .get(`https://api.github.com/repos/codante-io/${challengeSlug}/forks`, {
      headers: {
        Authorization: `BEARER ${environment().GITHUB_PERSONAL_ACCESS_TOKEN}`,
      },
    })
    // .get(`https://api.github.com/repos/miniprojects-io/countdown-timer/forks`)
    .then((res) => res.data);

  const userFork = repos.find(
    (repo: { owner: { login: string } }) =>
      repo.owner.login === userGithubLogin,
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
    .put(`${environment().API_HOST}/challenges/${slug}`, body, {
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
    .get(`${environment().API_HOST}/challenges/${slug}/forked`, {
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

export async function getChallengeUsers(
  request: Request,
  slug: string,
): Promise<ChallengeUser[]> {
  let token = await currentToken({ request });

  const challenge = await axios
    .get(`${environment().API_HOST}/challenges/${slug}/submissions`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
      console.error(e); // eslint-disable-line
      throw new Error("Erro ao buscar as submissões do mini-projeto");
    });
  return challenge;
}

export async function submitChallenge(
  request: Request,
  slug: string,
  submissionUrl: string,
  metadata?: any,
): Promise<{ success?: string; error?: string }> {
  let token = await currentToken({ request });

  return axios
    .post(
      `${environment().API_HOST}/challenges/${slug}/submit`,
      {
        submission_url: submissionUrl,
        metadata,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
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

export async function updateChallengeSubmission(
  request: Request,
  slug: string,
  submissionUrl: string,
  metadata?: any,
): Promise<{ success?: string; error?: string }> {
  let token = await currentToken({ request });

  return axios
    .put(
      `${environment().API_HOST}/challenges/${slug}/submit`,
      {
        submission_url: submissionUrl,
        metadata,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
    .then(() => ({ success: "Submissão atualizada com sucesso." }))
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Não foi possível atualizar a sua submissão. Por favor, tente novamente.",
      };
    });
}
