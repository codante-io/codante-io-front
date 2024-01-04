import { Outlet, useOutletContext } from "@remix-run/react";
import type { User } from "~/lib/models/user.server";
import AppLayoutComponent from "~/components/_layouts/root-layout";

type AppLayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { user } = useOutletContext<{ user: User | null }>();
  return (
    <AppLayoutComponent user={user}>
      <Outlet context={{ user }} />
    </AppLayoutComponent>
  );
}
