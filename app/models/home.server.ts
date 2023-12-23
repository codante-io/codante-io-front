import axios from "axios";
import type { Workshop } from "./workshop.server";
import type { ChallengeCard } from "./challenge.server";
import type { UserAvatar } from "./user.server";
import { environment } from "./environment.server";

export type HomeInfo = {
  featured_testimonials: {
    avatar_url: string;
    body: string;
    name: string;
    featured: string;
    social_media_link: string;
    social_media_nickname: string;
  }[];
  featured_submissions: {
    id: number;
    submission_image_url: string;
    avatar: UserAvatar;
    challenge: {
      name?: string;
      slug: string;
    };
    user_github_user: string;
  }[];
  avatar_section: {
    avatars: UserAvatar[];
    user_count: number;
  };
  live_streaming_workshop: {
    id: number;
    name: string;
    slug: string;
  } | null;
  featured_workshops: Workshop[];
  featured_challenges: ChallengeCard[];
  plan_info: {
    id: number;
    name: string;
    price_in_cents: number;
    slug: string;
  };

  // @TODO: remove this when we have a proper type for featured tracks
  featured_tracks: any[];
};

export async function getHome(): Promise<HomeInfo> {
  const homeInfo = await axios
    .get(`${environment().API_HOST}/home`)
    .then((res) => res.data);
  return homeInfo;
}
