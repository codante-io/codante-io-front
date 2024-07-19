import { createAxios } from "~/lib/services/axios.server";

export type Plan = {
  id: number;
  name: string;
  price_in_cents: number;
  slug: string;
  details: string;
};

export async function getPlanDetails() {
  const axios = await createAxios();

  const data: Plan | null = await axios
    .get("/plan-details")
    .then((res) => res.data.data);

  return data;
}
