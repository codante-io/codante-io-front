import { createAxios } from "~/lib/services/axios.server";

export type Plan = {
  id: number;
  name: string;
  price_in_cents: number;
  slug: string;
  details: string;
};

export type Coupon = {
  code: string;
  name: string;
  discount_amount: number;
  type: string;
};

export async function getPlanDetails() {
  const axios = await createAxios();

  const data: { plan: Plan | null; coupon: Coupon | null } = await axios
    .get("/plan-details")
    .then((res) => res.data);

  return data;
}
