import axios from "axios";
import { currentToken } from "~/services/auth.server";
import { environment } from "./environment.server";

export type Certificate = {
  id?: string;
  user_id: string;
  source_type: "workshop" | "challenge";
  source_id: string;
  status: "pending" | "published" | "rejected";
};

export async function requestCertificate(
  request: Request,
  certificateInfo: Certificate,
) {
  const token = await currentToken({ request });
  const { user_id, source_type, source_id } = certificateInfo;

  return axios
    .post(
      `${environment().API_HOST}/certificate`,
      {
        user_id,
        source_type,
        source_id,
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

export async function getCertificates(
  request: Request,
  source: "challenge" | "workshop",
  slug: string,
) {
  const token = await currentToken({ request });
  const certificate = await axios
    .get(`${environment().API_HOST}/certificates/${source}/${slug}`, {
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
