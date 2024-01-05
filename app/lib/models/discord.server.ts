import { getPublicEnv } from "~/components/_layouts/public-env";

export function getDiscordOAuthURL() {
  const clientId = "1185302801178439780";
  const redirectUri = `${getPublicEnv("BASE_URL")}/auth/discord/callback`;
  const encodedUrl = encodeURIComponent(redirectUri);

  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodedUrl}&response_type=code&scope=identify+guilds.join+email`;

  return discordUrl;
}
