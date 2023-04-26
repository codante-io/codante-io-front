import { json } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const loader = () => {
  return json(null, { status: 404 });
};

export default function NotFound() {
  return (
    <div className="container py-20 mx-auto">
      <p className="mb-6 text-lg font-light text-brand">404</p>
      <h1 className="mb-6 text-5xl font-bold font-lexend dark:text-slate-300">
        Página não encontrada
      </h1>
      <p className="mb-10 dark:text-slate-500">
        Desculpe, não encontramos nada por aqui...
      </p>
      <Link className="text-sm font-medium text-brand" to="/">
        <span aria-hidden="true">←</span> Voltar para a Home
      </Link>
    </div>
  );
}
