import { useOutletContext, useNavigate } from "@remix-run/react";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { useColorMode } from "~/contexts/color-mode-context";
import type { Challenge } from "~/models/challenge.server";

export default function ResolutionCode() {
  const context = useOutletContext<{ challenge: Challenge }>();
  const navigate = useNavigate();
  const challenge = context?.challenge;

  const { colorMode } = useColorMode();

  if (!challenge?.has_solution) {
    return navigate(`/mini-projetos/${challenge?.slug}`);
  }

  const githubOrganization = "felipemuller20";
  const githubRepo = "mp-lista-de-paises-next";

  return (
    <section className="container">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Resolução em Código
      </h1>
      <div className="relative w-full h-[65vh] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-cover lg:bg-fill bg-center bg-no-repeat blur-sm bg-[url('/img/cover-stackblitz-light.png')] dark:bg-[url('/img/cover-stackblitz-dark.png')]"></div>
        <iframe
          title="slug"
          src={`https://stackblitz.com/github/${githubOrganization}/${githubRepo}?ctl=1&embed=1&terminalHeight=0&file=src%2Fapp%2Fpage.tsx&hideNavigation=1&view=editor&theme=${colorMode}`}
          className="w-full h-full rounded-lg shadow blur-none relative z-10"
        ></iframe>
      </div>
      <div className="mt-10 w-full flex md:gap-8 gap-4">
        <a
          className={`dark:bg-[#17212B] flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 justify-between dark:border-background-700 w-full rounded-lg p-5`}
          href="https://codante.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-xs md:text-base lg:text-lg">
            Acessar o código no GitHub
          </p>
          <BsGithub className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600" />
        </a>

        <a
          className={`dark:bg-[#17212B] flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 justify-between dark:border-background-700 w-full rounded-lg p-5`}
          href="https://codante.io"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="text-xs md:text-base lg:text-lg">
            Acessar o deploy da aplicação
          </p>
          <BsGlobe className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600" />
        </a>
      </div>
    </section>
  );
}
