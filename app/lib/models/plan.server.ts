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

export async function getPlanDetails({
  couponCode,
}: {
  couponCode: string | null;
}) {
  const axios = await createAxios();

  let url = "/plan-details";
  if (couponCode) {
    url += `?coupon=${couponCode}`;
  }

  const data: { plan: Plan | null; coupon: Coupon | null } = await axios
    .get(url)
    .then((res) => res.data);

  return data;
}
