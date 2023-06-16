import axios from "axios";
import { currentToken } from "~/services/auth.server";

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
};

export async function getLesson(slug: string) {
  const lesson = await axios
    .get(`${process.env.API_HOST}/lessons/${slug}`)
    .then((res) => res.data.data);
  return lesson;
}

export async function setCompleted(lessonId: string, request: any) {
  const token = await currentToken({ request });

  console.log(lessonId, request);
  const data = await axios
    .post(
      `${process.env.API_HOST}/lessons/${lessonId}/completed`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => res.data.data);
  return data;
}
