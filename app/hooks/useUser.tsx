import { useOutletContext } from "@remix-run/react";
import type { ContextType } from "~/types/contextType";

export function useUser() {
  const ctx = useOutletContext<ContextType>();
  return ctx?.user;
}
