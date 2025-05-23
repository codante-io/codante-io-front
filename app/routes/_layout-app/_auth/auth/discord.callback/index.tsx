import { redirect, type ActionFunctionArgs } from "react-router";
import { environment } from "~/lib/models/environment";
import { createAxios } from "~/lib/services/axios.server";

export async function loader({ request }: ActionFunctionArgs) {
  // get code from url
  const url = new URL(request.url);
  const code = url.searchParams.get("code") as string;

  const tokenData = await getToken(code);
  const axios = await createAxios(request);

  // chamada backend para salvar dados
  await axios.post("/user/discord", JSON.stringify(tokenData), {
    method: "POST",
  });

  // redirecionar para o discord channel.
  return redirect("https://discord.com/channels/1089524234142888048");
}

async function getToken(code: string) {
  const clientId = environment().DISCORD_APP_CLIENT_ID as string;
  const clientSecret = environment().DISCORD_APP_SECRET as string;

  const tokenUrl = "https://discord.com/api/oauth2/token";
  const tokenBody = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: "authorization_code",
    code,
    redirect_uri: `${environment().BASE_URL}/auth/discord/callback`,
    scope: "identify email guilds.join",
  });

  const res = await fetch(tokenUrl, {
    method: "POST",
    body: tokenBody,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await res.json();
  return data;
}
