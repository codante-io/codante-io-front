import type { WorkshopCard } from "~/lib/models/workshop.server";

export function hasHappened(workshop: WorkshopCard) {
  if (
    workshop.published_at &&
    new Date().getTime() > new Date(workshop.published_at).getTime()
  ) {
    return true;
  }
  return false;
}

export function isNew(workshop: WorkshopCard) {
  const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
  return (
    workshop.published_at &&
    new Date().getTime() - new Date(workshop.published_at).getTime() < ONE_MONTH
  );
}
