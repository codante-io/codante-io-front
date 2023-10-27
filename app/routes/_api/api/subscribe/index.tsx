import axios from "axios";
import { currentToken } from "~/services/auth.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const pagarmeToken = formData.get("pagarmeToken");
  const paymentMethod = formData.get("paymentMethod");

  let token = await currentToken({ request });

  try {
    const response = await axios.post(
      `${process.env.API_HOST}/subscribe`,
      {
        pagarmeToken,
        paymentMethod,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

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
      }
    );
  }
}
