/* eslint-disable jsx-a11y/iframe-has-title */
import { useLocation } from "@remix-run/react";
import { useEffect } from "react";
import type { User } from "~/models/user.server";

export function GoogleTagManager(props: {
  environment: string;
  gtmTrackingId: string | undefined;
  user: User | null;
}) {
  const location = useLocation();
  const { environment, gtmTrackingId } = props;

  useEffect(() => {
    if (environment !== "development" && gtmTrackingId?.length) {
      const gtmScript = document.createElement("script");
      const dataLayer = document.createElement("script");

      dataLayer.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'userId' : ${props.user?.id},
      });
      `;

      gtmScript.innerHTML = `
        (function(w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
          });
          var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
          j.async = true;
          j.src =
              'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', '${gtmTrackingId}');`;

      document.head.appendChild(dataLayer);
      document.head.appendChild(gtmScript);

      return () => {
        document.head.appendChild(dataLayer);
        document.head.removeChild(gtmScript);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, gtmTrackingId]);

  return environment === "development" || !gtmTrackingId ? null : (
    <>
      {/* GOOGLE TAG MANAGER NOSCRIPT */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmTrackingId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  );
}
