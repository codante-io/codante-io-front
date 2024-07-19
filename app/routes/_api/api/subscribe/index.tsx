import { createAxios } from "~/lib/services/axios.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const pagarmeToken = formData.get("pagarmeToken");
  const paymentMethod = formData.get("paymentMethod");

  const axios = await createAxios(request);

  try {
    const response = await axios.post("/subscribe", {
      pagarmeToken,
      paymentMethod,
    });

    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.response.data.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
