/** @type {import('@remix-run/dev').AppConfig} */
const { flatRoutes } = require("remix-flat-routes");

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  serverModuleFormat: "cjs",
  tailwind: true,
  serverDependenciesToBundle: ["axios"],
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
};
