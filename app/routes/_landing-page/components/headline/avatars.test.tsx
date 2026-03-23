import { render, screen } from "@testing-library/react";
import type { User } from "~/lib/models/user.server";
import AvatarsSection from "./avatars";

vi.mock("~/components/ui/user-avatar-hover-card", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="avatar-hover-card">{children}</div>
  ),
}));

vi.mock("~/components/ui/tooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("AvatarsSection", () => {
  const user: User = {
    id: 1,
    name: "Maria",
    email: "maria@example.com",
    github_id: "123",
    is_pro: false,
    avatar: {
      name: "Maria",
      avatar_url: "https://example.com/maria.jpg",
      badge: null,
      github_user: "maria",
    },
    settings: null,
    github_user: "maria",
  };

  const avatars = [
    user.avatar,
    {
      name: "Bruno",
      avatar_url: "https://example.com/bruno.jpg",
      badge: "pro" as const,
      github_user: "bruno",
    },
  ];

  it("renders avatar hover cards for the hero avatars", () => {
    render(<AvatarsSection user={user} avatars={avatars} userCount={6513} />);

    expect(screen.getAllByTestId("avatar-hover-card")).toHaveLength(2);
    expect(screen.getByText("6513 devs")).toBeInTheDocument();
  });
});
