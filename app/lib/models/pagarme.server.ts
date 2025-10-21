import type { AxiosError } from "axios";
import { createAxios } from "~/lib/services/axios.server";

export type CodandoComIaCheckoutResponse = {
  checkoutLink: string | null;
  pagarmeOrderID: string | null;
  amount: number;
  status: string | null;
};

export type CodandoComIaOrderStatus = {
  id: string | null;
  status: string | null;
  amount: number | null;
  charges: Array<{
    id?: string;
    status?: string;
    payment_method?: string;
    last_transaction?: Record<string, unknown> | null;
  }>;
  customer: {
    name: string | null;
    email: string | null;
  };
};

export async function createCodandoComIaCheckout({
  request,
  name,
  email,
  phone,
  tag,
}: {
  request: Request;
  name: string;
  email: string;
  phone: string;
  tag: string;
}): Promise<CodandoComIaCheckoutResponse> {
  const axios = await createAxios(request);

  try {
    const response = await axios.post<CodandoComIaCheckoutResponse>(
      "/pagarme/codando-com-ia/checkout",
      {
        name,
        email,
        phone,
        tag,
      },
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const fallbackError =
      axiosError.response?.data?.message ??
      "Não foi possível iniciar o checkout no momento.";

    throw new Error(fallbackError);
  }
}

export async function getCodandoComIaOrderStatus({
  orderId,
}: {
  orderId: string;
}): Promise<CodandoComIaOrderStatus> {
  const axios = await createAxios();

  try {
    const response = await axios.get<CodandoComIaOrderStatus>(
      `/pagarme/codando-com-ia/orders/${orderId}`,
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const fallbackError =
      axiosError.response?.data?.message ??
      "Não foi possível recuperar o status do pedido.";

    throw new Error(fallbackError);
  }
}
