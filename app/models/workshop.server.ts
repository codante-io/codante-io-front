import axios from "axios";
import type { Instructor } from "./instructor.server";
import type { Lesson } from "./lesson.server";

export type Workshop = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  status: "draft" | "published" | "soon" | "archived";
  description: string;
  imageUrl?: string;
  difficulty: 1 | 2 | 3;
  duration_in_minutes: number;
  instructor: Instructor;
  lessons: Lesson[];
  tags: any[];
};

export async function getWorkshops(): Promise<Array<Workshop>> {
  const workshops = await axios
    .get(`${process.env.API_HOST}/workshops`)
    .then((res) => res.data.data);
  return workshops;
}

export async function getWorkshop(slug: string) {
  const workshop = await axios
    .get(`${process.env.API_HOST}/workshops/${slug}`)
    .then((res) => res.data.data);
  return workshop;
}
