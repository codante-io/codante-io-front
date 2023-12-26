import axios from "axios";
import { currentToken } from "~/services/auth.server";
import { environment } from "./environment.server";

export type Certificate = {
  user_id: string;
  source_type: "workshop" | "challenge";
  source_id: string;
  metadata?: string;
  status?: string;
};

export async function requestCertificate(
  request: Request,
  certificateInfo: Certificate,
) {
  const token = await currentToken({ request });
  const {
    user_id,
    source_type,
    source_id,
    metadata = undefined,
    status = undefined,
  } = certificateInfo;

  return axios
    .post(
      `${environment().API_HOST}/certificate`,
      {
        user_id,
        source_type,
        source_id,
        metadata,
        status,
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
