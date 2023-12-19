import type { ActionFunctionArgs } from "@remix-run/node";
import axios from "axios";
import { environment } from "~/models/environment.server";
import { currentToken } from "~/services/auth.server";

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

async function saveDiscordData({
  request,
  tokenData,
}: {
  request: Request;
  tokenData: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
  };
}) {
  const token = await currentToken({ request });
  const userDataUrl = `${environment().API_HOST}/api/user/discord`;

  const userDataResponse = await axios.post(userDataUrl, {
    method: "POST",
    body: JSON.stringify(tokenData),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const userData = userDataResponse.data;
  return userData;
}

async function addDiscordUserToGuild(tokenData: any) {
  const joinServerUrl = `https://discord.com/api/guilds/1089524234142888048/members/${tokenData.id}`;
  const joinServerBody = JSON.stringify({
    access_token: tokenData.access_token,
  });
  const joinServerResponse = await fetch(joinServerUrl, {
    method: "PUT",
    body: joinServerBody,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${environment().DISCORD_BOT_TOKEN}`,
    },
  });

  return joinServerResponse;
}

export async function loader({ request }: ActionFunctionArgs) {
  // get token
  const url = new URL(request.url);
  const code = url.searchParams.get("code") as string;

  const tokenData = await getToken(code);

  // send token to backend to save userData
  const userData = await saveDiscordData({ request, tokenData });

  // add user to discord server
  const joinServerData = await addDiscordUserToGuild(userData);

  console.log(joinServerData);

  // console.log(userData);

  // console.log("userData", userData);

  // join server
  // const joinServerUrl = `https://discord.com/api/guilds/1089524234142888048/members/${userData.id}`;
  // const joinServerBody = JSON.stringify({
  //   access_token: tokenData.access_token,
  // });
  // const joinServerResponse = await fetch(joinServerUrl, {
  //   method: "PUT",
  //   body: joinServerBody,
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bot ${environment().DISCORD_BOT_TOKEN}`,
  //   },
  // });

  // console.log(joinServerResponse);

  // console.log(tokenData.access_token);
  // // console.log('joinServerData', joinServerData)
  // console.log(environment().DISCORD_BOT_TOKEN);

  // redirect to discord server invitation
  return {
    userInfo: "userData",
  };
}

export default function CallbackDiscord() {
  // const { userInfo } = useLoaderData<typeof loader>()
  // console.log(userInfo);

  return (
    <div className="container">
      <h1>Callback do discord!</h1>
      <pre>{/* {JSON.stringify(userInfo, null, 2)} */}</pre>
    </div>
  );
}

// code ZNbfl6XxlHM8CH7mpceIuV5GpojPxI

//
