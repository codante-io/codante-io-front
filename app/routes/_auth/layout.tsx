import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="bg-transparent text-white sm:pt-12 ">
      <div className="mx-auto max-w-md md:w-[450px] px-2 py-12 ">
        <Outlet />
      </div>
    </div>
  );
}
