import TitleIcon from "~/components/title-icon";
import { json } from "@remix-run/node";
import { getAssessments } from "~/models/assessments.server";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { getOgGeneratorUrl } from "~/utils/path-utils";
import AssessmentCard from "./components/assessment-card";

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
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClickStack(stack: string) {
    let stackParams = searchParams.getAll("stack");

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
      }

      setSearchParams(searchParams);
    } else {
      const updatedStackParams = stackParams.filter((param) => param !== stack);
      searchParams.delete("stack");
      updatedStackParams.forEach((param) =>
        searchParams.append("stack", param)
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
        <input
          className="w-full rounded p-2 px-3 dark:bg-[#0e141a] border dark:border-slate-700 border-slate-300 dark:text-gray-50 text-gray-600 font-light disabled:dark:text-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-background-50 dark:disabled:bg-background-800"
          id="nameSearch"
          name="nameSearch"
          onChange={(e) => {
            setSearchParams({
              stack: searchParams.getAll("stack"),
              search: e.target.value,
            });
          }}
        />
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border rounded-lg sm:flex border-background-200 dark:border-background-700 dark:bg-background-800 dark:text-white">
          <li className="w-full border-gray-200 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                id="front-checkbox"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={() => handleClickStack("frontend")}
              />
              <label
                htmlFor="front-checkbox"
                className="py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Front-end
              </label>
            </div>
          </li>
          <li className="w-full border-gray-200 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                id="back-checkbox"
                type="checkbox"
                onChange={() => handleClickStack("backend")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="back-checkbox"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Back-end
              </label>
            </div>
          </li>
          <li className="w-full border-gray-200 dark:border-gray-600">
            <div className="flex items-center pl-3">
              <input
                id="fullstack-checkbox"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                onChange={({ target }) => handleClickStack("fullstack")}
              />
              <label
                htmlFor="fullstack-checkbox"
                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                FullStack
              </label>
            </div>
          </li>
        </ul>
        {/* <div className="flex flex-col items-center mt-2 md:justify-evenly md:flex-row">
          <button
            onClick={() => handleClickStack("frontend")}
            className={`mt-2 md:mt-0 pb-2 w-28 border-b-[1.5px] ${
              searchParams.get("stack") === "front"
                ? "border-brand-500 font-semibold"
                : "border-[#0e141a]"
            }`}
          >
            Front
          </button>
          <button
            onClick={() => handleClickStack("backend")}
            className={`mt-2 md:mt-0 pb-2 w-28 border-b-[1.5px] ${
              searchParams.get("stack") === "back"
                ? "border-yellow-500 font-semibold"
                : "border-[#0e141a]"
            }`}
          >
            Back
          </button>
          <button
            onClick={() => handleClickStack("fullstack")}
            className={`mt-2 md:mt-0 pb-2 w-28 border-b-[1.5px] ${
              searchParams.get("stack") === "fullstack"
                ? "border-[#F58FEB] font-semibold"
                : "border-[#0e141a]"
            }`}
            // style={{borderColor: "rgb(245 143 235)"}}
          >
            FullStack
          </button>
        </div> */}
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
