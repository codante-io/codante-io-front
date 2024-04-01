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
  plugins: [
    remix({
      routes: async (defineRoutes) => {
        return flatRoutes("routes", defineRoutes);
      },
    }),
    tsconfigPaths(),
  ],
});
