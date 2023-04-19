import { logout } from "~/services/auth.server";

export async function action({ request }: { request: Request }) {
  return logout({ request });
}
