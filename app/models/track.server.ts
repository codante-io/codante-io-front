import axios from "axios";
import type { Instructor } from "./instructor.server";
import type { Lesson } from "./lesson.server";

export type Track = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  image_url?: string;
  status: "draft" | "published" | "soon" | "archived";
  difficulty: 1 | 2 | 3;
  duration_in_minutes: number;
  instructor: Instructor;
  lessons: Lesson[];
  tags: any[];
};

export async function getTracks(): Promise<Array<Track>> {
  const tracks = await axios
    .get(`${process.env.API_HOST}/tracks`)
    .then((res) => res.data.data);
  return tracks;
}

export async function getTrack(slug: string) {
  const track = await axios
    .get(`${process.env.API_HOST}/tracks/${slug}`)
    .then((res) => res.data.data);
  return track;
}
