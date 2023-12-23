import axios from "axios";
import type { Tag } from "./tag.server";
import { environment } from "./environment.server";

export type Assessment = {
  id: string;
  title: string;
  slug: string;
  type: "frontend" | "backend" | "fullstack";
  has_challenge: boolean;
  image_url?: string;
  image_url_dark?: string;
  status: "draft" | "published" | "outdated";
  tags?: Tag[];
  company_website?: string;
  company_headquarters?: string;
  company_name?: string;
  company_description?: string;
  company_industry?: string;
  company_size?: string;
  company_linkedin?: string;
  company_github?: string;
  assessment_description?: string;
  assessment_year?: string;
  assessment_instructions_url?: string;
  assessment_instructions_text?: string;
  job_position?: string;
  zipped_files_url?: string;
  outdated_details?: string;
};

export async function getAssessments(): Promise<Array<Assessment>> {
  const assessments: Assessment[] = await axios
    .get(`${environment().API_HOST}/technical-assessments`)
    .then((res) => res.data.data);
  return assessments;
}

export async function getAssessment(slug: string): Promise<Assessment> {
  const assessment: Assessment = await axios
    .get(`${environment().API_HOST}/technical-assessments/${slug}`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });

  return assessment;
}
