import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import ChallengeCard from "./challenge-card";

// Mock tooltip for UserAvatar
vi.mock("~/components/ui/tooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("~/components/ui/user-avatar-hover-card", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="avatar-hover-card">{children}</div>
  ),
}));

const mockChallenge = {
  id: 1,
  name: "Landing Page com Tailwind",
  slug: "landing-page-tailwind",
  status: "published",
  image_url: "https://example.com/challenge.png",
  is_premium: true,
  difficulty: 2,
  enrolled_users_count: 3,
  main_technology: {
    name: "TailwindCSS",
    image_url: "https://example.com/tw.png",
  },
  avatars: [
    { name: "User1", avatar_url: "https://example.com/u1.jpg", badge: null },
    { name: "User2", avatar_url: "https://example.com/u2.jpg", badge: null },
  ],
};

describe("ChallengeCard", () => {
  it("renders challenge name", () => {
    renderWithRouter(() => <ChallengeCard challenge={mockChallenge as any} />);
    expect(screen.getByText("Landing Page com Tailwind")).toBeInTheDocument();
  });

  it("links to challenge page", () => {
    renderWithRouter(() => <ChallengeCard challenge={mockChallenge as any} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "href",
      "/mini-projetos/landing-page-tailwind",
    );
  });

  it("renders Ver projeto button", () => {
    renderWithRouter(() => <ChallengeCard challenge={mockChallenge as any} />);
    expect(screen.getByText("Ver projeto")).toBeInTheDocument();
  });

  it("renders challenge image", () => {
    const { container } = renderWithRouter(() => (
      <ChallengeCard challenge={mockChallenge as any} />
    ));
    const challengeImg = container.querySelector(
      'img[src="https://example.com/challenge.png"]',
    );
    expect(challengeImg).toBeInTheDocument();
  });

  it('shows "Em breve" chip for soon status', () => {
    const soonChallenge = { ...mockChallenge, status: "soon" };
    renderWithRouter(() => <ChallengeCard challenge={soonChallenge as any} />);
    expect(screen.getByText("Em breve")).toBeInTheDocument();
  });

  it('shows "Gratuito" chip when not premium', () => {
    const freeChallenge = { ...mockChallenge, is_premium: false };
    renderWithRouter(() => <ChallengeCard challenge={freeChallenge as any} />);
    expect(screen.getByText("Gratuito")).toBeInTheDocument();
  });

  it("shows +N count when more than 5 enrolled users", () => {
    const popularChallenge = {
      ...mockChallenge,
      enrolled_users_count: 15,
      avatars: Array.from({ length: 5 }, (_, i) => ({
        name: `User${i}`,
        avatar_url: "",
        badge: null,
      })),
    };
    renderWithRouter(() => (
      <ChallengeCard challenge={popularChallenge as any} />
    ));
    expect(screen.getByText("+10")).toBeInTheDocument();
  });

  it("has cursor-not-allowed for soon challenges", () => {
    renderWithRouter(() => (
      <ChallengeCard challenge={{ ...mockChallenge, status: "soon" } as any} />
    ));
    const link = screen.getByRole("link");
    expect(link.className).toContain("cursor-not-allowed");
  });

  it("does not render avatar hover cards by default", () => {
    renderWithRouter(() => <ChallengeCard challenge={mockChallenge as any} />);
    expect(screen.queryByTestId("avatar-hover-card")).not.toBeInTheDocument();
  });

  it("renders avatar hover cards when enabled", () => {
    renderWithRouter(() => (
      <ChallengeCard challenge={mockChallenge as any} showAvatarHoverCard />
    ));

    expect(screen.getAllByTestId("avatar-hover-card")).toHaveLength(2);
  });
});
