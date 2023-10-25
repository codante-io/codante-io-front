import axios from "axios";
import { currentToken } from "~/services/auth.server";

export async function sendPagarmePaymentToBackend(
  request: Request,
  pagarmeToken: string,
  paymentMethod: string
) {
  // console.log({ pagarmeToken, paymentMethod });
  let token = await currentToken({ request });

  return axios
    .post(
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
    )
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro. Por favor, tente novamente ou entre em contato.",
      };
    });
}
