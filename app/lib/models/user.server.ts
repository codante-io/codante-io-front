import axios from "axios";
import type { Certificate } from "./certificates.server";
import type { ChallengeSummary } from "./challenge.server";
import type { Comment } from "./comments.server";
import type { Reactions } from "./reactions.server";
import { currentToken } from "../services/auth.server";
import { environment } from "./environment";

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
  created_at: string;
  updated_at: string;
  certificate: Certificate | null;
  comments: Comment[];
};

export type UserAvatar = {
  badge: "pro" | "admin" | null;
  avatar_url: string;
  name: string;
};

export async function impersonate(
  request: any,
  userId: string,
): Promise<string | null> {
  const token = await currentToken({ request });
  return axios
    .post(
      `${environment().API_HOST}/impersonate`,
      {
        user_id: userId,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
    .then((res) => res.data.token)
    .catch((error) => {
      return {
        error: error,
      };
    });
}
