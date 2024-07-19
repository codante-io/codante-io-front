import { Authenticator } from "remix-auth";
import { sessionStorage } from "./auth.server";
import { GitHubStrategy } from "remix-auth-github";
import { environment } from "~/lib/models/environment";
import { createAxios } from "~/lib/services/axios.server";

export let authenticator = new Authenticator<any>(sessionStorage);

let gitHubStrategy = new GitHubStrategy(
  {
    clientID: environment().GITHUB_ID as string,
    clientSecret: environment().GITHUB_SECRET as string,
    callbackURL: environment().GITHUB_CALLBACK_URL as string,
  },
  async (params) => {
    const axios = await createAxios();

    const res = await axios.post("/github-login", {
      github_token: params.accessToken,
    });
    const token = res.data.token;

    // Vamos enviar o token e o is_new_signup value para o cliente
    return { token: token, is_new_signup: res.data.is_new_signup };
  },
);

authenticator.use(gitHubStrategy);
