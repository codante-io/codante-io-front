import axios from './axios.server';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from './auth.server';
import { GitHubStrategy } from 'remix-auth-github';

export let authenticator = new Authenticator<any>(sessionStorage);

let gitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_ID as string,
    clientSecret: process.env.GITHUB_SECRET as string,
    callbackURL: process.env.GITHUB_CALLBACK_URL as string
  },
  async (params) => {
    // get access token from github
    const res = await axios.post('/github-login', {
      github_token: params.accessToken,
    });
    const token = res.data.token;

    // let session = await sessionStorage.getSession(request.headers.get('Cookie'));
    // session.set('userToken', token);

    console.log(`estou logado!, aqui está o token do github ${params.accessToken}`);
    console.log(`estou logado!, aqui está o token do usuário ${token}`);
    console.log(params)
    return { token: token };
  }
);

authenticator.use(gitHubStrategy);

