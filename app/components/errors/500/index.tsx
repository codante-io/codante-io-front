import { Link } from "react-router-dom";
import { useRouteError } from "@remix-run/react";

export function Error500({ error = null }: { error?: any }) {
  return (
    <div className="container py-20 mx-auto">
      <p className="mb-6 text-lg font-light text-brand">500</p>
      <h1 className="mb-6 text-5xl font-bold font-lexend dark:text-slate-300">
        Ops...
      </h1>
      <p className="dark:text-slate-500">Alguma coisa deu errada...</p>
      <p className="mb-10 dark:text-slate-500 ">
        Se o erro persistir, entra em contato com a gente!
      </p>
      {process.env.NODE_ENV !== "production" ? (
        <pre className="p-4 mb-10 text-xs rounded-lg bg-slate-200 dark:bg-slate-800">
          {JSON.stringify(error.message ?? "")}
        </pre>
      ) : null}
      <Link className="text-sm font-medium text-brand" to="/">
        <span aria-hidden="true">←</span> Voltar para a Home
      </Link>
    </div>
  );
}
