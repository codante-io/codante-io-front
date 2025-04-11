import { createPortal } from "react-dom";
import type { AlertBannerProps } from "../alert-banner";
import AlertBanner from "../alert-banner";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

type AlertBannerPortalProps = AlertBannerProps & {
  position?: "top" | "bottom";
  excludedRoutes?: string[];
};

export default function AlertBannerPortal({
  position = "bottom",
  excludedRoutes = [],
  ...props
}: AlertBannerPortalProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Define isClient como true uma vez que o componente é montado, indicando que está no lado do cliente
    setIsClient(true);
  }, []);

  const location = useLocation();

  const isExcludedRoute = excludedRoutes.includes(location.pathname);

  if (isExcludedRoute) {
    return null;
  }

  const elementId =
    position === "top" ? "alert-banner-upper" : "alert-banner-lower";

  return (
    <>
      {isClient &&
        createPortal(
          <AlertBanner
            className="w-full min-w-full rounded-none border-r-0 border-l-0"
            container={true}
            {...props}
          />,
          document.getElementById(elementId)!,
        )}
    </>
  );
}
