import TitleIcon from "~/components/title-icon";
import { LuFileCheck, LuVideo } from "react-icons/lu";
import { TbSquareRoundedLetterB, TbSquareRoundedLetterF } from "react-icons/tb";
import * as Tooltip from "@radix-ui/react-tooltip";

export default function TestesTecnicosPage() {
  const assessments = [
    {
      slug: "testes-tecnicos",
      title: "Nubank",
      tags: ["React", "Node.js", "TypeScript", "GraphQL", "AWS"],
      image: "/static/images/workshops/testes-tecnicos.png",
      type: "backend",
    },
    {
      slug: "testes-tecnicos1",
      title: "XP Investimentos Limitada",
      short_description: "Testes técnicos para programadores.",
      image: "/static/images/workshops/testes-tecnicos.png",
      type: "frontend",
    },
    {
      slug: "testes-tecnicos2",
      title: "Nubank",
      short_description: "Testes técnicos para programadores.",
      tags: ["React"],
      image: "/static/images/workshops/testes-tecnicos.png",
      type: "fullstack",
    },
    {
      slug: "testes-tecnicos3",
      title: "Estante Virtual",
      short_description: "Testes técnicos para programadores.",
      image: "/static/images/workshops/testes-tecnicos.png",
      type: "backend",
    },
    {
      slug: "testes-tecnicos4",
      title: "Testes Técnicos",
      short_description: "Testes técnicos para programadores.",
      image: "/static/images/workshops/testes-tecnicos.png",
      type: "frontend",
    },
    {
      slug: "testes-tecnicos5",
      title: "Nubank",
      short_description: "Testes técnicos para programadores.",
      image: "/static/images/workshops/testes-tecnicos.png",
      type: "frontend",
    },
  ];

  function borderColor(type: string) {
    switch (type) {
      case "frontend":
        return "rgb(82 130 255)";
      case "fullstack":
        return "linear-gradient(to bottom, rgb(82 130 255) 50%, rgb(234 179 8) 50%) bottom, linear-gradient(to bottom, rgb(234 179 8) 50%, rgb(82 130 255) 50%) top";
      case "backend":
        return "rgb(234 179 8)";
      default:
        return "rgb(82 130 255)";
    }
  }

  return (
    <main className="container mx-auto">
      <header className="flex items-center gap-2 mt-4 mb-12 lg:gap-6">
        <TitleIcon className="hidden w-8 h-8 lg:h-8 lg:w-8 md:inline-block" />
        <div>
          <h1 className="text-3xl lg:text-4xl font-lexend">
            Testes Técnicos de Programação
          </h1>
        </div>
      </header>
      <section className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assessments.map((assessment) => (
          <div
            key={assessment.slug}
            className="pl-1.5 rounded-lg"
            style={{
              background: borderColor(assessment.type),
            }}
          >
            <article className="flex items-center gap-2 justify-center p-3 bg-white rounded-r-lg shadow border-[1.5px] border-l-0 border-background-200 dark:border-background-700 dark:bg-background-800 h-32">
              <div>
                <div className="w-20 h-20 bg-gray-500"></div>
              </div>
              <div className="flex-1">
                <h2 className="mb-2 leading-tight font-lexend">
                  {assessment.title}
                </h2>
                <p className="text-xs text-gray-700 dark:text-gray-400">
                  {assessment.tags?.join(", ")}
                </p>
              </div>
              <IconsAside assessment={assessment} />
            </article>
          </div>
        ))}
      </section>
    </main>
  );
}

function IconsAside({ assessment }: { assessment: any }) {
  return (
    <div className="flex flex-col justify-start w-4 min-h-full gap-2">
      {(assessment.type === "frontend" || assessment.type === "fullstack") && (
        <TooltipWrapper text="Frontend">
          <TbSquareRoundedLetterF className="text-brand-500 dark:text-brand-500 dark:opacity-70 dark:hover:opacity-100 hover:text-brand-500" />
        </TooltipWrapper>
      )}
      {(assessment.type === "backend" || assessment.type === "fullstack") && (
        <TooltipWrapper text="Backend">
          <TbSquareRoundedLetterB className="text-yellow-500 dark:opacity-70 dark:text-yellow-500 hover:text-yellow-500 dark:hover:opacity-100" />
        </TooltipWrapper>
      )}

      <TooltipWrapper text="Mini Projeto Disponível">
        <LuFileCheck className="text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-300" />
      </TooltipWrapper>
      <TooltipWrapper text="Resolução Disponível">
        <LuVideo className="text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-300" />
      </TooltipWrapper>
    </div>
  );
}

function TooltipWrapper({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="right"
            className="px-2 py-3 text-xs bg-gray-200 rounded shadow-lg dark:text-white dark:bg-gray-600 TooltipContent"
            sideOffset={5}
          >
            {text}
            <Tooltip.Arrow className="fill-gray-200 bg-opacity-90 dark:fill-gray-600 TooltipArrow" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
