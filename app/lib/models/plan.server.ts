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

  error?: boolean;
  message?: string;
};

export async function getPlanDetails({
  planId = 1,
  couponCode,
}: {
  planId?: number;
  couponCode: string | null;
}) {
  const axios = await createAxios();

  let url = `/plan-details?plan_id=${planId}`;
  if (couponCode) {
    url += `&coupon=${couponCode}`;
  }

  const data: { plan: Plan | null; coupon: Coupon | null } = await axios
    .get(url)
    .then((res) => res.data);

  return data;
}
