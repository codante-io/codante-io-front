import type { Comment } from "./comments.server";
import { createAxios } from "~/lib/services/axios.server";

export type Lesson = {
  id: string;
  workshop_id: string;
  name: string;
  description?: string;
  content?: string;
  slug: string;
  duration_in_seconds: number;
  created_at: string;
  updated_at: string;
  video_url?: string;
  section?: string;
  thumbnail_url?: string;
  user_completed?: boolean;
  type: "video" | "text";
  user_can_view?: boolean;
  available_to?: AvailableTo;
  comments: Comment[];
};

export type AvailableTo = "all" | "logged_in" | "pro";

export async function getLesson(slug: string) {
  const axios = await createAxios();
  const lesson = await axios
    .get(`/lessons/${slug}`)
    .then((res) => res.data.data);
  return lesson;
}

export async function setCompleted(
  lessonId: string,
  request: Request,
  markCompleted = true,
) {
  const axios = await createAxios(request);
  let endpoint = `/lessons/${lessonId}/`;
  if (markCompleted) {
    endpoint += "completed";
  } else {
    endpoint += "uncompleted";
  }

  const data = await axios.post(endpoint).then((res) => res.data.data);

  return data;
}
