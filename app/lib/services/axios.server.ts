import type { RawAxiosRequestHeaders } from "axios";
import axios from "axios";
import { environment } from "~/lib/models/environment";
import { currentToken } from "~/lib/services/auth.server";

export async function createAxios(request: Request | null = null) {
  let headers: RawAxiosRequestHeaders = {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  };

  if (request) {
    headers = {
      ...headers,
      Authorization: `Bearer ${await currentToken({ request })}`,
      Cookie: request.headers.get("Cookie"),
    };
  }

  return axios.create({
    baseURL: environment().API_HOST,
    headers,
  });
}
