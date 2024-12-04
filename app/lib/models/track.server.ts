import axios from "axios";
import type { Challenge } from "~/lib/models/challenge.server";
import type { Tag } from "~/lib/models/tag.server";
import { ChallengeUser } from "~/lib/models/user.server";
import type { Workshop } from "~/lib/models/workshop.server";
import { createAxios } from "~/lib/services/axios.server";
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
  trackables: (WorkshopTrackable | ChallengeTrackable)[];
  created_at: string;
  updated_at: string;
};

export type WorkshopTrackable = {
  id: number;
  type: "App\\Models\\Workshop";
  name: string;
  slug: string;
  video_url: string;
  instructor: Instructor;
  lessons: Lesson[];
};

export type ChallengeTrackable = {
  id: number;
  name: string;
  slug: string;
  image_url: string;
  challengeUser: ChallengeUser;
  type: "App\\Models\\Challenge";
};

export type TrackSection = {
  id: number;
  track_id: number;
  name: string;
  description: string;
  position: number;
  instructors: Instructor[];
  tags: Tag[];
  trackables: (Challenge | Workshop | TrackItem)[];
};

export type TrackItem = {
  id: number;
  type: "external_link" | "markdown";
  name: string;
  content: string;
  track_section_id: number;
  position: number;
  status: "draft" | "published" | "soon" | "archived";
  pivot?: TrackablePivot;
  completed?: boolean;
  is_premium?: boolean;
};

export type TrackablePivot = {
  id: string;
  trackable_type: string;
  trackable_id: number;
  track_id: number;
  position: number;
  name: string;
  description: string;
  section_id: number;
};

export async function getTracks(): Promise<Array<Track>> {
  const axios = await createAxios();

  const tracks = await axios.get("/tracks").then((res) => res.data.data);
  return tracks;
}

export async function getTrack(slug: string, request: Request): Promise<Track> {
  const axios = await createAxios(request);

  const track = await axios
    .get(`/tracks/${slug}`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });

  return track;
}

export async function toggleTrackableCompleted(
  trackableId: string,
  request: Request,
) {
  try {
    const axiosInstance = await createAxios(request);

    const data = await axiosInstance
      .post(`/trackables/${trackableId}/complete`)
      .then((res) => res.data);

    const { ok, message, completed } = data;

    if (!ok) {
      return {
        error: message,
        timestamp: new Date().toISOString(),
        trackableId,
      };
    }

    return {
      success: completed ? "Item marcado como concluído!" : "Item desmarcado",
    };
  } catch (err) {
    let message =
      "Ocorreu um erro ao salvar essa informação, por favor tente novamente ou entre em contato com o nosso time.";

    if (axios.isAxiosError(err) && err.response) {
      message = err?.response?.data?.message;
    }

    return {
      error: message,
      timestamp: new Date().toISOString(),
      trackableId,
    };
  }
}
