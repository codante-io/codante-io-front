import type { AxiosResponse } from "axios";
import axios from "axios";
import { currentToken } from "~/lib/services/auth.server";
import { environment } from "./environment";

export type ChallengeUserDashboard = {
  id: number;
  challenge_id: number;
  completed: boolean;
  challenge_name: string;
  challenge_image: string;
  challenge_slug: string;
};

export type WorkshopUserDashboard = {
  id: number;
  status: string;
  workshop_id: number;
  workshop_name: string;
  workshop_image: string;
  workshop_slug: string;
};

export type CertificateDashboard = {
  id: number;
  certifiable_type: string;
  status: string;
  certifiable_name: string;
};

export type Dashboard = {
  challenge_users: ChallengeUserDashboard[];
  workshop_users: WorkshopUserDashboard[];
  certificates: CertificateDashboard[];
};

export async function getDashboardData(
  request: Request,
): Promise<AxiosResponse<any, any> | { error?: string }> {
  let token = await currentToken({ request });

  return axios
    .get(`${environment().API_HOST}/dashboard/show-data`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro ao buscar informações. Por favor, tente novamente ou entre em contato.",
      };
    });
}
