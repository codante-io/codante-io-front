import type { Tag } from "./tag.server";
import type { Workshop } from "./workshop.server";
import type { ChallengeUser, UserAvatar } from "./user.server";
import type { TrackablePivot } from "~/lib/models/track.server";
import { createAxios } from "~/lib/services/axios.server";
import { SidebarLesson } from "~/routes/_layout-raw/_player/components/sidebar/types";

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
  pivot?: TrackablePivot;
  completed?: boolean;
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
  solution: {
    lesson_sections: {
      name: string;
      lesson_ids: number[];
    }[];
    lessons: SidebarLesson[];
    first_unwatched_lesson: SidebarLesson;
  };
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
  pivot?: TrackablePivot;
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

export type ChallengesByTechnology = {
  technologies: {
    name: string;
    image_url: string;
    challenges: ChallengeCard[];
  }[];

  filters: {
    technologies: Tag[];
  };
};

type GetChallengeArgs = {
  tech: string;
  request: Request;
};

export async function getChallenges({
  tech,
  request,
}: GetChallengeArgs): Promise<{
  challenges: ChallengeCard[];
  featuredChallenge: ChallengeCard;
}> {
  const axios = await createAxios(request);

  if (!tech) {
    const data = await axios.get("/challenges").then((res) => res.data.data);
    return {
      challenges: data.challenges,
      featuredChallenge: data.featuredChallenge,
    };
  }

  const data = await axios
    .get(`/challenges?tecnologia=${tech}`)
    .then((res) => res.data.data);
  return {
    challenges: data.challenges,
    featuredChallenge: data.featuredChallenge,
  };
}

export async function getChallenge(
  slug: string,
  request: Request,
): Promise<Challenge> {
  const axios = await createAxios(request);
  const challenge = await axios
    .get(`/challenges/${slug}`)
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
  const axios = await createAxios(request);
  const challengeParticipants = await axios
    .get(`/challenges/${slug}/participants`)
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
  const axios = await createAxios();

  const submission = await axios
    .get(`/challenges/${slug}/submissions/${githubUser}`)
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
    const axios = await createAxios(request);
    await axios.post(`/challenges/${slug}/join`);
    return { success: "Sua participação no mini projeto foi registrada." };
  } catch {
    return { error: "Não foi possível registrar sua participação." };
  }
}

export async function userJoinedChallenge(
  slug: string,
  request: Request,
): Promise<ChallengeUser> {
  const axios = await createAxios(request);

  const challengeUser = await axios
    .get<{ data: ChallengeUser }>(`/challenges/${slug}/joined`)
    .then((res) => res.data.data);
  return challengeUser;
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
  const axios = await createAxios(request);

  const challengeUser = await axios
    .put(`/challenges/${slug}`, body)
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
  const axios = await createAxios(request);

  const hasForked = await axios
    .get(`/challenges/${slug}/forked`)
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
  } catch {
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
  } catch {
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
  const axios = await createAxios(request);

  const challenge = await axios
    .get(`/challenges/${slug}/submissions`)
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
  const axios = await createAxios(request);

  return axios
    .post(`/challenges/${slug}/submit`, {
      submission_url: submissionUrl,
      metadata,
    })
    .then(() => ({ success: "Submissão registrada com sucesso." }))
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Não foi possível submeter o seu mini projeto. Por favor, tente novamente.",
      };
    });
}

export async function submitChallengeWithoutDeploy(
  request: Request,
  slug: string,
  submissionImage: FormDataEntryValue | null,
): Promise<{ success?: string; error?: string }> {
  const axios = await createAxios(request);

  const form = new FormData();
  form.append("submission_image", submissionImage as File);

  return axios
    .post(`/challenges/${slug}/submit-without-deploy`, form, {
      headers: {
        "Content-Type": "multipart/form-data", // important!
      },
    })
    .then(() => {
      return { success: "Submissão registrada com sucesso." };
    })
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
  const axios = await createAxios(request);

  return axios
    .put(`/challenges/${slug}/submit`, {
      submission_url: submissionUrl,
      metadata,
    })
    .then(() => ({ success: "Submissão atualizada com sucesso." }))
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Não foi possível atualizar a sua submissão. Por favor, tente novamente.",
      };
    });
}
