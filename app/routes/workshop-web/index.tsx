import {
  isRouteErrorResponse,
  useOutletContext,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useRef } from "react";

import AppLayout from "~/components/_layouts/root-layout";
import BackgroundBlur from "~/components/_layouts/background-blur";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import TitleIcon from "~/components/ui/title-icon";
import type { User } from "~/lib/models/user.server";
import useMousePosition from "./useMousePosition";
import transformElement from "./transformElement";
import { techs, steps } from "./data";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import LeadForm from "./lead-form";
import { registerMarketingLead } from "~/lib/models/lead.server";
import { ActionFunctionArgs } from "@remix-run/node";

export const meta = () => {
  return [
    { title: "Desenvolvimento web" },
    { name: "description", content: "Inicie no desenvolvimento web" },
    { property: "og:title", content: "Iniciando no desenvolvimento web" },
    { property: "og:description", content: "Inicie no desenvolvimento web" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://codante.io/workshop-web" },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    { property: "twitter:url", content: "https://codante.io/workshop-web" },
    { property: "twitter:title", content: "Iniciando no desenvolvimento web" },
    {
      property: "twitter:description",
      content: "Inicie no desenvolvimento web",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  return registerMarketingLead(request, {
    email,
    name,
    phone,
    tag: "workshop-web-out-2024",
  });
};

export default function HomePage() {
  const { user } = useOutletContext<{ user: User }>();
  const mousePosition = useMousePosition();
  const imageRef = useRef(null);
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (window?.screen?.width < 640) return;

    const xy = [mousePosition.x, mousePosition.y];
    const position = xy.concat([imageRef.current]);

    window.requestAnimationFrame(function () {
      transformElement(imageRef.current, position);
    });
  }, [mousePosition]);

  return (
    <AppLayout user={user} hideNavbarLinks={true}>
      <div className="flex flex-col items-center justify-center text-gray-900 dark:text-gray-50 scroll-smooth">
        <BackgroundBlur />

        <div className="flex flex-col items-center justify-center text-gray-900 dark:text-gray-50 scroll-smooth">
          <BackgroundBlur />

          <section id="headline" className="flex justify-center w-full z-1">
            <div className="container flex flex-col lg:flex-row">
              <div className="flex flex-col items-center">
                <img
                  src={
                    colorMode === "light"
                      ? "img/workshop-web/logo1.svg"
                      : "img/workshop-web/logo-dark.png"
                  }
                  className="logo-light"
                  alt="imagem de um texto escrito iniciando no desenvolvimento web"
                  ref={imageRef}
                />

                <p className="font-light text-center text-2xl my-16 lg:mx-10">
                  Quer aprender desenvolvimento web,{" "}
                  <span className="italic font-bold">
                    mas não sabe por onde começar
                  </span>
                  ? Estamos aqui para{" "}
                  <span className="italic font-bold">te guiar</span> nessa
                  jornada!
                </p>

                <p className="font-light text-center text-2xl mb-10 lg:mx-10">
                  Participe do nosso workshop gratuito e ao vivo que vai
                  acontecer nos dias
                  <span className="italic font-bold">
                    {" "}
                    9, 10 e 11 de Outubro
                  </span>
                  .
                </p>
              </div>
              <div className="mb-10">
                <LeadForm />
              </div>
            </div>
          </section>
        </div>
        <section className="absolute top-0 hidden w-full h-screen -z-10 lg:block">
          {techs.map(({ name, position }, index) => (
            <img
              key={name}
              className="absolute w-8 opacity-60 animate-float"
              src={`img/workshop-web/${name}.svg`}
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
          className="flex justify-center w-full  mt-20 mb-16 text-gray-800 bg-transparent dark:text-gray-50"
        >
          <div className="container mb-10">
            <h1 className="flex items-center mt-4 mb-4 text-3xl font-light sm:mt-8 font-lexend">
              <TitleIcon className="hidden w-4 h-4 mr-2 md:inline-block" /> Como
              vai funcionar?
            </h1>

            <p className="mt-2 mb-10 font-light font-inter text-md md:text-xl text-start">
              Faremos um workshop ao vivo e gratuito nos dias{" "}
              <span className="italic font-bold"> 9, 10 e 11 de Outubro</span>.
              Para te ensinar como funciona o desenvolvimento web.
            </p>

            <section className="grid grid-cols-1 gap-10 text-gray-700 md:grid-cols-2 lg:grid-cols-3 dark:text-gray-100">
              {steps.map(({ title, description, img, alt }, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden h-[400px] md:h-[300px] min-h-[300px] group/border rounded-xl p-1"
                >
                  <article className="absolute z-10 flex flex-col gap-4 p-6 pb-4 transition-shadow inset-px dark:bg-background-700 bg-background-50 rounded-xl dark:border-background-600 hover:shadow-lg border-[1.5px] border-background-200">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white bg-blue-500 rounded-full border-[1.5px] dark:border-background-600 border-background-200">
                        {index + 1}
                      </div>
                      <h1 className="text-lg font-semibold">{title}</h1>
                    </div>
                    <p className="text-base md:text-sm xl:text-base">
                      {description}
                    </p>
                    <img
                      src={
                        colorMode === "light"
                          ? img
                          : img.replace(".png", "-dark.png")
                      }
                      alt={alt}
                      className="mt-2 hover:animate-float h-full max-h-[200px] md:max-h-[120px] xl:max-h-[130px] object-contain"
                    />
                  </article>
                  <span
                    aria-hidden="true"
                    className="absolute -z-0 inset-0 group/border scale-x-[1.5] blur before:absolute before:inset-0 before:h-10 before:top-[45%] before:w-[400px] before:bg-[conic-gradient(var(--tw-gradient-stops))] group-hover/border:visible invisible before:from-blue-900 dark:before:from-[rgb(103, 215, 235)] before:via-transparent before:to-transparent group-hover/border:before:animate-rotate-bg"
                  ></span>
                </div>
              ))}
            </section>
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
