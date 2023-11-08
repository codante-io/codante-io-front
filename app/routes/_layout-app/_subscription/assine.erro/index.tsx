import type { LoaderArgs } from "@remix-run/node";
import infoIcon from "./info.svg";
import { useLoaderData } from "@remix-run/react";

export function loader({ request }: LoaderArgs) {
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
      <div className="max-w-2xl mx-auto bg-background-700 rounded-xl border-background-600 border-[1.5px]">
        <div className="flex items-center justify-center p-10 bg-background-900 rounded-t-xl">
          <img
            src={infoIcon}
            className={`w-28 h-28 text-green-300"
            }`}
            alt="ícone de info"
          />
        </div>
        <div className="p-10 px-14">
          <h2 className="mb-3 text-3xl font-bold font-lexend">
            Ops... algo deu errado.
          </h2>
          <hr className="mx-auto border-2 border-red-300 rounded-full w-28" />
          <p className="mt-8 font-light">
            Ocorreu um erro ao processar seu pagamento. Tente realizar o
            pagamento novamente ou entre em contato com a gente!
          </p>
          <p className="mt-4 text-sm text-gray-400">
            <b>Erro:</b> <i>{error}</i>
          </p>
        </div>
      </div>
    </main>
  );
}
