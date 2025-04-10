import { BsDiscord } from "react-icons/bs";
import { getPublicEnv } from "../../../_layouts/public-env";
import React from "react";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils/cn";

type Props = {
  className?: string;
  textSizeClass?: string;
  children?: React.ReactNode;
  onlyWrapper?: boolean;
};

export default function DiscordButton({
  className = "",
  onlyWrapper = false,
  children = (
    <React.Fragment>
      <BsDiscord className="w-4 h-4 mr-2" />
      <span>Entrar na Comunidade</span>
    </React.Fragment>
  ),
}: Props) {
  const clientId = "1185302801178439780";
  const redirectUri = `${getPublicEnv("BASE_URL")}/auth/discord/callback`;
  const encodedUrl = encodeURIComponent(redirectUri);

  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodedUrl}&response_type=code&scope=identify+guilds.join+email`;

  return (
    <a
      href={discordUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(!onlyWrapper && buttonVariants({ size: "sm" }), className)}
    >
      {children}
    </a>
  );
}
