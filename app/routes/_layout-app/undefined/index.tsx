import { redirect } from "react-router";

// Essa rota está aqui por essa razão: https://github.com/codante-io/codante-io-front/issues/34
export function loader() {
  return redirect("/");
}
