import type { ChallengeSummary } from "./challenge.server";
import type { Comment } from "./comments.server";
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
  comments: Comment[];
};

export type UserAvatar = {
  badge: "pro" | "admin" | null;
  avatar_url: string;
  name: string;
};
