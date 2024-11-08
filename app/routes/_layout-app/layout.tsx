import { Link, Outlet, useOutletContext } from "@remix-run/react";
import type { User } from "~/lib/models/user.server";
import AppLayoutComponent from "~/components/_layouts/root-layout";
import AlertBannerPortal from "~/components/ui/alert-banner-portal";

export const meta = () => {
  return [];
};

export default function AppLayout() {
  const { user } = useOutletContext<{ user: User | null }>();
  return (
    <AppLayoutComponent user={user}>
      <AlertBannerPortal
        excludedRoutes={["/black-friday"]}
        position="bottom"
        type="black-friday"
        title={
          <img
            src="/img/black-friday/logo.png"
            alt="Black Friday do Codante"
            className="w-full md:w-[500px] mt-10 mb-4"
          />
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
