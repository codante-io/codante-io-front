import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Info from "./info-icon";

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const errorString = url.searchParams.get("error");

  if (!errorString) {
    return { error: null };
  }

  return { error: errorString };
}

export default function AssineErro() {
  const { error } = useLoaderData<typeof loader>();
  return (
    <main className="container mx-auto mt-12 text-center">
      <div className="max-w-2xl mx-auto dark:bg-background-700 rounded-xl dark:border-background-600 border-[1.5px] shadow-lg">
        <div className="flex items-center justify-center p-10 bg-gray-300 dark:bg-background-900 rounded-t-xl">
          <Info className="text-red-500 dark:text-red-300 w-28 h-28" />
        </div>
        <div className="p-10 px-14">
          <h2 className="mb-3 text-2xl font-bold md:text-3xl font-lexend">
            Ops... algo deu errado.
          </h2>
          <hr className="mx-auto border-2 border-red-500 rounded-full dark:border-red-300 w-28" />
          <p className="mt-8 font-light">
            Ocorreu um erro ao processar seu pagamento. Tente realizar o
            pagamento novamente ou entre em contato com a gente!
          </p>
          {error && (
            <p className="mt-4 text-sm text-gray-400">
              <b>Erro:</b> <i>{error}</i>
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
