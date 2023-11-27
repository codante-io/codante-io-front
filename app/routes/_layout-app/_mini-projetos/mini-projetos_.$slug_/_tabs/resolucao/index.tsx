import { useOutletContext, useNavigate } from "@remix-run/react";
import type { Challenge } from "~/models/challenge.server";
import { LuCode2, LuVideo } from "react-icons/lu";

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
        {/* <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
          Resolução do Mini Projeto
        </h1> */}
        <section className="flex w-full lg:justify-around gap-8 justify-between items-center md:flex-row flex-col mt-10">
          {/* Link para o vídeo */}
          <div className="flex flex-col items-center justify-center">
            <article
              className={`w-80 h-48 lg:w-96 lg:h-56 group rounded-xl relative cursor-pointer dark:hover:shadow-brand-300 hover:shadow-brand-500 shadow transition`}
              onClick={() =>
                navigate(`/mini-projetos/${challenge?.slug}/resolucao/${slug}`)
              }
            >
              <img
                src={workshop?.image_url}
                className="rounded-xl w-full h-full opacity-40 blur-sm group-hover:blur-none group-hover:opacity-100 transition"
                alt="Workshop thumbnail"
              />
              <LuVideo className="absolute group-hover:hidden transition-all inset-0 m-auto text-3xl dark:text-background-100 text-background-600" />
            </article>
            <span className="mt-3 font-lexend dark:text-background-100 text-background-600 text-sm font-semibold">
              Assistir resolução em vídeo
            </span>
          </div>
          {/* Link para o código */}
          <div className="flex flex-col items-center justify-center">
            <article
              className={`w-80 h-48 lg:w-96 lg:h-56 group rounded-xl relative cursor-pointer dark:hover:shadow-brand-300 hover:shadow-brand-500 shadow transition`}
              onClick={() =>
                navigate(`/mini-projetos/${challenge?.slug}/resolucao-codigo`)
              }
            >
              <img
                src={workshop?.image_url}
                className="rounded-xl w-full h-full opacity-40 blur-sm group-hover:blur-none group-hover:opacity-100 transition"
                alt="Workshop thumbnail"
              />
              <LuCode2 className="absolute group-hover:hidden transition-all inset-0 m-auto text-3xl dark:text-background-100 text-background-600" />
            </article>
            <span className="mt-3 font-lexend dark:text-background-100 text-background-600 text-sm font-semibold">
              Acessar código da resolução
            </span>
          </div>
        </section>
      </div>
    </>
  );
}
