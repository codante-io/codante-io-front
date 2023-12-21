import { BsDiscord } from "react-icons/bs";
import { getPublicEnv } from "../public-env";

export default function DiscordButton() {
  const clientId = "1185302801178439780";
  const redirectUri = `${getPublicEnv("BASE_URL")}/auth/discord/callback`;
  const encodedUrl = encodeURIComponent(redirectUri);

  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodedUrl}&response_type=code&scope=identify+guilds.join+email`;

  return (
    <a href={discordUrl} target="_blank" rel="noreferrer" className="">
      <span className="inline-flex items-center space-x-2 px-4 py-2 bg-brand-500 text-background-50 rounded-md hover:bg-brand-600">
        <BsDiscord className="w-4 h-4" />
        <span>Entrar na Comunidade</span>
      </span>
    </a>
  );
}
