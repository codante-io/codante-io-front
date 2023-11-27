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
  const githubRepo = "mp-blog-pessoal";

  return (
    <section className="container">
      <div className="w-full h-[80vh] rounded-lg bg-background-200 dark:bg-background-900">
        <iframe
          title="slug"
          // src="https://stackblitz.com/github/felipemuller20/mp-blog-pessoal?ctl=1&embed=1&terminalHeight=0&file=src%2Fapp%2Fpage.tsx&hideNavigation=1&view=editor"
          src={`https://stackblitz.com/github/${githubOrganization}/${githubRepo}?ctl=1&embed=1&terminalHeight=0&file=src%2Fapp%2Fpage.tsx&hideNavigation=1&view=editor&theme=${colorMode}`}
          className="w-full h-full rounded-lg shadow"
        ></iframe>
      </div>
      <div className="mt-10 w-fit flex flex-col gap-2">
        <a
          href={`https://github.com/${githubOrganization}/${githubRepo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-fit gap-2 text-lg font-light hover:opacity-50 hover:text-brand-300"
        >
          <BsGithub className="text-xl" />
          <span>Acessar o código no GitHub</span>
        </a>
        <a
          href="https://codante.io"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center w-fit gap-2 text-lg font-light hover:opacity-50 hover:text-brand-300"
        >
          <BsGlobe className="text-xl" />
          <span>Acessar o deploy da aplicação</span>
        </a>
      </div>
    </section>
  );
}
