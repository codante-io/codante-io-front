import { Link } from "@remix-run/react";

export default function NotFound({ error }: { error?: any }) {
  return (
    <div className="container h-screen py-20 mx-auto">
      <p className="mb-6 text-lg font-light text-brand">404</p>
      <h1 className="mb-6 text-3xl font-bold sm:text-5xl font-lexend dark:text-gray-300">
        Página não encontrada
      </h1>
      <p className="mb-10 dark:text-gray-400">
        Desculpe, não encontramos nada por aqui...
      </p>
      {process.env.NODE_ENV !== "production" ? (
        <pre className="p-4 mb-10 text-xs rounded-lg bg-background-200 dark:bg-background-800">
          {JSON.stringify(error ?? "")}
        </pre>
      ) : null}
      <Link className="text-sm font-medium text-brand" to="/">
        <span aria-hidden="true">←</span> Voltar para a Home
      </Link>
    </div>
  );
}
