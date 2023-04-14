export type ChallengeCardInfo = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  image_url: string;
  difficulty: 1 | 2 | 3;
  duration_in_minutes: string;
  enrolled_users_count: number;
  tags: string[];
};
