import type { Workshop, WorkshopCard } from "~/lib/models/workshop.server";

export function hasHappened(workshop: WorkshopCard | Workshop) {
  if (
    workshop.published_at &&
    new Date().getTime() > new Date(workshop.published_at).getTime()
  ) {
    return true;
  }
  return false;
}

export function isUpcoming(workshop: WorkshopCard | Workshop) {
  return (
    workshop.published_at &&
    new Date().getTime() < new Date(workshop.published_at).getTime() &&
    workshop.status === "soon"
  );
}

export function isNew(workshop: WorkshopCard) {
  const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
  return (
    workshop.published_at &&
    new Date().getTime() - new Date(workshop.published_at).getTime() < ONE_MONTH
  );
}
