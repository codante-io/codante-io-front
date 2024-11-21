import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { getPlanDetails } from "~/lib/models/plan.server";
import { createAxios } from "~/lib/services/axios.server";
import type { Subscription } from "~/lib/models/subscription.server";
import type { AxiosError } from "axios";

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const couponCode = searchParams.get("coupon");
  const planId = searchParams.get("plan_id") ?? "1";

  const { plan, coupon } = await getPlanDetails({
    couponCode,
    planId: parseInt(planId),
  });

  return { request, plan, coupon };
}

export async function action({ request }: { request: Request }) {
  const axios = await createAxios(request);

  const formData = await request.formData();
  const coupon = formData.get("coupon");

  try {
    const response = await axios.get<{
      checkoutLink: string;
      pagarmeOrderID: string;
      subscription: Subscription;
    }>(`/pagarme/get-link?coupon=${coupon}`);

    return redirect(`${response.data.checkoutLink}`);
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        return redirect("/login");
      }

      const errorMessage = error.response.data.message;
      const encodedErrorMessage = encodeURIComponent(errorMessage);

      return redirect(`/assine/erro?error=${encodedErrorMessage}`);
    }

    return redirect(`/assine/erro`);
  }
}

export default function Plans() {
  return null;
}
