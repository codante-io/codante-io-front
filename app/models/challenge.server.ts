import axios from "axios";
import type { Tag } from "./tag.server";

export type ChallengeCardInfo = {
  id: string;
  name: string;
  slug: string;
  status: "draft" | "published" | "soon" | "archived";
  short_description: string;
  description?: string;
  image_url: string;
  video_url?: string;
  difficulty: 1 | 2 | 3;
  duration_in_minutes: number;
  enrolled_users_count: number;
  tags: Tag[];
};

export async function getChallenges(): Promise<Array<ChallengeCardInfo>> {
  const challenges = await axios
    .get(`${process.env.API_HOST}/challenges`)
    .then((res) => res.data.data);
  return challenges;
}

export async function getChallenge(slug: string): Promise<ChallengeCardInfo> {
  const challenge = await axios
    .get(`${process.env.API_HOST}/challenges/${slug}`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
  return challenge;
}
