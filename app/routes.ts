import { remixConfigRoutes } from "@react-router/remix-config-routes-adapter";
import { layout, route, RouteConfig } from "@remix-run/route-config";
import flatRoutes from "remix-flat-routes";

// export default remixConfigRoutes((defineRoutes) => {
//   return flatRoutes("routes", defineRoutes, {
//     /* options */
//   });
// });

export default [
  // layout("new-routes/layouts/layout-raw.tsx", [
  //   route(
  //     "mini-projetos/:challengeSlug/resolucao/:lessonSlug",
  //     // "new-routes/hello.tsx",
  //     "routes/_layout-raw/_player/_mini-projeto-resolucao/mini-projeto-resolucao.tsx",
  //   ),
  // ]),

  ...(await remixConfigRoutes(
    (defineRoutes) => flatRoutes("routes", defineRoutes, {}),

    // http://localhost:3000/mini-projetos/drag-and-drop-com-react-e-framer-motion/resolucao/apresentacao-do-projeto
  )),
] satisfies RouteConfig;
