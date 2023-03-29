/** @type {import('@remix-run/dev').AppConfig} */
const { flatRoutes } = require("remix-flat-routes");

module.exports = {
  ignoredRouteFiles: ["**/.*"],
  future: {
    v2_routeConvention: true,
    unstable_tailwind: true,
  },
  routes: async (defineRoutes) => {
    return flatRoutes("routes", defineRoutes);
  },

  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
};
