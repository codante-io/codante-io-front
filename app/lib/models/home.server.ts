import type { WorkshopCard } from "./workshop.server";
import type { ChallengeCard } from "./challenge.server";
import type { ChallengeUser, UserAvatar } from "./user.server";
import { createAxios } from "~/lib/services/axios.server";

export type HomeInfo = {
  featured_testimonials: {
    avatar_url: string;
    body: string;
    name: string;
    featured: string;
    social_media_link: string;
    social_media_nickname: string;
  }[];
  featured_submissions: ChallengeUser[];
  avatar_section: {
    avatars: UserAvatar[];
    user_count: number;
  };
  live_streaming_workshop: {
    id: number;
    name: string;
    slug: string;
  } | null;
  featured_workshops: WorkshopCard[];
  featured_challenges: ChallengeCard[];
  submission_count: number;
  plan_info: {
    id: number;
    name: string;
    price_in_cents: number;
    slug: string;
    details: string;
  };

  // @TODO: remove this when we have a proper type for featured tracks
  featured_tracks: any[];
};

export async function getHome(): Promise<HomeInfo> {
  const axios = await createAxios();
  const homeInfo = await axios.get("/home").then((res) => res.data);
  return homeInfo;
}
