import type { ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { user } from "~/services/auth.server";

export async function loader({ request }: ActionFunctionArgs) {
  const url = new URL(request.url);
  // const redirectTo = url.searchParams.get("redirectTo") as string | null;

  // get code and make a post request
  // https://discord.com/api/oauth2/token

  // get token
  const code = url.searchParams.get("code") as string;
  const clientId = process.env.DISCORD_APP_CLIENT_ID as string
  const clientSecret = process.env.DISCORD_APP_SECRET as string

  const tokenUrl = 'https://discord.com/api/oauth2/token'
  const tokenBody = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'authorization_code',
    code,
    redirect_uri: 'http://localhost:3000/auth/discord/callback',
    scope: 'identify email'
  })

  const tokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    body: tokenBody,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  const tokenData = await tokenResponse.json()

  console.log('tokenData', tokenData)

  // get user info
  const userUrl = 'https://discord.com/api/users/@me'
  const userResponse = await fetch(userUrl, {
    headers: {
      authorization: `${tokenData.token_type} ${tokenData.access_token}`
    }
  })

  const userData = await userResponse.json()

  console.log('userData', userData)

  // create user in database

  // redirect to discord server invitation
  return {
    userInfo: userData
  }



  // return {
  //   userInfo: userData
  // }

}

export default function CallbackDiscord() {

  const { userInfo } = useLoaderData<typeof loader>()
  console.log(userInfo);  


  return (
    <div className="container">
      <h1>Callback do discord!</h1>
      <pre>
        {JSON.stringify(userInfo, null, 2)}
      </pre>
    </div>
  )
}

// code ZNbfl6XxlHM8CH7mpceIuV5GpojPxI

//