import axios from "axios";
import { currentToken } from "~/lib/services/auth.server";
import { environment } from "./environment";

export type Subscription = {
  id: number;
  plan_name: string | null;
  status: "active" | "pending" | "expired" | "canceled";
  translated_status: string;
  translated_payment_method: string;
  payment_method: string | null;
  boleto_url: string | null;
  boleto_barcode: string | null;
  price_paid_in_cents: number | null;
  acquisition_type: string;
  starts_at: string;
  ends_at: string;
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
};

export async function getSubscription({ request }: { request: Request }) {
  const token = await currentToken({ request });

  let endpoint = `${environment().API_HOST}/my-subscription`;

  const data: Subscription | null = await axios
    .get(endpoint, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data)
    .catch(() => null);

  return data;
}

export async function getSubscriptionByPagarmeOrderId({
  request,
  pagarmeOrderId,
}: {
  request: Request;
  pagarmeOrderId: string;
}) {
  const token = await currentToken({ request });

  let endpoint = `${
    environment().API_HOST
  }/pagarme/get-subscription-by-order-id/${pagarmeOrderId}`;

  try {
    const data: Subscription | null = await axios
      .get(endpoint, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => res.data.data);

    return data;
  } catch (e) {
    return null;
  }
}
