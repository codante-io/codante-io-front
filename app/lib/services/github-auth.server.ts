import { Authenticator } from "remix-auth";
import { GitHubStrategy } from "remix-auth-github";
import { isAxiosError } from "axios";
import { environment } from "~/lib/models/environment";
import { createAxios } from "~/lib/services/axios.server";

export const authenticator = new Authenticator<any>();

const gitHubStrategy = new GitHubStrategy(
  {
    clientId: environment().GITHUB_ID as string,
    clientSecret: environment().GITHUB_SECRET as string,
    redirectURI: environment().GITHUB_CALLBACK_URL as string,
    scopes: ["user:email", "read:user"],
  },
  async (params) => {
    const axios = await createAxios();

    try {
      const res = await axios.post("/github-login", {
        github_token: params.tokens.accessToken(),
      });
      const token = res.data.token;

      // Vamos enviar o token e o is_new_signup value para o cliente
      return { token: token, is_new_signup: res.data.is_new_signup };
    } catch (error) {
      if (isAxiosError(error)) {
        const status = error.response?.status ?? "unknown";
        const data = error.response?.data;
        const backendMessage =
          (typeof data?.error === "string" && data.error) ||
          (typeof data?.message === "string" && data.message) ||
          error.message;

        throw new Error(`GitHub login failed (${status}): ${backendMessage}`);
      }

      throw error;
    }
  },
);

authenticator.use(gitHubStrategy);
