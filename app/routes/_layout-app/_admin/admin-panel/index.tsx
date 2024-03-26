import type { LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet } from "@remix-run/react";
import { requireAdmin, requireAuth } from "~/lib/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // only allow authenticated users
  await requireAuth({ request });
  await requireAdmin({ request });
  return null;
}

export default function Admin() {
  return (
    <div className="container mx-auto">
      <h1 className="text-3xl mb-8">Painel Administrativo</h1>
      <Link to="emails" className="underline mt-3 mb-6">
        Envio de Emails
      </Link>
      <hr className="mt-3 mb-12" />
      <Outlet />
    </div>
  );
}
