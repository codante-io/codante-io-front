import axios from "axios";
import type { Challenge } from "~/lib/models/challenge.server";
import type { Workshop } from "~/lib/models/workshop.server";
import type { Instructor } from "./instructor.server";
import type { Lesson } from "./lesson.server";
import type { Tag } from "~/lib/models/tag.server";
import { environment } from "./environment";
import { currentToken } from "~/lib/services/auth.server";

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
  sections: TrackSection[];
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
  const tracks = await axios
    .get(`${environment().API_HOST}/tracks`)
    .then((res) => res.data.data);
  return tracks;
}

export async function getTrack(slug: string, request: Request): Promise<Track> {
  const token = await currentToken({ request });

  const track = await axios
    .get(`${environment().API_HOST}/tracks/${slug}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data);
  return track;
}

export async function toggleTrackableCompleted(
  trackableId: string,
  request: Request,
) {
  try {
    const token = await currentToken({ request });

    const data = await axios
      .post(
        `${environment().API_HOST}/trackables/${trackableId}/complete`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      )
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
