import TitleIcon from "~/components/ui/title-icon";
import { getAssessments } from "~/lib/models/assessments.server";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import AssessmentCard from "./components/assessment-card";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { metaV1 } from "@remix-run/v1-meta";

export function meta(args: any) {
  const title = "Testes técnicos | Codante.io";
  const description =
    "Testes técnicos de programação utilizados em grandes empresas. Se prepare para ser aprovado no processo seletivo da sua empresa dos sonhos.";
  const imageUrl = getOgGeneratorUrl("Testes tecnicos");

  return metaV1(args, {
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
  });
}

export const loader = async () => {
  return { assessments: await getAssessments() };
};

type CheckboxState = { [key: string]: boolean };

export default function TestesTecnicosPage() {
  const [checkboxes, setCheckboxes] = useState<CheckboxState>({
    frontend: false,
    backend: false,
    fullstack: false,
  });
  const { assessments } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSearchBar(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      setSearchParams({
        stack: searchParams.getAll("stack"),
        search: e.target.value,
      });
    } else {
      setSearchParams({ stack: searchParams.getAll("stack") });
    }
  }

  function handleClickStack(stack: string) {
    let stackParams = searchParams.getAll("stack");
    setCheckboxes((prevCheckboxes) => ({
      ...prevCheckboxes,
      [stack]: !prevCheckboxes[stack],
    }));

    if (!stackParams.includes(stack)) {
      searchParams.append("stack", stack);
      stackParams = searchParams.getAll("stack");

      if (
        stackParams.includes("frontend") &&
        stackParams.includes("backend") &&
        stackParams.includes("fullstack")
      ) {
        searchParams.delete("stack");
        setSearchParams(searchParams);
        setCheckboxes({
          // desmarca todos os checkbox
          frontend: false,
          backend: false,
          fullstack: false,
        });
      }

      setSearchParams(searchParams);
    } else {
      const updatedStackParams = stackParams.filter((param) => param !== stack);
      searchParams.delete("stack");
      updatedStackParams.forEach((param) =>
        searchParams.append("stack", param),
      );
      setSearchParams(searchParams);
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
        </p>
        <p className="mt-2 text-sm">
          <strong>Atenção</strong>, esta página não é uma página de recrutamento
          e os testes abaixo não estão com vagas abertas!
        </p>
      </header>
      {/* Filtro */}
      <section className="flex flex-col h-full gap-5 my-10 rounded-lg lg:flex-row">
        <div className="relative w-full">
          <GoSearch className="absolute -translate-y-1/2 opacity-50 left-3 top-1/2" />
          <input
            className="h-full pl-9 w-full rounded-lg py-2 dark:bg-[#0e141a] border dark:border-slate-700 border-slate-300 dark:text-gray-50 text-gray-600 font-light dark:disabled:text-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-background-50 dark:disabled:bg-background-800"
            id="nameSearch"
            name="nameSearch"
            onChange={(e) => handleSearchBar(e)}
            placeholder="Nome da empresa"
          />
        </div>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border rounded-lg sm:flex border-background-200 dark:border-background-700 dark:bg-background-800 dark:text-white">
          <li className="w-full border-gray-200 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3 text-center">
              <input
                id="front-checkbox"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xs focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={() => handleClickStack("frontend")}
                checked={checkboxes.frontend}
              />
              <label
                htmlFor="front-checkbox"
                className="py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Front end
              </label>
            </div>
          </li>
          <li className="w-full border-gray-200 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                id="back-checkbox"
                type="checkbox"
                onChange={() => handleClickStack("backend")}
                checked={checkboxes.backend}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xs focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="back-checkbox"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Back end
              </label>
            </div>
          </li>
          <li className="w-full border-gray-200 dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                id="fullstack-checkbox"
                type="checkbox"
                checked={checkboxes.fullstack}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xs focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={() => handleClickStack("fullstack")}
              />
              <label
                htmlFor="fullstack-checkbox"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Full stack
              </label>
            </div>
          </li>
        </ul>
      </section>
      <section className="grid grid-cols-1 auto-rows-fr gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assessments
          .filter((assessment) => {
            const stackParams = searchParams.getAll("stack");
            if (stackParams.length === 0) return true;
            return stackParams.includes(assessment.type);
          })
          .filter((assessment) => {
            const search = searchParams.get("search");
            if (!search) return true;
            return assessment.title
              .toLowerCase()
              .includes(search.toLowerCase());
          })
          .map((assessment) => (
            <AssessmentCard key={assessment.slug} assessment={assessment} />
          ))}
      </section>
    </main>
  );
}
