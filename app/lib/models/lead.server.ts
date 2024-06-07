import axios from "axios";

import { environment } from "./environment";

export type Lead = {};

export async function registerChallengeLead(
  request: Request,
  email: string,
): Promise<{}> {
  try {
    await axios.post(`${environment().API_HOST}/leads`, {
      email,
      tags: ["lead-first-challenge"],
    });

    return {
      success: "Cadastro realizado. Vamos te enviar um email em breve",
    };
  } catch (e: any) {
    let errorMsg =
      "Não foi possível realizar o cadastro. Por favor, tente novamente.";

    if (e.response.status === 409) {
      errorMsg =
        "Esse email já está cadastrado em nossa lista. Basta fazer login para participar do projeto.";
    }
    return {
      error: errorMsg,
    };
  }
}

export async function registerLead(request: Request, email: string) {
  return axios
    .post(
      `${environment().API_HOST}/leads`,
      {
        email,
        tags: ["lead-assine"],
      },
      {},
    )
    .then((res) => {
      return { message: "success" };
    })
    .catch((error) => {
      let errorMsg =
        "Não foi possível realizar o cadastro. Por favor, tente novamente.";

      if (error.response.status === 409) {
        errorMsg = "Esse email já está cadastrado em nossa lista.";
      } else if (error.response.status === 422) {
        errorMsg = "Por favor, insira um email válido.";
      }

      return {
        error: errorMsg,
      };
    });
}
