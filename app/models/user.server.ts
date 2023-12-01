import type { Reactions } from "./reactions.server";

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
};

export type ChallengeUser = {
  id: string;
  user_name: string;
  user_github_user: string;
  submission_url: string;
  fork_url: string | null;
  is_pro: boolean;
  submission_image_url: string;
  reactions: Reactions;
  avatar: UserAvatar;
  is_solution: boolean;
  created_at: string;
  updated_at: string;
};

export type UserAvatar = {
  badge: "pro" | "admin" | null;
  avatar_url: string;
  name: string;
};
