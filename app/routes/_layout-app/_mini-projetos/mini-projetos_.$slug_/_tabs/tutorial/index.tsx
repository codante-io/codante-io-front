import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";

// Esta rota foi movida para /resolucao. Para preservar o SEO, vamos redirecionar para a nova rota.
export const loader: LoaderFunction = async ({ request }) => {
  const newPath = request.url.replace("/resolucao", "/resolucao");
  return redirect(newPath, 301);
};

export default function Resolucao() {
  // This component will not be rendered because of the redirect
  return null;
}
