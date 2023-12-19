import axios from "axios";
import { currentToken } from "~/services/auth.server";
import { environment } from "./environment.server";

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
  user_can_view?: boolean;
  available_to?: AvailableTo;
};

export type AvailableTo = "all" | "logged_in" | "pro";

export async function getLesson(slug: string) {
  const lesson = await axios
    .get(`${environment().API_HOST}/lessons/${slug}`)
    .then((res) => res.data.data);
  return lesson;
}

export async function setCompleted(
  lessonId: string,
  request: Request,
  markCompleted = true,
) {
  const token = await currentToken({ request });

  let endpoint = `${environment().API_HOST}/lessons/${lessonId}/`;
  if (markCompleted) {
    endpoint += "completed";
  } else {
    endpoint += "uncompleted";
  }

  const data = await axios
    .post(
      endpoint,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
    .then((res) => res.data.data);

  return data;
}
