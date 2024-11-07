import { json, type LinksFunction } from "@remix-run/node";
import type { MetaFunction } from "@remix-run/react";
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import React from "react";
import { Toaster } from "react-hot-toast";
import { GoogleTagManager } from "./components/_layouts/google-tag-manager";
import PublicEnv, { getPublicEnv } from "./components/_layouts/public-env";
import { Error500 } from "./components/features/error-handling/500";
import NotFound from "./components/features/error-handling/not-found";
import LoadingBar from "./components/ui/loading-bar";
import { ColorModeProvider } from "./lib/contexts/color-mode-context";
import { environment } from "./lib/models/environment";
import type { User } from "./lib/models/user.server";
import { user } from "./lib/services/auth.server";
import { DarkModeScriptInnerHtml } from "./lib/utils/dark-mode";
import { getOgGeneratorUrl } from "./lib/utils/path-utils";
import stylesheet from "./tailwind.css?url";
import AlertBannerPortal from "~/components/ui/alert-banner-portal";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "preconnect", href: "https://rsms.me" },
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css?url" },
  { rel: "icon", href: "/favicon.svg" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon-16x16.png",
  },
  { rel: "manifest", href: "/site.webmanifest" },

  { rel: "shortcut icon", href: "/favicon.ico" },
  { rel: "mask-icon", href: "/mask-icon.svg", color: "#5282FF" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Codante - Cursos e Projetos Online de Programação" },
    {
      property: "og:title",
      content: "Codante - Cursos e Projetos Online de Programação",
    },
    {
      name: "description",
      content:
        "Fuja dos mesmos cursos e tutoriais de sempre e aprimore suas skills em programação com workshops e mini projetos ensinados pelos melhores profissionais do mercado!",
    },
    {
      property: "og:description",
      content:
        "Fuja dos mesmos cursos e tutoriais de sempre e aprimore suas skills em programação com workshops e mini projetos ensinados pelos melhores profissionais do mercado!",
    },
    {
      property: "og:image",
      content: getOgGeneratorUrl("Codante"),
    },
    { property: "og:type", content: "website" },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    { name: "twitter:domain", content: "codante.io" },
    {
      name: "twitter:title",
      content: "Codante - Cursos e Projetos Online de Programação",
    },
    {
      name: "twitter:description",
      content:
        "Fuja dos mesmos cursos e tutoriais de sempre e aprimore suas skills em programação com workshops e mini projetos ensinados pelos melhores profissionais do mercado!",
    },
    {
      name: "twitter:image",
      content: getOgGeneratorUrl("Codante"),
    },
    {
      name: "twitter:image:alt",
      content: "Codante",
    },
  ];
};

export async function loader({ request }: { request: Request }) {
  const userData = (await user({ request })) as User | null;

  // if user is a response, it means that the user is not authenticated
  // we will return this response to destroy the session cookie
  if (userData instanceof Response) {
    return userData;
  }

  //https://sergiodxa.com/tutorials/fix-double-data-request-when-prefetching-in-remix
  const headers = new Headers();
  const purpose =
    request.headers.get("Purpose") ||
    request.headers.get("X-Purpose") ||
    request.headers.get("Sec-Purpose") ||
    request.headers.get("Sec-Fetch-Purpose") ||
    request.headers.get("X-Moz");

  if (purpose === "prefetch") {
    headers.set("Cache-Control", "private, max-age=20");
  }

  return json(
    {
      user: userData,
      ENV: {
        BASE_URL: environment().BASE_URL,
        NODE_ENV: environment().NODE_ENV,
      },
    },
    { headers },
  );
}

export default function App() {
  const loaderData = useLoaderData<typeof loader>();
  const user = loaderData.user;

  return (
    <html lang="pt" suppressHydrationWarning className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body className="text-gray-800 bg-white dark:bg-gray-dark dark:bg-gradient-to-br dark:from-gray-darkest dark:to-gray-dark bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:text-gray-50 dark:scrollbar">
        <script
          dangerouslySetInnerHTML={{
            __html: DarkModeScriptInnerHtml,
          }}
        />
        <GoogleTagManager
          environment={process.env.NODE_ENV}
          gtmTrackingId="GTM-NXHM2J7"
          user={user}
        />
        <ColorModeProvider>
          <LoadingBar />
          <Outlet context={{ user }} />
        </ColorModeProvider>
        <ScrollRestoration />
        {/* Env pública: https://remix.run/docs/en/main/guides/envvars | https://dev.to/remix-run-br/type-safe-environment-variables-on-both-client-and-server-with-remix-54l5 */}
        <PublicEnv {...loaderData.ENV} />
        <Scripts />
        <Toaster
          toastOptions={{
            className:
              "bg-background-50 dark:bg-background-800 dark:text-gray-50",
          }}
        />
        <AlertBannerPortal
          excludedRoutes={["/black-friday"]}
          position="bottom"
          type="black-friday"
          title={
            <h1 className="text-3xl mt-10 font-nabla">
              Black Friday do Codante
            </h1>
          }
          subtitle={
            <p className="mb-10">
              A última chance.{" "}
              <Link
                to="/black-friday"
                className="font-bold decoration-amber-400 underline"
              >
                Cadastre-se para ficar por dentro!
              </Link>{" "}
            </p>
          }
        />
        {getPublicEnv("NODE_ENV") !== "production" && (
          <div className="fixed z-50 w-20 py-2 font-bold text-center text-blue-700 bg-blue-100 rounded-full bottom-2 left-2">
            <span className="block sm:hidden">xs</span>
            <span className="hidden sm:block md:hidden">sm</span>
            <span className="hidden md:block lg:hidden">md</span>
            <span className="hidden lg:block xl:hidden">lg</span>
            <span className="hidden xl:block 2xl:hidden">xl</span>
            <span className="hidden 2xl:block">2xl</span>
          </div>
        )}
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="pt">
      <head>
        <title>
          {isRouteErrorResponse(error)
            ? `Página não encontrada`
            : "Ops... algum erro aconteceu!"}
        </title>
        <Meta />
        <Links />
        <meta charSet="utf-8" />
      </head>
      <body className="text-gray-800 dark:bg-background-900 bg-background-50 dark:text-gray-50">
        <script
          dangerouslySetInnerHTML={{
            __html: DarkModeScriptInnerHtml,
          }}
        />
        <ColorModeProvider>
          <LoadingBar />

          {isRouteErrorResponse(error) ? (
            <NotFound />
          ) : (
            <Error500 error={error} />
          )}
        </ColorModeProvider>
        <Scripts />
      </body>
    </html>
  );
}
