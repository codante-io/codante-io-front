import axios from "axios";
import { environment } from "./environment.server";

export type Plan = {
  id: number;
  name: string;
  price_in_cents: number;
  slug: string;
};

export async function getPlanDetails() {
  let endpoint = `${environment().API_HOST}/plan-details`;

  const data: Plan | null = await axios
    .get(endpoint)
    .then((res) => res.data.data);

  return data;
}
