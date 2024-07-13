import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

// Esta rota foi movida para /tutorial. Para preservar o SEO, vamos redirecionar para a nova rota.
export const loader: LoaderFunction = async ({ request }) => {
  const newPath = request.url.replace("/resolucao", "/tutorial");
  return redirect(newPath, 301);
};

export default function Resolucao() {
  // This component will not be rendered because of the redirect
  return null;
}
