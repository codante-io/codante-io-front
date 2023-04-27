import { Link } from "react-router-dom";

export function Error500() {
  return (
    <div className="container py-20 mx-auto">
      <p className="mb-6 text-lg font-light text-brand">500</p>
      <h1 className="mb-6 text-5xl font-bold font-lexend dark:text-slate-300">
        Ops...
      </h1>
      <p className="dark:text-slate-500">Alguma coisa deu errada...</p>
      <p className="mb-10 dark:text-slate-500">
        Se o erro persistir, entra em contato com a gente!
      </p>
      <Link className="text-sm font-medium text-brand" to="/">
        <span aria-hidden="true">←</span> Voltar para a Home
      </Link>
    </div>
  );
}
