import { Link, Outlet, useOutletContext } from "@remix-run/react";
import type { User } from "~/lib/models/user.server";
import AppLayoutComponent from "~/components/_layouts/root-layout";
import AlertBannerPortal from "~/components/ui/alert-banner-portal";

type AppLayoutProps = {
  children: React.ReactNode;
};

export const meta = () => {
  return [];
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { user } = useOutletContext<{ user: User | null }>();
  return (
    <AppLayoutComponent user={user}>
      <AlertBannerPortal
        excludedRoutes={["/black-friday"]}
        position="bottom"
        type="black-friday"
        title={
          <h1 className="text-3xl mt-10 font-nabla">Black Friday do Codante</h1>
        }
        subtitle={
          <p className="mb-10">
            A última chance.{" "}
            <Link
              to="/black-friday"
              className="font-bold decoration-amber-400 underline"
            >
              Cadastre-se para ficar por dentro!
            </Link>{" "}
          </p>
        }
      />
      <Outlet context={{ user }} />
    </AppLayoutComponent>
  );
}
