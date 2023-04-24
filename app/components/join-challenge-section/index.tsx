import { Link } from "@remix-run/react";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import Button from "~/components/form/button";
import { useColorMode } from "~/contexts/color-mode-context";

export default function JoinChallengeSection({
  className = "",
  user,
}: {
  className?: string;
  user?: any;
}) {
  const { colorMode } = useColorMode();

  const steps = [
    {
      name: "Participe do mini projeto",
      description:
        "Clique aqui para registrar sua participação nesse projeto. É 100% gratuito!",
      button: "Participar",
      buttonOnClick: () => {},
      status: "current",
    },
    {
      name: "Conecte o seu GitHub",
      description:
        "Para participar do mini projeto você precisa conectar a sua conta do GitHub.",
      button: "Conectar GitHub",
      buttonOnClick: () => {},
      status: "upcoming",
    },
    {
      name: "Faça o fork do repositório",
      description:
        'Acesse o link do repositório, faça um fork e clique em "Verificar". Depois disso é só baixar o seu fork e começar a codar!',
      button: "Verificar fork",
      buttonOnClick: () => {},
      status: "upcoming",
    },
    {
      name: "Finalizar projeto",
      description:
        "Quando acabar o seu mini projeto é só marcar como concluído.",
      button: "Marcar como concluído",
      buttonOnClick: () => {},
      status: "upcoming",
    },
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <article
      className={`${className} relative w-full bg-slate-50 dark:bg-gray-dark shadow-md rounded-lg p-4 pt-3 font-inter border-[1.5px] border-gray-300 dark:border-slate-600`}
    >
      {user ? (
        <>
          <nav aria-label="Progress" className="m-4">
            <ol role="list" className="overflow-hidden">
              {steps.map((step, stepIdx) => (
                <li
                  key={step.name}
                  className={classNames(
                    stepIdx !== steps.length - 1 ? "pb-10" : "",
                    "relative"
                  )}
                >
                  {step.status === "complete" ? (
                    <>
                      {stepIdx !== steps.length - 1 ? (
                        <div
                          className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-blue-300 dark:bg-blue-900"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="group relative flex items-start">
                        <span className="flex h-9 items-center">
                          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-blue-300 dark:bg-blue-900 group-hover:bg-blue-400 dark:group-hover:bg-blue-950">
                            <AiOutlineCheck
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </span>
                        </span>
                        <span className="ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-medium">
                            {step.name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {step.description}
                          </span>
                        </span>
                      </div>
                    </>
                  ) : step.status === "current" ? (
                    <>
                      {stepIdx !== steps.length - 1 ? (
                        <div
                          className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300 dark:bg-gray-400"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div
                        className="group relative flex items-start"
                        aria-current="step"
                      >
                        <span
                          className="flex h-9 items-center"
                          aria-hidden="true"
                        >
                          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-300 dark:border-blue-900 bg-white">
                            <span className="h-2.5 w-2.5 rounded-full bg-blue-300 dark:bg-blue-900" />
                          </span>
                        </span>
                        <span className="ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-bold">{step.name}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {step.description}
                          </span>
                          <Button
                            type="button"
                            className="my-4"
                            onClick={step.buttonOnClick}
                          >
                            {step.button}
                          </Button>
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      {stepIdx !== steps.length - 1 ? (
                        <div
                          className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300 dark:bg-gray-400"
                          aria-hidden="true"
                        />
                      ) : null}
                      <div className="group relative flex items-start">
                        <span
                          className="flex h-9 items-center"
                          aria-hidden="true"
                        >
                          <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                            <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 bg-gray-300 dark:bg-gray-400" />
                          </span>
                        </span>
                        <span className="ml-4 flex min-w-0 flex-col">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {step.name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {step.description}
                          </span>
                        </span>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </>
      ) : (
        <>
          <section className="text-center text-lg">
            <span>
              <span className="font-extralight">
                Você precisa fazer login para participar dos mini projetos.
              </span>
            </span>
          </section>
          {/* <section className="w-full flex justify-center my-8">
            <img
              className="h-48"
              src={`/img/join-challenge-illustration-${colorMode}.svg`}
              alt="Person holding an X icon illustration"
            />
          </section> */}
          <section className="mt-6 flex gap-8 justify-center">
            <Link to="/login" className="w-full">
              <Button type="button" className="w-full rounded-full">
                Login
              </Button>
            </Link>
          </section>
        </>
      )}
    </article>
  );
}
