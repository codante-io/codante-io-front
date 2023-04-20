import type { Tag } from "./tag.server";

export type ChallengeCardInfo = {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published" | "soon" | "archived";
  short_description: string;
  image_url: string;
  difficulty: 1 | 2 | 3;
  duration_in_minutes: string;
  enrolled_users_count: number;
  tags: Tag[];
};
