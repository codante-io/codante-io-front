export default function Teste() {

  const clientId = process.env.DISCORD_APP_CLIENT_ID as string
  const encodedUrl = encodeURIComponent('http://localhost:3000/auth/discord/callback')

  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodedUrl}&response_type=code&scope=identify%20email`

  return (
    <div className="container">
      <h1>Teste</h1>
      <a href={discordUrl}>Login with discord</a>
    </div>
  )
}