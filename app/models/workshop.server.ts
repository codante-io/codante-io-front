import axios from "axios";
import type { Instructor } from "./instructor.server";
import type { Lesson } from "./lesson.server";

type Workshop = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  imageUrl?: string;
  difficulty: number;
  duration_in_minutes: number;
  instructor: Instructor;
  lessons: Lesson[];
  categories: any[];
};

export async function getWorkshops(): Promise<Array<Workshop>> {

  const workshops = await axios.get('http://127.0.0.1:8000/workshops').then(res => res.data.data)
  return workshops
}

export async function getWorkshop(slug: string) {
  const workshop = await axios.get(`http://127.0.0.1:8000/workshops/${slug}`).then(res => res.data.data)
  return workshop
}
