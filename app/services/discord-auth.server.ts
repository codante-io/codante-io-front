import axios from "./axios.server";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "./auth.server";
import { GitHubStrategy } from "remix-auth-github";

export let authenticator = new Authenticator<any>(sessionStorage);

let gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
    callbackURL: process.env.GITHUB_CALLBACK_URL as string,
  },
  async (params) => {
    const res = await axios.post("/github-login", {
      github_token: params.accessToken,
    });
    const token = res.data.token;

    // Vamos enviar o token e o is_new_signup value para o cliente
    return { token: token, is_new_signup: res.data.is_new_signup };
  }
);

authenticator.use(gitHubStrategy);
