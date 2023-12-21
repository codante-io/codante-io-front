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
  user_id: number;
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
  linkedin_user?: string;
};

export type UserAvatar = {
  badge: "pro" | "admin" | null;
  avatar_url: string;
  name: string;
};
