import { redirect } from "react-router";
import { useState } from "react";
import { currentToken } from "~/lib/services/auth.server";
import AuthCard from "~/routes/_layout-app/_auth/auth-card";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import type { Route } from "./+types/index";

export async function loader({ request }: Route.LoaderArgs) {
  const token = await currentToken({ request });

  if (!token) {
    return redirect("/login?redirectTo=/cli/auth");
  }

  return { token };
}

export default function CliAuth({ loaderData }: Route.ComponentProps) {
  const { token } = loaderData;
  const [copied, setCopied] = useState(false);
  const { colorMode } = useColorMode();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-10 flex justify-center">
          <img
            src={colorMode === "light" ? "/codante-light.svg" : "/codante.svg"}
            alt="Codante"
            className="w-48"
          />
        </div>

        <AuthCard>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-brand-400"
              >
                <path
                  fillRule="evenodd"
                  d="M3.25 3A2.25 2.25 0 001 5.25v9.5A2.25 2.25 0 003.25 17h13.5A2.25 2.25 0 0019 14.75v-9.5A2.25 2.25 0 0016.75 3H3.25zm.943 8.752a.75.75 0 01.055-1.06L6.128 9l-1.88-1.693a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 01-1.06-.055zM9.75 10.25a.75.75 0 000 1.5h2.5a.75.75 0 000-1.5h-2.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Codante CLI
            </h1>
          </div>

          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Copie o token abaixo e cole no seu terminal para autenticar.
          </p>

          <div className="group relative mb-4 rounded-lg border border-background-200 bg-background-50 dark:border-background-600 dark:bg-background-900">
            <p className="break-all p-4 font-mono text-xs leading-relaxed text-gray-700 dark:text-gray-300">
              {token}
            </p>
          </div>

          <button
            onClick={handleCopy}
            className="w-full rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-background-800"
          >
            {copied ? "Copiado!" : "Copiar token"}
          </button>

          <div className="mt-5 rounded-lg border border-background-200 bg-background-50 p-3 dark:border-background-700 dark:bg-background-900/50">
            <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
              Cole no terminal:
            </p>
            <code className="text-xs text-brand-400">
              codante auth login --token SEU_TOKEN
            </code>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
