import type { Instructor } from "./instructor.server";
import type { Lesson, LessonsGroupedBySection } from "./lesson.server";
import type { Tag } from "./tag.server";
import type { Certificate } from "./certificates.server";
import type { TrackablePivot } from "~/lib/models/track.server";
import type { Challenge } from "~/lib/models/challenge.server";
import { createAxios } from "~/lib/services/axios.server";

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
  lessons: LessonsGroupedBySection;
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
  pivot?: {
    status: string;
    completed_at: string;
    started_at: string;
    percentage_completed: number;
  };
};

export async function getWorkshops({
  tech,
}: {
  tech: string;
}): Promise<Array<WorkshopCard>> {
  const axios = await createAxios();

  if (tech === "") {
    const workshops = await axios
      .get("/workshops")
      .then((res) => res.data.data);
    return workshops;
  }

  const workshops = await axios
    .get(`/workshops?tecnologia=${tech}`)
    .then((res) => res.data.data);
  return workshops;
}

export async function getWorkshop(
  slug: string,
  request: any,
): Promise<Workshop | null> {
  const axios = await createAxios(request);
  const workshop = await axios
    .get(`/workshops/${slug}`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
  return workshop;
}

export async function userJoinedWorkshop(
  slug: string,
  request: any,
): Promise<{ message?: string }> {
  const axios = await createAxios(request);
  return axios
    .post(`/workshops/${slug}/joined`)
    .then((res) => res.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }

      return e;
    });
}
