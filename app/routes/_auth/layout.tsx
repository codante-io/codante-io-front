import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="dark:bg-[#0e141a] min-h-screen text-white pt-32">
      <div className="mx-auto max-w-md md:w-[450px]">
        <Outlet />
      </div>
    </div>
  );
}
