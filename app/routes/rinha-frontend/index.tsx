import {
  Link,
  isRouteErrorResponse,
  useOutletContext,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import {
  BsFillPersonFill,
  BsFillPersonPlusFill,
  BsLightbulbFill,
} from "react-icons/bs";

import AppLayout from "~/components/_layouts/root-layout";
import BackgroundBlur from "~/components/background-blur";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";
import TitleIcon from "~/components/title-icon";
import VimeoPlayer from "~/components/vimeo-player";
import Wave from "~/components/wave";

import type { User } from "~/models/user.server";
import useMousePosition from "./useMousePosition";
import transformElement from "./transformElement";
import { faqs, supporters, techs, steps } from "./data";

import { useColorMode } from "~/contexts/color-mode-context";

export default function HomePage() {
  const { user } = useOutletContext<{ user: User }>();
  const mousePosition = useMousePosition();
  const imageRef = useRef(null);
  const { colorMode } = useColorMode();

  useEffect(() => {
    let xy = [mousePosition.x, mousePosition.y];
    let position = xy.concat([imageRef.current]);

    window.requestAnimationFrame(function () {
      transformElement(imageRef.current, position);
    });
  }, [mousePosition]);

  const challengeURL = "/mini-projetos/rinha-frontend";

  function goToHowItWorks() {
    window?.document?.getElementById("como-funciona")?.scrollIntoView();
  }

  return (
    <AppLayout user={user} hideNavbarLinks={true}>
      <div className="flex flex-col items-center justify-center text-gray-900 dark:text-gray-50 scroll-smooth">
        <BackgroundBlur />

        <section
          id="headline"
          className="flex justify-center w-full md:min-h-screen z-1"
        >
          <div className="container flex flex-col items-center">
            <img
              src="img/rinha/logo-2.png"
              className="h-16 md:h-32 lg:h-40"
              alt="'Rinha de Front-end' em WordArt cor azul"
              ref={imageRef}
            />
            <h3 className="text-xs italic text-gray-600 dark:text-gray-400">
              (desculpe, não temos designers)
            </h3>

            <p className="mt-6 font-light text-center lg:mt-16 font-inter text-md md:text-xl lg:w-8/12">
              Um evento criado
              <span className="italic font-bold"> pela comunidade</span> para
              que as pessoas possam evoluir suas habilidades de front-end
              através de uma competição
              <span className="italic font-bold"> divertida </span> e
              <span className="italic font-bold"> desafiadora</span>!
            </p>

            <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:justify-around md:flex-row">
              <>
                <button
                  onClick={goToHowItWorks}
                  className="flex items-center px-4 py-2 text-gray-700 rounded-full bg-background-200"
                >
                  <BsLightbulbFill className="mr-2" color="#5282FF" /> Saiba
                  mais
                </button>

                <Link
                  to={challengeURL}
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 text-white rounded-full animate-bg bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-900"
                >
                  <BsFillPersonFill className="mr-2" color="#fff" /> Participe
                </Link>
              </>
            </div>
            <div className="relative flex-1 w-full max-w-3xl mt-4 lg:mt-10">
              <VimeoPlayer vimeoUrl="https://player.vimeo.com/video/871280881" />
            </div>
          </div>
        </section>
        <section className="absolute top-0 hidden w-full h-screen -z-10 lg:block">
          {techs.map(({ name, position }, index) => (
            <img
              key={name}
              className="absolute w-8 opacity-60 animate-float"
              src={`img/rinha/${name}.svg`}
              alt={`${name} logo`}
              style={{
                left: `${position[0]}%`,
                top: `${position[1]}%`,
                animationDelay: index * 0.5 + "s",
              }}
            />
          ))}
        </section>
        <section
          id="como-funciona"
          className="flex justify-center w-full mb-16 text-gray-800 bg-transparent dark:text-gray-50"
        >
          <div className="container mb-10">
            <h1 className="flex items-center mt-8 mb-4 text-3xl font-light sm:mt-16 font-lexend">
              <TitleIcon className="hidden w-4 h-4 mr-2 md:inline-block" /> Como
              vai funcionar?
            </h1>
            <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-start">
              Qualquer pessoa pode participar! De{" "}
              <span className="italic font-bold">júnior</span> a{" "}
              <span className="italic font-bold">especialista</span>, todo mundo
              consegue aprender algo novo e se divertir.
            </p>
            <section className="grid grid-cols-1 gap-10 text-gray-700 md:grid-cols-2 lg:grid-cols-3 dark:text-gray-100">
              {steps.map(({ title, description, img, alt }, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden min-h-[300px] group/border rounded-xl p-1"
                >
                  <article className="absolute z-10 flex flex-col gap-4 p-6 pb-4 transition-shadow inset-px dark:bg-background-700 bg-background-50 rounded-xl dark:border-background-600 hover:shadow-lg border-[1.5px] border-background-200">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white bg-blue-500 rounded-full border-[1.5px] dark:border-background-600 border-background-200">
                        {index + 1}
                      </div>
                      <h1 className="text-lg font-semibold">{title}</h1>
                    </div>
                    <p>{description}</p>
                    <img
                      src={
                        colorMode === "light"
                          ? img
                          : img.replace(".png", "-dark.png")
                      }
                      alt={alt}
                      className="mt-2 hover:animate-float h-full max-h-[150px] object-contain"
                    />
                  </article>
                  <span
                    aria-hidden="true"
                    className="absolute -z-0 inset-0 group/border scale-x-[1.5] blur before:absolute before:inset-0 before:h-10 before:top-[45%] before:w-[400px] before:bg-[conic-gradient(var(--tw-gradient-stops))] group-hover/border:visible invisible before:from-blue-900 dark:before:from-[#67d7eb] before:via-transparent before:to-transparent group-hover/border:before:animate-rotate-bg"
                  ></span>
                </div>
              ))}
            </section>

            <div className="flex justify-center mt-10">
              <Link
                to={challengeURL}
                rel="noreferrer"
                className="flex items-center justify-center w-56 h-12 gap-2 px-4 py-2 text-white rounded-full animate-bg bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-900"
              >
                <BsFillPersonPlusFill className="mr-2" color="#fff" />{" "}
                Participar
              </Link>
            </div>
          </div>
        </section>
        <Wave position="top" />
        <section
          id="faq"
          className="flex justify-center w-full text-gray-800 dark:bg-background-700 bg-background-100 dark:text-gray-50"
        >
          <div className="container relative -top-12">
            <h1 className="flex items-center mt-16 mb-4 text-3xl font-light font-lexend">
              <TitleIcon className="hidden w-4 h-4 mr-2 md:inline-block" /> FAQ
            </h1>
            <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-start">
              Aqui você encontra as perguntas mais frequentes sobre a{" "}
              <span className="italic font-bold">Rinha de Front-end</span>.
            </p>
            <section className="flex flex-col gap-5">
              {faqs.map(({ question, answer }, index) => (
                <article
                  key={index}
                  className="dark:bg-background-800 bg-background-50 dark:border-background-600 border-l-[3.5px] border-background-200 p-4"
                >
                  <h1 className="flex items-center mb-3 text-lg font-semibold">
                    <TitleIcon className="inline-block w-3 h-3 mr-2 " />
                    {question}
                  </h1>
                  <p>{answer}</p>
                </article>
              ))}
            </section>
            <div className="flex justify-center mt-10">
              <Link
                to={challengeURL}
                rel="noreferrer"
                className="flex items-center justify-center w-56 h-12 gap-2 px-4 py-2 text-white rounded-full animate-bg bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-900"
              >
                <BsFillPersonPlusFill className="mr-2" color="#fff" />{" "}
                Participar
              </Link>
            </div>
          </div>
        </section>
        <Wave position="bottom" />
        <section
          id="apoiadores"
          className="flex justify-center w-full text-gray-800 bg-transparent dark:text-gray-50"
        >
          <div className="container relative mb-6 top-4">
            <h1 className="flex items-center mb-4 text-3xl font-light font-lexend">
              <TitleIcon className="hidden w-4 h-4 mr-2 md:inline-block" />{" "}
              Apoiadores
            </h1>
            <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-start">
              Quem são as <span className="italic font-bold">pessoas</span> e{" "}
              <span className="italic font-bold">organizações</span> que estão
              fazendo a Rinha de Front-end acontecer.
            </p>
            <ul className="flex gap-4">
              {supporters.map((supporter, index) => (
                <li
                  key={index}
                  onClick={() => window.open(supporter.url, "__blank")}
                >
                  <img
                    className="w-32 h-32 border border-gray-200 rounded-full cursor-pointer dark:border-gray-700 hover:animate-float bg-background-800"
                    src={supporter.img}
                    alt={`Perfil de ${supporter.name}`}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return <Error500 error={error} />;
}
