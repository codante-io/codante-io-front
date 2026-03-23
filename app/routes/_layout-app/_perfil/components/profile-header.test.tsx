import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import ProfileHeader from "./profile-header";

// Mock Tooltip for UserAvatar
vi.mock("~/components/ui/tooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockUser = {
  name: "joão silva",
  github_user: "joaosilva",
  linkedin_user: "joao-silva",
  avatar: {
    avatar_url: "https://example.com/avatar.jpg",
    name: "João Silva",
    badge: "pro" as const,
    github_user: "joaosilva",
  },
  created_at: "2024-01-15T12:00:00Z",
};

describe("ProfileHeader", () => {
  const renderHeader = (user = mockUser) =>
    render(
      <MemoryRouter>
        <ProfileHeader user={user} />
      </MemoryRouter>,
    );

  it("renders the user name formatted", () => {
    renderHeader();
    expect(screen.getByText("João Silva")).toBeInTheDocument();
  });

  it("renders PRO badge for pro users", () => {
    renderHeader();
    expect(screen.getByText("PRO")).toBeInTheDocument();
  });

  it("does not render PRO badge when badge is null", () => {
    renderHeader({
      ...mockUser,
      avatar: { ...mockUser.avatar, badge: null },
    });
    expect(screen.queryByText("PRO")).not.toBeInTheDocument();
  });

  it("renders GitHub link", () => {
    renderHeader();
    const link = screen.getByText("@joaosilva").closest("a");
    expect(link).toHaveAttribute("href", "https://github.com/joaosilva");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders LinkedIn link when present", () => {
    renderHeader();
    const link = screen.getByText("LinkedIn").closest("a");
    expect(link).toHaveAttribute("href", "https://linkedin.com/in/joao-silva");
  });

  it("hides LinkedIn link when null", () => {
    renderHeader({ ...mockUser, linkedin_user: null });
    expect(screen.queryByText("LinkedIn")).not.toBeInTheDocument();
  });

  it("renders member since date", () => {
    renderHeader();
    expect(screen.getByText(/Membro desde/)).toBeInTheDocument();
    expect(screen.getByText(/janeiro/)).toBeInTheDocument();
  });
});
