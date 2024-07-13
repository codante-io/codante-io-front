import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  // get current full path and replace /resolucao with /tutorial

  const newPath = request.url.replace("/resolucao", "/tutorial");
  return redirect(newPath, 301);
};

export default function Resolucao() {
  // This component will not be rendered because of the redirect
  return null;
}
