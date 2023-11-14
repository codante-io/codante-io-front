import type { Workshop } from "~/models/workshop.server";

export function hasHappened(workshop: Workshop) {
  if (
    workshop.published_at &&
    new Date().getTime() > new Date(workshop.published_at).getTime()
  ) {
    return true;
  }
  return false;
}
