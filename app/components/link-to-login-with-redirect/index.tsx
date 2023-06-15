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
  const redirectTo = redirectPath ?? location.pathname;

  return (
    <Link to={`/login?redirectTo=${redirectTo}`} {...rest}>
      {children}
    </Link>
  );
}
