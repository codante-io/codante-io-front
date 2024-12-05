/** @type {import('@remix-run/dev').AppConfig} */
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { flatRoutes } from "remix-flat-routes";
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["react-easy-crop", "tslib"],
  },
  plugins: [
    remix({
      // routes: async (defineRoutes) => {
      //   return flatRoutes("routes", defineRoutes);
      // },
      future: {
        v3_lazyRouteDiscovery: true,
        v3_fetcherPersist: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true,
        v3_relativeSplatPath: true,
        v3_routeConfig: true,
      },
    }),
    tsconfigPaths(),
  ],
});
