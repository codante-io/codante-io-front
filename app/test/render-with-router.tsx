import { createRoutesStub } from "react-router";
import { render } from "@testing-library/react";

type RouteStubOptions = {
  path?: string;
  initialEntries?: string[];
  loader?: () => unknown;
  action?: () => unknown;
  children?: Parameters<typeof createRoutesStub>[0];
};

export function renderWithRouter(
  Component: React.ComponentType,
  {
    path = "/",
    initialEntries,
    loader,
    action,
    children,
  }: RouteStubOptions = {},
) {
  const Stub = createRoutesStub([
    {
      path,
      Component,
      loader,
      action,
      children,
    },
  ]);

  return render(<Stub initialEntries={initialEntries ?? [path]} />);
}
