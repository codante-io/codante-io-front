import axios from './axios.server';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from './auth.server';
import { GitHubStrategy } from 'remix-auth-github';

export let authenticator = new Authenticator<any>(sessionStorage);

let gitHubStrategy = new GitHubStrategy(
  {
    clientID: '50cdac68fc6c444bb0d3',
    clientSecret: '84795e73b18a89b3cf6cc65eb14f1ff509be49e9',
    callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
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

