import type { AxiosResponse } from "axios";
import type { WorkshopCard } from "./workshop.server";
import { createAxios } from "~/lib/services/axios.server";

export type ChallengeUserDashboard = {
  id: number;
  challenge_id: number;
  completed: boolean;
  challenge_name: string;
  challenge_image: string;
  challenge_slug: string;
  listed: boolean;
  submission_url: string;
  submission_image_url: string;
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
  const axios = await createAxios(request);

  return axios
    .get("/dashboard/show-data")
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro ao buscar informações. Por favor, tente novamente ou entre em contato.",
      };
    });
}

export async function getDashboardWorkshops(request: Request) {
  const axios = await createAxios(request);
  const res = await axios.get<WorkshopCard[]>(`/dashboard/workshops`);

  if (res.status !== 200) {
    throw new Error("Erro ao buscar workshops");
  }

  return res.data;
}
