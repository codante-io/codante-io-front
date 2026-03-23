import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import LinkToLoginWithRedirect from "./index";

describe("LinkToLoginWithRedirect", () => {
  it("renders children", () => {
    renderWithRouter(
      () => <LinkToLoginWithRedirect>Login</LinkToLoginWithRedirect>,
      { path: "/workshops/react" },
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("links to /login with current path as redirectTo", () => {
    renderWithRouter(
      () => <LinkToLoginWithRedirect>Login</LinkToLoginWithRedirect>,
      { path: "/workshops/react" },
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/login?redirectTo=/workshops/react",
    );
  });

  it("redirects to /dashboard when on root path", () => {
    renderWithRouter(
      () => <LinkToLoginWithRedirect>Login</LinkToLoginWithRedirect>,
      { path: "/" },
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/login?redirectTo=/dashboard",
    );
  });

  it("uses custom redirectPath when provided", () => {
    renderWithRouter(
      () => (
        <LinkToLoginWithRedirect redirectPath="/custom">
          Login
        </LinkToLoginWithRedirect>
      ),
      { path: "/somewhere" },
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/login?redirectTo=/custom",
    );
  });

  it("redirects to / then /dashboard when on password-reset page", () => {
    renderWithRouter(
      () => <LinkToLoginWithRedirect>Login</LinkToLoginWithRedirect>,
      { path: "/password-reset/abc123" },
    );
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/login?redirectTo=/dashboard",
    );
  });
});
