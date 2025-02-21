import { cardVariants } from "~/components/ui/cards/card";
import { AnimatedList } from "~/components/ui/motion/animated-list";
import { cn } from "~/lib/utils/cn";

interface Item {
  name: string;
  description: string;
}

const reqs = [
  {
    name: "API REST Countries",
    description: "Utilize a API REST Countries para obter os dados dos países.",
  },
  {
    name: "Next.js",
    description:
      "Utilize o Next.js na versão mais atual para construir a estrutura do projeto e gerenciar as rotas da aplicação.",
  },
  {
    name: "Responsividade",
    description:
      "Garanta que sua aplicação se comporta bem em celulares, tablets e desktops.",
  },
  {
    name: "Exiba uma lista de países",
    description:
      "Implemente a funcionalidade de exibir uma lista de países, mostrando sua bandeira e seu nome em português.",
  },
  {
    name: "Página de detalhes do país",
    description:
      "Ao clicar em um país, você deverá exibir em uma nova rota a página de detalhes do país",
  },
];

const requirements = Array.from({ length: 10 }, () => reqs).flat();

const RequirementItem = ({ name, description }: Item) => {
  return (
    <figure
      className={cn(
        cardVariants(),
        "relative ml-auto min-h-fit w-full lg:max-w-[600px] cursor-pointer overflow-hidden rounded-2xl p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{name}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">
            {description}
          </p>
        </div>
      </div>
    </figure>
  );
};

export default function RequirementsList({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[500px] flex-col overflow-hidden p-4 bg-background-100 dark:bg-background-800 rounded-2xl bg-grainy w-full lg:max-w-[600px]",
        className,
      )}
    >
      <AnimatedList>
        {requirements.map((item, idx) => (
          <RequirementItem {...item} key={idx} />
        ))}
      </AnimatedList>
    </div>
  );
}
