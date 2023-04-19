import axios from "axios";

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
  tags: any[];
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
    .then((res) => res.data.data);
  return challenge;
}
