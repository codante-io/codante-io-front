import type { LinksFunction, MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { ColorModeProvider, useColorMode } from "~/contexts/color-mode-context";
import stylesheet from "~/tailwind.css";
import { DarkModeScriptTag } from "~/utils/dark-mode";
import { user } from "./services/auth.server";
import { Toaster } from "react-hot-toast";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
  { rel: "icon", href: "/favicon.svg" },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Codante - Cursos e Projetos Online de Programação",
  viewport: "width=device-width,initial-scale=1",
});

export function loader({ request }: { request: Request }) {
  return user({ request });
}

export default function App() {
  const user = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body
        className="dark:bg-gradient-to-br dark:from-gray-darkest dark:via-gray-dark dark:to-gray-dark
        bg-gradient-to-br from-white via-slate-50 to-slate-100
       dark:text-white bg-white text-gray-800"
      >
        <DarkModeScriptTag />
        <ColorModeProvider>
          <Navbar user={user} />
          {/* altura do footer de 170px. Se mudar deve mudar o cálculo aqui */}
          <main className="min-h-[calc(100vh-170px)] mx-auto">
            <Outlet />
          </main>
          <Footer />
        </ColorModeProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster />
        {process.env.NODE_ENV !== "production" && (
          <div className="fixed z-50 bottom-2 left-2 bg-blue-100 text-blue-700 text-center font-bold rounded-full py-2 w-20">
            <span className="block md:hidden">sm</span>
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
