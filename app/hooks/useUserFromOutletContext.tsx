import { useOutletContext } from "@remix-run/react";
import type { ContextType } from "~/types/contextType";

export function useUserFromOutletContext() {
  const ctx = useOutletContext<ContextType>();
  if (!ctx) {
    throw new Error("useUserFromOutletContext must be used inside a route");
  }
  if (ctx.user === undefined) {
    throw new Error(
      "useUserFromOutletContext must be used inside a route that has a user context"
    );
  }
  return ctx.user;
}
