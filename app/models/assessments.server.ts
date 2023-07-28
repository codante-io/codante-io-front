import axios from "axios";
import type { Tag } from "./tag.server";

export type Assessment = {
  id: string;
  title: string;
  slug: string;
  type: "frontend" | "backend" | "fullstack";
  has_challenge: boolean;
  image_url?: string;
  image_url_dark?: string;
  status: "draft" | "published";
  tags?: Tag[];
};

export async function getAssessments(): Promise<Array<Assessment>> {
  const assessments: Assessment[] = await axios
    .get(`${process.env.API_HOST}/technical-assessments`)
    .then((res) => res.data.data);
  return assessments;
}
