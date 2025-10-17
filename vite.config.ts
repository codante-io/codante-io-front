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
  plugins: [reactRouter(), tsconfigPaths()],
});
