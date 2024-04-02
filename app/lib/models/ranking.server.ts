import axios from "axios";
import type { UserAvatar } from "./user.server";
import { environment } from "./environment";

type UserPoints = {
  avatar: UserAvatar;
  points: string;
  completed_challenge_count: string;
  received_reaction_count: string;
};

export type Ranking = UserPoints[];

export async function getRanking(monthly: string | null): Promise<Ranking> {
  let url = `${environment().API_HOST}/ranking`;

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
