import type { Certificate } from "./certificates.server";
import type { ChallengeSummary } from "./challenge.server";
import type { Comment } from "./comments.server";
import type { Reactions } from "./reactions.server";
import { createAxios } from "~/lib/services/axios.server";

export type User = {
  id: number;
  name: string;
  email: string;
  github_id: string;
  email_verified_at?: string;
  created_at?: string;
  is_admin?: boolean;
  updated_at?: string;
  is_pro: boolean;
  avatar: UserAvatar;
  settings: UserSettings | null;
  linkedin_user?: string;
  discord_user?: string;
  github_user?: string;
};

export type UserSettings = {
  show_badge: boolean;
};

export type ChallengeUser = {
  id: number;
  user: User;
  challenge: ChallengeSummary;
  joined_discord: boolean;
  completed: boolean;
  completed_at: string;
  submission_url: string;
  fork_url: string | null;
  submission_image_url: string;
  reactions: Reactions;
  avatar: UserAvatar;
  is_solution: boolean;
  submitted_at: string | null;
  created_at: string;
  updated_at: string;
  certificate: Certificate | null;
  comments: Comment[];
  listed: boolean;
};

export type UserAvatar = {
  badge: "pro" | "admin" | null;
  avatar_url: string;
  name: string;
  github_user?: string;
};

export type UserProfile = {
  user: {
    name: string;
    github_user: string;
    linkedin_user: string | null;
    avatar: UserAvatar;
    created_at: string;
  };
  stats: {
    points: number;
    completed_challenge_count: number;
    received_reaction_count: number;
  };
  completed_challenges: ProfileChallengeSubmission[];
  certificates: ProfileCertificate[];
};

export type ProfileChallengeSubmission = {
  id: number;
  submission_image_url: string;
  submission_url: string;
  submitted_at: string;
  challenge: {
    name: string;
    slug: string;
    image_url: string;
  };
};

export type ProfileCertificate = {
  id: string;
  metadata: {
    certifiable_source_name: string;
    certifiable_slug: string;
    [key: string]: unknown;
  };
  status: string;
  created_at: string;
};

export async function getUserProfile(
  githubUser: string,
): Promise<UserProfile | null> {
  const axios = await createAxios();
  return axios
    .get(`/users/${githubUser}/profile`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response?.status === 404) return null;
      throw e;
    });
}

export async function impersonate(
  request: any,
  userId: string,
): Promise<string | null> {
  const axios = await createAxios(request);
  return axios
    .post("/impersonate", {
      user_id: userId,
    })
    .then((res) => res.data.token)
    .catch((error) => {
      return {
        error: error,
      };
    });
}
