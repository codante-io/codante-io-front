import axios from "axios";

export async function sendPagarmePaymentToBackend(
  token: string,
  paymentMethod: string
) {
  return axios
    .post(
      `${process.env.API_HOST}/subscribe`,
      {
        token,
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
