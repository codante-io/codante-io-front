import type { ChallengeUser, User } from "./user.server";
import type { WorkshopUser } from "./workshop.server";
import { createAxios } from "~/lib/services/axios.server";

export type ChallengeUserMetadata = {
  tags: string[];
  end_date: string;
  start_date: string;
  certifiable_source_name: string;
  certifiable_slug: string;
};

export type WorkshopUserMetadata = {
  end_date: string;
  certifiable_slug: string;
  duration_in_seconds: string;
  certifiable_source_name: string;
};

export type CertificateMetadata = ChallengeUserMetadata | WorkshopUserMetadata;

export type Certifiable = WorkshopUser | ChallengeUser;

export type Certificate = {
  id: string;
  user: User;
  certifiable_type: "ChallengeUser" | "WorkshopUser";
  certifiable_id: string;
  certifiable: Certifiable;
  status: "pending" | "published";
  metadata: CertificateMetadata;
  created_at: string;
  error?: any; // caso certificado nao exista, requisição irá retornar a chave erro
};

export async function requestCertificate(
  request: Request,
  certifiable_type: string,
  certifiable_id: string,
) {
  const axios = await createAxios(request);
  return axios
    .post("/certificates", {
      certifiable_type,
      certifiable_id,
    })
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
  const axios = await createAxios(request);
  const certificate = await axios
    .get(`/challenges/${slug}/certificate`)
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
  const axios = await createAxios();

  const certificate = await axios
    .get(`/certificates/${id}`)
    .then((res) => {
      return res.data.data;
    })
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro solicitar o Certificado. Por favor, tente novamente ou entre em contato.",
      };
    });
  return certificate;
}
