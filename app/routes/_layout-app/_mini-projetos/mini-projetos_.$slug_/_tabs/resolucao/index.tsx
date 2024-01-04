import { useOutletContext, useNavigate } from "@remix-run/react";
import type { Challenge } from "~/lib/models/challenge.server";
import { CodeBracketIcon, VideoCameraIcon } from "@heroicons/react/24/outline";

export default function Resolution() {
  const context = useOutletContext<{ challenge: Challenge }>();
  const navigate = useNavigate();
  const challenge = context?.challenge;
  const workshop = challenge?.workshop;
  const lesson = workshop?.lessons[0];
  const slug = lesson?.slug;

  if (!challenge?.has_solution) {
    return navigate(`/mini-projetos/${challenge?.slug}`);
  }

  return (
    <>
      <div className="container">
        <section className="flex w-full gap-4 md:gap-8 items-start md:justify-start md:items-center md:flex-row mt-10">
          {/* Link para o vídeo */}

          <article
            className={`w-full flex flex-col-reverse md:flex-row items-center justify-between cursor-pointer transition-colors dark:bg-background-800/50 hover:dark:bg-background-800/100 shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 dark:border-background-700 px-4 py-4 md:py-10 sm:px-10 rounded-2xl gap-4 md:gap-0`}
            onClick={() =>
              navigate(`/mini-projetos/${challenge?.slug}/resolucao/${slug}`)
            }
          >
            <p className="flex flex-col text-center md:text-left">
              <span className="text-xs md:text-sm dark:text-gray-600 text-background-300">
                Acessar a resolução em
              </span>
              <span>
                <span className="md:text-2xl text-xl dark:text-white text-background-700">
                  Vídeo
                </span>
              </span>
            </p>
            <VideoCameraIcon className="md:w-10 w-8 group-hover:text-brand-500 text-background-200 dark:text-background-600 transition-colors" />
          </article>
          {/* Link para o código */}
          <article
            className={`w-full flex flex-col-reverse md:flex-row transition-colors items-center justify-between cursor-pointer dark:bg-background-800/50 hover:dark:bg-background-800/100 shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 dark:border-background-700 px-4 py-4 md:py-10 sm:px-10 rounded-2xl gap-4 md:gap-0`}
            onClick={() =>
              navigate(`/mini-projetos/${challenge?.slug}/resolucao-codigo`)
            }
          >
            <p className="flex flex-col text-center md:text-left">
              <span className="text-xs md:text-sm dark:text-gray-600 text-background-300">
                Acessar a resolução em
              </span>
              <span>
                <span className="md:text-2xl text-xl dark:text-white text-background-700">
                  Código
                </span>
              </span>
            </p>
            <CodeBracketIcon className="md:w-10 w-8 group-hover:text-brand-500 text-background-200 dark:text-background-600 transition-colors" />
          </article>
        </section>
      </div>
    </>
  );
}
