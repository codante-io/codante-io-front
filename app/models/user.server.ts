export type User = {
  id: number;
  name: string;
  email: string;
  github_id: string;
  avatar_url?: string;
  email_verified_at?: string;
  created_at?: string;
  is_admin?: boolean;
  updated_at?: string;
  is_pro: number;
};

export type ChallengeUser = User & {
  pivot: {
    challenge_id: number;
    user_id: number;
    completed: boolean;
    fork_url: string;
    joined_discord: boolean;
    submission_url: string;
    submission_image_url: string;
  };
};
