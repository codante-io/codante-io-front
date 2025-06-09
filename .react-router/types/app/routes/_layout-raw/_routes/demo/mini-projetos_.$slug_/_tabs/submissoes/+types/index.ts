// React Router generated types for route:
// routes/_layout-raw/_routes/demo/mini-projetos_.$slug_/_tabs/submissoes/index.tsx

import type * as T from "react-router/route-module";

import type { Info as Parent0 } from "../../../../../../../../+types/root.js";
import type { Info as Parent1 } from "../../../../../../+types/layout.js";
import type { Info as Parent2 } from "../../../+types/_layout.js";

type Module = typeof import("../index.js");

export type Info = {
  parents: [Parent0, Parent1, Parent2];
  id: "routes/_layout-raw/_routes/demo/mini-projetos_.$slug_/_tabs/submissoes/index";
  file: "routes/_layout-raw/_routes/demo/mini-projetos_.$slug_/_tabs/submissoes/index.tsx";
  path: "submissoes";
  params: { slug: string } & { [key: string]: string | undefined };
  module: Module;
  loaderData: T.CreateLoaderData<Module>;
  actionData: T.CreateActionData<Module>;
};

export namespace Route {
  export type LinkDescriptors = T.LinkDescriptors;
  export type LinksFunction = () => LinkDescriptors;

  export type MetaArgs = T.CreateMetaArgs<Info>;
  export type MetaDescriptors = T.MetaDescriptors;
  export type MetaFunction = (args: MetaArgs) => MetaDescriptors;

  export type HeadersArgs = T.HeadersArgs;
  export type HeadersFunction = (args: HeadersArgs) => Headers | HeadersInit;

  export type unstable_MiddlewareFunction =
    T.CreateServerMiddlewareFunction<Info>;
  export type unstable_ClientMiddlewareFunction =
    T.CreateClientMiddlewareFunction<Info>;
  export type LoaderArgs = T.CreateServerLoaderArgs<Info>;
  export type ClientLoaderArgs = T.CreateClientLoaderArgs<Info>;
  export type ActionArgs = T.CreateServerActionArgs<Info>;
  export type ClientActionArgs = T.CreateClientActionArgs<Info>;

  export type HydrateFallbackProps = T.CreateHydrateFallbackProps<Info>;
  export type ComponentProps = T.CreateComponentProps<Info>;
  export type ErrorBoundaryProps = T.CreateErrorBoundaryProps<Info>;
}
