import { Outlet, useOutletContext } from "react-router";
import type { User } from "~/lib/models/user.server";
import AppLayoutComponent from "~/components/_layouts/root-layout";

export const meta = () => {
  return [];
};

export default function AppLayout() {
  const { user } = useOutletContext<{ user: User | null }>();
  return (
    <AppLayoutComponent user={user}>
      <Outlet context={{ user }} />
    </AppLayoutComponent>
  );
}
