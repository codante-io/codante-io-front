import { createAxios } from "~/lib/services/axios.server";

export async function getUpcoming() {
  const axios = await createAxios();

  const upcomingData: any = await axios
    .get(`/upcoming`)
    .then((res) => res.data);
  return upcomingData;
}
