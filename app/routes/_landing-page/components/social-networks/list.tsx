import { Link } from "react-router";
import {
  BsDiscord,
  BsLinkedin,
  BsGithub,
  BsYoutube,
  BsInstagram,
  BsTiktok,
} from "react-icons/bs";
import DiscordButton from "~/components/features/auth/discord-button";
import SocialNetworkCard from "~/routes/_landing-page/components/social-networks/card";

const socialNetworks = [
  {
    icon: <BsYoutube className="w-10 h-10" />,
    description: "5.31k inscritos",
    callToAction: "Inscreva-se",
    to: "https://www.youtube.com/@codante-io",
  },
  {
    icon: <BsDiscord className="w-10 h-10" />,
    description: "1.7k membros",
    callToAction: "Inscreva-se",
    to: "discord",
  },
  {
    icon: <BsGithub className="w-10 h-10" />,
    description: "195 seguidores",
    callToAction: "Siga",
    to: "https://github.com/codante-io",
  },
  {
    icon: <BsLinkedin className="w-10 h-10" />,
    description: "2.4k seguidores",
    callToAction: "Siga",
    to: "https://www.linkedin.com/company/codante",
  },
  {
    icon: <BsInstagram className="w-10 h-10" />,
    description: "631 seguidores",
    callToAction: "Siga",
    to: "https://www.instagram.com/codante.io",
  },
  {
    icon: <BsTiktok className="w-10 h-10" />,
    description: "1.3k seguidores",
    callToAction: "Siga",
    to: "https://www.tiktok.com/@codante.io",
  },
];

function SocialNetworksList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 items-start w-full mt-20 gap-4 text-center">
      {socialNetworks.map((socialNetwork) =>
        socialNetwork.to === "discord" ? (
          <DiscordButton onlyWrapper key={socialNetwork.to}>
            <SocialNetworkCard {...socialNetwork} />
          </DiscordButton>
        ) : (
          <Link
            to={socialNetwork.to}
            target="_blank"
            className="cursor-pointer"
            key={socialNetwork.to}
          >
            <SocialNetworkCard {...socialNetwork} />
          </Link>
        ),
      )}
    </div>
  );
}

export default SocialNetworksList;
