import type { UserAvatar } from "./user.server";
import { createAxios } from "~/lib/services/axios.server";

type UserPoints = {
  avatar: UserAvatar;
  points: string;
  completed_challenge_count: string;
  received_reaction_count: string;
};

export type Ranking = UserPoints[];

export async function getRanking(monthly: string | null): Promise<Ranking> {
  const axios = await createAxios();
  let url = "/ranking";

  if (monthly) {
    url += `?monthly=${monthly}`;
  }
  const ranking = await axios.get(url).then((res) => res.data.data);

  return ranking.filter(
    (user: UserPoints) =>
      user.completed_challenge_count !== "0" ||
      user.received_reaction_count !== "0",
  );
}
