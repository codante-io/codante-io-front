import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockLogin, mockUser } = vi.hoisted(() => ({
  mockLogin: vi.fn(),
  mockUser: vi.fn(),
}));

vi.mock("~/lib/services/auth.server", () => ({
  login: mockLogin,
  user: mockUser,
}));

import { loader } from "./index";

describe("login loader", () => {
  beforeEach(() => {
    mockLogin.mockReset();
    mockUser.mockReset();
  });

  it("redirects authenticated users to home", async () => {
    mockUser.mockResolvedValue({
      id: 1,
      name: "Maria",
    });

    const response = await loader({
      request: new Request("http://localhost/login?redirectTo=/dashboard"),
    } as any);

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/");
  });

  it("allows guests to open the login page even when redirectTo is present", async () => {
    mockUser.mockResolvedValue(null);

    const response = await loader({
      request: new Request("http://localhost/login?redirectTo=/dashboard"),
    } as any);

    expect(response).toEqual({ redirectTo: "/dashboard" });
  });
});
