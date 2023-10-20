import axios from "axios";
import type { Instructor } from "./instructor.server";
import type { Lesson } from "./lesson.server";
import type { Tag } from "./tag.server";
import { currentToken } from "~/services/auth.server";

export type Workshop = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  status: "draft" | "published" | "soon" | "archived";
  description: string;
  image_url?: string;
  video_url?: string;
  difficulty: 1 | 2 | 3;
  duration_in_minutes: number;
  published_at?: string;
  resources: {
    name: string;
    type: string;
    url: string;
  }[];
  instructor: Instructor;
  is_standalone: boolean;
  lessons: Lesson[];
  tags: Tag[];
  pivot?: {
    trackable_type: string;
  };
};

export async function getWorkshops(): Promise<Array<Workshop>> {
  const workshops = await axios
    .get(`${process.env.API_HOST}/workshops`)
    .then((res) => res.data.data);
  return workshops;
}

export async function getWorkshop(
  slug: string,
  request: any
): Promise<Workshop | null> {
  const token = await currentToken({ request });
  const workshop = await axios
    .get(`${process.env.API_HOST}/workshops/${slug}`, {
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
