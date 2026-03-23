import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import UserProfilePage from "./index";

vi.mock("~/lib/models/user.server", () => ({
  getUserProfile: vi.fn(),
}));

vi.mock("~/components/ui/tooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockProfile = {
  user: {
    name: "maria oliveira",
    github_user: "mariaoliveira",
    linkedin_user: "maria-oliveira",
    avatar: {
      avatar_url: "https://example.com/avatar.jpg",
      name: "Maria Oliveira",
      badge: "pro" as const,
      github_user: "mariaoliveira",
    },
    created_at: "2024-03-10T12:00:00Z",
  },
  stats: {
    points: 350,
    completed_challenge_count: 15,
    received_reaction_count: 60,
  },
  completed_challenges: [
    {
      id: 1,
      submission_image_url: "https://example.com/sub1.jpg",
      submission_url: "https://github.com/maria/project1",
      submitted_at: "2024-06-01T12:00:00Z",
      challenge: {
        name: "Landing Page com Tailwind",
        slug: "landing-page-tailwind",
        image_url: "https://example.com/challenge1.png",
      },
    },
    {
      id: 2,
      submission_image_url: "https://example.com/sub2.jpg",
      submission_url: "https://github.com/maria/project2",
      submitted_at: "2024-07-15T12:00:00Z",
      challenge: {
        name: "Dashboard com React",
        slug: "dashboard-react",
        image_url: "https://example.com/challenge2.png",
      },
    },
  ],
  certificates: [
    {
      id: "cert1",
      metadata: {
        certifiable_source_name: "Workshop React Avançado",
        certifiable_slug: "react-avancado",
      },
      status: "published",
      created_at: "2024-08-01T12:00:00Z",
    },
  ],
};

describe("UserProfilePage route", () => {
  it("renders user name", async () => {
    renderWithRouter(UserProfilePage, {
      path: "/perfil/:github_user",
      initialEntries: ["/perfil/mariaoliveira"],
      loader: () => ({ profile: mockProfile }),
    });

    expect(await screen.findByText("Maria Oliveira")).toBeInTheDocument();
  });

  it("renders stats", async () => {
    renderWithRouter(UserProfilePage, {
      path: "/perfil/:github_user",
      initialEntries: ["/perfil/mariaoliveira"],
      loader: () => ({ profile: mockProfile }),
    });

    expect(await screen.findByText("350")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("60")).toBeInTheDocument();
  });

  it("renders completed challenges", async () => {
    renderWithRouter(UserProfilePage, {
      path: "/perfil/:github_user",
      initialEntries: ["/perfil/mariaoliveira"],
      loader: () => ({ profile: mockProfile }),
    });

    expect(
      await screen.findByText("Landing Page com Tailwind"),
    ).toBeInTheDocument();
    expect(screen.getByText("Dashboard com React")).toBeInTheDocument();
  });

  it("renders certificates", async () => {
    renderWithRouter(UserProfilePage, {
      path: "/perfil/:github_user",
      initialEntries: ["/perfil/mariaoliveira"],
      loader: () => ({ profile: mockProfile }),
    });

    expect(
      await screen.findByText("Workshop React Avançado"),
    ).toBeInTheDocument();
  });

  it("renders GitHub link", async () => {
    renderWithRouter(UserProfilePage, {
      path: "/perfil/:github_user",
      initialEntries: ["/perfil/mariaoliveira"],
      loader: () => ({ profile: mockProfile }),
    });

    expect(await screen.findByText("@mariaoliveira")).toBeInTheDocument();
  });

  it("shows empty states when no challenges or certificates", async () => {
    const emptyProfile = {
      ...mockProfile,
      completed_challenges: [],
      certificates: [],
    };

    renderWithRouter(UserProfilePage, {
      path: "/perfil/:github_user",
      initialEntries: ["/perfil/mariaoliveira"],
      loader: () => ({ profile: emptyProfile }),
    });

    expect(
      await screen.findByText("Nenhum mini-projeto concluído ainda."),
    ).toBeInTheDocument();
    expect(screen.getByText("Nenhum certificado ainda.")).toBeInTheDocument();
  });
});
