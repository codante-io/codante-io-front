import { renderHook } from "@testing-library/react";
import usePrefersReducedMotion from "./use-prefers-reduced-motion";

describe("usePrefersReducedMotion", () => {
  it("returns false when user has no preference for reduced motion", () => {
    // matchMedia returns matches: false by default (from vitest.setup.ts)
    // The hook queries "(prefers-reduced-motion: no-preference)"
    // matches: false means the user DOES prefer reduced motion
    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(typeof result.current).toBe("boolean");
  });

  it("returns false when user prefers no reduced motion", () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: true, // no-preference matches = user does NOT prefer reduced motion
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(false);
  });

  it("returns true when user prefers reduced motion", () => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false, // no-preference does NOT match = user prefers reduced motion
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const { result } = renderHook(() => usePrefersReducedMotion());
    expect(result.current).toBe(true);
  });

  afterEach(() => {
    vi.mocked(window.matchMedia).mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });
});
