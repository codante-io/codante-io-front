import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { environment } from "~/lib/models/environment";
import {
  commitSession,
  getSession,
  redirectToCookie,
} from "~/lib/services/auth.server";
import { authenticator } from "~/lib/services/github-auth.server";

// Essa função é chamada quando o usuário é redirecionado para o GitHub para
// autenticação. O GitHub irá redirecionar o usuário de volta para o Remix com
// um código de autorização. O Remix irá então chamar essa função para trocar
// o código de autorização por um token de acesso.
//
// O token de acesso é armazenado em um cookie seguro e httpOnly, e o usuário
// é redirecionado para a página que ele estava tentando acessar antes de ser
// redirecionado para o GitHub.

// Além disso, se for um novo cadastro, vamos passar também a query `new-signup=true`
// para que possamos fazer o tracking no analytics.

export async function loader({ request }: LoaderFunctionArgs) {
  const redirectTo =
    (await redirectToCookie.parse(request.headers.get("Cookie"))) ?? "/";

  // Como não estamos passando o parametro successRedirect para o authenticate
  // o método irá retornar os dados retornados no `github-auth`. Nos queremos isso, porque precisamos
  // pegar, além do token, se o usuário fez login pela primeira vez ou não.
  const userData = await authenticator.authenticate("github", request, {
    // successRedirect: redirectTo,
    failureRedirect: "/login",
  });

  const session = await getSession(request.headers.get("cookie"));

  // na session a gente deve passar o user. No nosso caso o user deve, no mínimo, conter um `token`.
  session.set(authenticator.sessionKey, { token: userData.token });
  const headers = new Headers({ "Set-Cookie": await commitSession(session) });

  if (userData.is_new_signup) {
    // Se o usuário é novo, vamos fazer append do parâmetro `is_new_signup` na query string.
    // Vamos fazer isso para que o analytics consiga saber quando um login é de um novo signup.
    const url = new URL(redirectTo, environment().BASE_URL);
    url.searchParams.append("new-signup", "true");
    return redirect(url.toString(), { headers });
  } else {
    return redirect(redirectTo, { headers });
  }
}
