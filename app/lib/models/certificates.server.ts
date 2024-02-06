import axios from "axios";
import { environment } from "./environment.server";
import { currentToken } from "../services/auth.server";
import type { User } from "./user.server";

export type Certificate = {
  id: string;
  user: User;
  certifiable_type: "ChallengeUser";
  certifiable_id: string;
  status: "pending" | "published";
  metadata: {
    tags: string[];
    end_date: string;
    start_date: string;
    certifiable_source_name: string;
    certifiable_slug: string;
  };
  created_at: string;
};

export async function requestCertificate(
  request: Request,
  certifiable_type: string,
  certifiable_id: string,
) {
  const token = await currentToken({ request });

  return axios
    .post(
      `${environment().API_HOST}/certificates`,
      {
        certifiable_type,
        certifiable_id,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro solicitar o Certificado. Por favor, tente novamente ou entre em contato.",
      };
    });
}

export async function getCertificateBySlug(request: Request, slug: string) {
  const token = await currentToken({ request });
  const certificate = await axios
    .get(`${environment().API_HOST}/challenges/${slug}/certificate`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro solicitar o Certificado. Por favor, tente novamente ou entre em contato.",
      };
    });
  return certificate;
}

export async function getCertificateById(id: string): Promise<Certificate> {
  // console.log(id);
  const certificate = await axios
    .get(`${environment().API_HOST}/certificates/${id}`)
    .then((res) => {
      // console.log(res);
      return res.data.data;
    })
    .catch((error) => {
      // console.log(error);
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro solicitar o Certificado. Por favor, tente novamente ou entre em contato.",
      };
    });
  return certificate;
}
