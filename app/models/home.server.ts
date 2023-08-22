import axios from "axios";
import type { Workshop } from "./workshop.server";
import type { ChallengeCard } from "./challenge.server";

export type HomeInfo = {
  featured_workshops: Workshop[];
  featured_challenges: ChallengeCard[];

  // @TODO: remove this when we have a proper type for featured tracks
  featured_tracks: any[];
};

export async function getHome(): Promise<HomeInfo> {
  const homeInfo = await axios
    .get(`${process.env.API_HOST}/home`)
    .then((res) => res.data);
  return homeInfo;
}
