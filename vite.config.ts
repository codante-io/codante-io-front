/** @type {import('@remix-run/dev').AppConfig} */
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  ssr: {
    noExternal: ["react-easy-crop", "tslib"],
  },
  plugins: [
    reactRouter({
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
