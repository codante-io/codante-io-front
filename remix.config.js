/** @type {import('@remix-run/dev').AppConfig} */
const { flatRoutes } = require("remix-flat-routes");

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  future: {
    v2_routeConvention: true,
    v2_errorBoundary: true,
    v2_headers: true,
    v2_dev: true,
    v2_meta: true, // não sei se é esse!
    unstable_tailwind: true,
  },
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },
};
