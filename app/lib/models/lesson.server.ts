import React from "react";
import type { Comment } from "./comments.server";
import { createAxios } from "~/lib/services/axios.server";

export type Lesson = {
  id: number;
  workshop_id: string;
  name: string;
  description?: string;
  content?: string | React.JSX.Element;
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

// export type LessonsGroupedBySection = Record<string, Lesson[]>;

export type AvailableTo = "all" | "logged_in" | "pro";

export async function getLesson(
  slug: string,
  request: any,
): Promise<Lesson | null> {
  const axios = await createAxios(request);
  const lesson = await axios
    .get(`/lessons/${slug}`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
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
