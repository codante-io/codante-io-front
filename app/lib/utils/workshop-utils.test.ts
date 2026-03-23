import { hasHappened, isUpcoming, isNew } from "./workshop-utils";

const makeWorkshop = (overrides: Record<string, unknown> = {}) => ({
  id: 1,
  name: "Test Workshop",
  slug: "test-workshop",
  status: "published" as const,
  published_at: null as string | null,
  ...overrides,
});

describe("hasHappened", () => {
  it("returns true when published_at is in the past", () => {
    const workshop = makeWorkshop({
      published_at: "2020-01-01T00:00:00Z",
    });
    expect(hasHappened(workshop as any)).toBe(true);
  });

  it("returns false when published_at is in the future", () => {
    const workshop = makeWorkshop({
      published_at: "2099-01-01T00:00:00Z",
    });
    expect(hasHappened(workshop as any)).toBe(false);
  });

  it("returns false when published_at is null", () => {
    const workshop = makeWorkshop({ published_at: null });
    expect(hasHappened(workshop as any)).toBe(false);
  });
});

describe("isUpcoming", () => {
  it('returns true when published_at is future and status is "soon"', () => {
    const workshop = makeWorkshop({
      published_at: "2099-01-01T00:00:00Z",
      status: "soon",
    });
    expect(isUpcoming(workshop as any)).toBeTruthy();
  });

  it("returns falsy when published_at is in the past", () => {
    const workshop = makeWorkshop({
      published_at: "2020-01-01T00:00:00Z",
      status: "soon",
    });
    expect(isUpcoming(workshop as any)).toBeFalsy();
  });

  it('returns falsy when status is not "soon"', () => {
    const workshop = makeWorkshop({
      published_at: "2099-01-01T00:00:00Z",
      status: "published",
    });
    expect(isUpcoming(workshop as any)).toBeFalsy();
  });
});

describe("isNew", () => {
  it("returns true when published within last 30 days", () => {
    const recentDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 5); // 5 days ago
    const workshop = makeWorkshop({
      published_at: recentDate.toISOString(),
    });
    expect(isNew(workshop as any)).toBeTruthy();
  });

  it("returns falsy when published more than 30 days ago", () => {
    const oldDate = new Date(Date.now() - 1000 * 60 * 60 * 24 * 60); // 60 days ago
    const workshop = makeWorkshop({
      published_at: oldDate.toISOString(),
    });
    expect(isNew(workshop as any)).toBeFalsy();
  });

  it("returns falsy when published_at is null", () => {
    const workshop = makeWorkshop({ published_at: null });
    expect(isNew(workshop as any)).toBeFalsy();
  });
});
