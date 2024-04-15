import { Link, useLocation } from "@remix-run/react";

export default function LinkToLoginWithRedirect({
  children,
  redirectPath = undefined,
  ...rest
}: {
  children: React.ReactNode;
  redirectPath?: string;
  [key: string]: any;
}) {
  const location = useLocation();
  let redirectTo = redirectPath ?? location.pathname;

  // if redirect path contains password-reset, we will redirect to home page after login
  // this is to prevent user from being stuck on password reset page after login
  if (redirectTo.includes("password-reset")) {
    redirectTo = "/";
  }

  if (redirectTo === "/") {
    redirectTo = "/dashboard";
  }

  return (
    <Link to={`/login?redirectTo=${redirectTo}`} {...rest}>
      {children}
    </Link>
  );
}
