import { BsDiscord } from "react-icons/bs";
import { getPublicEnv } from "../public-env";

export default function DiscordButton() {
  const clientId = "1185302801178439780";
  const redirectUri = `${getPublicEnv('BASE_URL')}/auth/discord/callback`;
  const encodedUrl = encodeURIComponent(redirectUri);


  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodedUrl}&response_type=code&scope=identify+guilds.join+email`;

  return (
    <a href={discordUrl} target="_blank" rel="noreferrer" className="">
      <span className="flex gap-2 items-center w-full">
        <BsDiscord className="inline-block" />
        <span>Comunidade</span>
      </span>
    </a>
  );
}
