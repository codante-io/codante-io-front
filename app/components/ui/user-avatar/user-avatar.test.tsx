import { render, screen } from "@testing-library/react";
import UserAvatar from "./index";

// TooltipWrapper requires Radix Tooltip provider — mock it to just render children
vi.mock("../tooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("UserAvatar", () => {
  it("renders avatar image with URL", () => {
    render(
      <UserAvatar
        avatar={{
          name: "João",
          avatar_url: "https://example.com/avatar.jpg",
          badge: null,
        }}
      />,
    );
    const img = screen.getByAltText("Avatar do usuário");
    expect(img).toHaveAttribute("src", "https://example.com/avatar.jpg");
  });

  it("renders fallback avatar when avatar_url is empty", () => {
    render(
      <UserAvatar avatar={{ name: "Maria", avatar_url: "", badge: null }} />,
    );
    const img = screen.getByAltText("Avatar do usuário");
    expect(img.getAttribute("src")).toContain("codante.io");
  });

  it("renders pro badge ring", () => {
    render(
      <UserAvatar
        avatar={{
          name: "Pro User",
          avatar_url: "https://example.com/avatar.jpg",
          badge: "pro",
        }}
      />,
    );
    const img = screen.getByAltText("Avatar do usuário");
    expect(img).toHaveClass("ring-amber-400");
  });

  it("renders team badge ring", () => {
    render(
      <UserAvatar
        avatar={{
          name: "Team User",
          avatar_url: "https://example.com/avatar.jpg",
          badge: "team",
        }}
      />,
    );
    const img = screen.getByAltText("Avatar do usuário");
    expect(img).toHaveClass("ring-brand-500");
  });

  it("applies custom className", () => {
    render(
      <UserAvatar
        avatar={{ name: "Test", avatar_url: "", badge: null }}
        className="w-20 h-20"
      />,
    );
    const img = screen.getByAltText("Avatar do usuário");
    expect(img).toHaveClass("w-20");
  });
});
