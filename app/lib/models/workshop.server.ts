import axios from "axios";
import type { Instructor } from "./instructor.server";
import type { Lesson } from "./lesson.server";
import type { Tag } from "./tag.server";
import type { Certificate } from "./certificates.server";
import type { TrackablePivot } from "~/lib/models/track.server";
import { currentToken } from "~/lib/services/auth.server";
import { environment } from "./environment";
import type { Challenge } from "~/lib/models/challenge.server";

export type WorkshopUser = {
  id: number;
  workshop_id: number;
  user_id: number;
  status: "in-progress" | "completed";
  completed_at: string;
  created_at: string;
  updated_at: string;
  certificate: Certificate;
};

export type Workshop = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  status: "draft" | "published" | "soon" | "archived" | "streaming";
  description: string;
  image_url?: string;
  video_url?: string;
  difficulty: 1 | 2 | 3;
  duration_in_minutes: number;
  published_at?: string;
  streaming_url?: string | null;
  resources: {
    name: string;
    type: string;
    url: string;
  }[];
  instructor: Instructor;
  is_standalone: boolean;
  lesson_sections?: {
    name: string;
    lessons: string[];
  }[];
  lessons: Lesson[];
  tags: Tag[];
  next_lesson: Lesson | null;
  challenge?: Challenge;

  workshop_user: WorkshopUser;
  pivot?: TrackablePivot;
  completed?: boolean;
  is_premium?: boolean;
};

export type WorkshopCard = {
  id: string;
  name: string;
  slug: string;
  video_url?: string;
  duration_in_seconds: number;
  status: string;
  is_standalone: boolean;
  is_premium: boolean;
  lessons_count: number;
  instructor: {
    id: number;
    name: string;
    company: string;
    avatar_url: string;
  };
  published_at?: string;
  streaming_url?: string | null;
};

export async function getWorkshops(): Promise<Array<WorkshopCard>> {
  const workshops = await axios
    .get(`${environment().API_HOST}/workshops`)
    .then((res) => res.data.data);
  return workshops;
}

export async function getWorkshop(
  slug: string,
  request: any,
): Promise<Workshop | null> {
  const token = await currentToken({ request });
  const workshop = await axios
    .get(`${environment().API_HOST}/workshops/${slug}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
  return workshop;
}

export async function userEnteredWorkshop(
  slug: string,
  request: any,
): Promise<Workshop | null> {
  const token = await currentToken({ request });
  const workshop = await axios
    .post(
      `${environment().API_HOST}/workshops/${slug}/user-entered`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
    .then((res) => res.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
  return workshop;
}
