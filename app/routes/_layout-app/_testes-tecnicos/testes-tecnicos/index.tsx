import TitleIcon from "~/components/title-icon";
import { LuFileCheck } from "react-icons/lu";
import { TbSquareRoundedLetterB, TbSquareRoundedLetterF } from "react-icons/tb";
import TooltipWrapper from "~/components/tooltip";
import { json } from "@remix-run/node";
import type { Assessment } from "~/models/assessments.server";
import { getAssessments } from "~/models/assessments.server";
import { Link, useLoaderData } from "@remix-run/react";
import { useColorMode } from "~/contexts/color-mode-context";
import { getOgGeneratorUrl } from "~/utils/path-utils";

export function meta() {
  const title = "Testes técnicos | Codante.io";
  const description =
    "Testes técnicos de programação utilizados em grandes empresas. Se prepare para ser aprovado no processo seletivo da sua empresa dos sonhos.";
  const imageUrl = getOgGeneratorUrl("Testes tecnicos");

  return {
    title: title,
    description: description,
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "og:type": "website",
    "og:url": `https://codante.io/testes-tecnicos`,

    "twitter:card": "summary_large_image",
    "twitter:domain": "codante.io",
    "twitter:url": `https://codante.io/testes-tecnicos`,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
    "twitter:image:alt": "Testes técnicos Codante",
  };
}

export const loader = async ({ request }: { request: Request }) => {
  return json({
    assessments: await getAssessments(),
  });
};

export default function TestesTecnicosPage() {
  const { assessments } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  function borderColor(type: string) {
    switch (type) {
      case "frontend":
        return "rgb(82 130 255)";
      case "fullstack":
        return "linear-gradient(to bottom, rgb(82 130 255) 50%, #facc15 50%) bottom, linear-gradient(to bottom, #facc15 50%, rgb(82 130 255) 50%) top";
      case "backend":
        return "#facc15";
      default:
        return "rgb(82 130 255)";
    }
  }

  return (
    <main className="container mx-auto">
      <header className="mt-4 mb-12">
        <div className="flex items-center gap-2 lg:gap-6">
          <TitleIcon className="hidden w-8 h-8 lg:h-8 lg:w-8 md:inline-block" />
          <h1 className="text-3xl lg:text-4xl font-lexend">
            Testes Técnicos de Programação
          </h1>
        </div>
        <p className="mt-2 text-sm">
          Esta é uma seleção de testes técnicos já aplicados em processos
          seletivos passados. Use-os para se preparar para o processo seletivo
          da sua empresa. Créditos ao repositório do{" "}
          <a
            href="https://github.com/felipefialho/frontend-challenges"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            @felipefialho
          </a>
          .{" "}
          <p className="mt-2">
            <strong>Atenção</strong>, esta página não é uma página de
            recrutamento e os testes abaixo não estão com vagas abertas!
          </p>
        </p>
      </header>
      <section className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assessments.map((assessment) => (
          <Link
            key={assessment.slug}
            to={`/testes-tecnicos/${assessment.slug}`}
          >
            <div
              className="pl-1.5 rounded-lg"
              style={{
                background: borderColor(assessment.type),
              }}
            >
              <article className="flex items-start gap-3 justify-center p-3 bg-white rounded-r-lg shadow border-[1.5px] border-l-0 border-background-200 dark:border-background-700 dark:bg-background-800 ">
                <div className="flex items-center justify-center w-16 h-16 ">
                  <img
                    src={
                      colorMode === "dark"
                        ? assessment.image_url_dark ?? assessment.image_url
                        : assessment.image_url
                    }
                    alt="Logo da Empresa"
                    className="w-full border border-gray-200 rounded-lg dark:border-background-700"
                  />
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
          </Link>
        ))}
      </section>
    </main>
  );
}

function IconsAside({ assessment }: { assessment: Assessment }) {
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

      {assessment.has_challenge && (
        <TooltipWrapper text="Mini Projeto Disponível">
          <LuFileCheck className="text-gray-300 hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-300" />
        </TooltipWrapper>
      )}
    </div>
  );
}
