import { createAxios } from "~/lib/services/axios.server";

export type Lead = {
  id: number;
  email: string;
  name: string | null;
  phone: string | null;
};

export async function registerChallengeLead(
  request: Request,
  email: string,
): Promise<{ success?: string; error?: string }> {
  try {
    const axios = await createAxios(request);
    await axios.post(`/leads`, {
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

export async function registerMarketingLead(
  request: Request,
  {
    email,
    tag,
    name,
    phone,
  }: { email: string; tag: string; name?: string; phone?: string },
): Promise<{ success?: string; error?: string }> {
  try {
    const axios = await createAxios(request);
    await axios.post(`/leads`, {
      email,
      tags: [tag],
      name,
      phone,
    });

    return {
      success: "Cadastro realizado. Vamos te enviar um email em breve",
    };
  } catch (e: any) {
    let errorMsg =
      "Não foi possível realizar o cadastro. Por favor, tente novamente.";

    if (e.response.status === 409) {
      errorMsg =
        "Esse email já está cadastrado em nossa lista. Não se preocupe, você receberá nossos emails em breve.";
    }
    return {
      error: errorMsg,
    };
  }
}
