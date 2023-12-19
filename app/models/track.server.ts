import axios from "axios";
import type { Challenge } from "~/models/challenge.server";
import type { Workshop } from "~/models/workshop.server";
import type { Instructor } from "./instructor.server";
import type { Lesson } from "./lesson.server";
import { environment } from "./environment.server";

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
  trackables?: (Challenge | Workshop)[];
};

export async function getTracks(): Promise<Array<Track>> {
  const tracks = await axios
    .get(`${environment().API_HOST}/tracks`)
    .then((res) => res.data.data);
  return tracks;
}

export async function getTrack(slug: string): Promise<Track> {
  const track = await axios
    .get(`${environment().API_HOST}/tracks/${slug}`)
    .then((res) => res.data.data);
  return track;
}
