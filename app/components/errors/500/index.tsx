import { Link } from "react-router-dom";

export function Error500({ error = null }: { error?: any }) {
  return (
    <div className="container py-20 mx-auto">
      <p className="mb-6 text-lg font-light text-brand">500</p>
      <h1 className="mb-6 text-5xl font-bold font-lexend dark:text-gray-300">
        Ops...
      </h1>
      <p className="dark:text-gray-400">Alguma coisa deu errada...</p>
      <p className="mb-10 dark:text-gray-400">
        Se o erro persistir, entra em contato com a gente!
      </p>
      {process.env.NODE_ENV !== "production" ? (
        <pre className="p-4 mb-10 text-xs rounded-lg bg-background-200 dark:bg-background-800 whitespace-normal">
          {JSON.stringify(error.message ?? "")}
          <br />
          {JSON.stringify(error.stack ?? "")}
        </pre>
      ) : null}
      <Link className="text-sm font-medium text-brand" to="/">
        <span aria-hidden="true">←</span> Voltar para a Home
      </Link>
    </div>
  );
}
