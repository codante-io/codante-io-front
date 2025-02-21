import { Link } from "@remix-run/react";
import {
  Briefcase,
  CreditCard,
  ShoppingBag,
  Star,
  Trophy,
  User,
} from "lucide-react";
import { MagicCard } from "~/components/ui/cards/magic-card";
import { useColorMode } from "~/lib/contexts/color-mode-context";

const apis = [
  {
    name: "API de pedidos",
    url: "https://docs.apis.codante.io/orders-api",
    icon: <ShoppingBag className="size-10" />,
  },
  {
    name: "API de cadastro de usuários",
    url: "https://docs.apis.codante.io/register-user",
    icon: <User className="size-10" />,
  },
  {
    name: "API de vagas",
    url: "https://docs.apis.codante.io/jobs-api",
    icon: <Briefcase className="size-10" />,
  },
  {
    name: "API dos Jogos Olímpicos de Paris 2024",
    url: "https://docs.apis.codante.io/olympic-games",
    icon: <Trophy className="size-10" />,
  },
  {
    name: "API dos gastos dos senadores do Brasil",
    url: "https://docs.apis.codante.io/gastos-senadores",
    icon: <CreditCard className="size-10" />,
  },
  {
    name: "API de reviews de produtos",
    url: "https://docs.apis.codante.io/reviews-api",
    icon: <Star className="size-10" />,
  },
];

export default function BackendApis() {
  const { colorMode } = useColorMode();

  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-background-100 dark:bg-background-800 rounded-xl p-4 bg-grainy overflow-hidden">
        {apis.map((api) => (
          <Link to={api.url} key={api.name} target="_blank">
            <MagicCard
              className="cursor-pointer flex-col items-center justify-center text-center p-4 text-sm aspect-square text-gray-600 dark:text-gray-300 group relative"
              gradientColor={colorMode === "dark" ? "#364C63" : "#CCDAFF"}
              gradientFrom={colorMode === "dark" ? "#CCDAFF" : "#F1F4F8"}
              gradientTo={colorMode === "dark" ? "#364C63" : "#CCDAFF"}
            >
              <div className="flex flex-col items-center justify-center size-40 relative ">
                <div className="flex group-hover:text-white items-center justify-center mb-4 w-full h-full group-hover:scale-110 transition-all duration-300">
                  {api.icon}
                </div>
                <h1 className="absolute  bottom-4 text-xs transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
                  {api.name}
                </h1>
              </div>
            </MagicCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
