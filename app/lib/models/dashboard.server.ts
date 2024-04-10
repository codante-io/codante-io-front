import type { AxiosResponse } from "axios";
import axios from "axios";
import { currentToken } from "~/lib/services/auth.server";
import { environment } from "./environment";
// import type { User } from "./user.server";

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
