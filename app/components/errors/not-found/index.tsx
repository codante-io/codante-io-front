import { Link } from "@remix-run/react";

export default function NotFound() {
  return (
    <div className="container py-20 mx-auto">
      <p className="mb-6 text-lg font-light text-brand">404</p>
      <h1 className="mb-6 text-3xl font-bold sm:text-5xl font-lexend dark:text-gray-300">
        Página não encontrada
      </h1>
      <p className="mb-10 dark:text-gray-400">
        Desculpe, não encontramos nada por aqui...
      </p>
      <Link className="text-sm font-medium text-brand" to="/">
        <span aria-hidden="true">←</span> Voltar para a Home
      </Link>
    </div>
  );
}
