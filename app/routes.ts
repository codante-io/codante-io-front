import { remixConfigRoutes } from "@react-router/remix-config-routes-adapter";
import { RouteConfig } from "@remix-run/route-config";
import flatRoutes from "remix-flat-routes";

export default [
  ...(await remixConfigRoutes((defineRoutes) =>
    flatRoutes("routes", defineRoutes, {}),
  )),
] satisfies RouteConfig;
