import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import RankingList from "./index";

vi.mock("~/lib/models/ranking.server", () => ({
  getRanking: vi.fn(),
}));

const mockRankingUsers = [
  {
    avatar: {
      name: "Alice",
      avatar_url: "https://example.com/a.jpg",
      badge: null,
    },
    points: 500,
    completed_challenge_count: 10,
    received_reaction_count: 25,
  },
  {
    avatar: {
      name: "Bob",
      avatar_url: "https://example.com/b.jpg",
      badge: "pro",
    },
    points: 400,
    completed_challenge_count: 8,
    received_reaction_count: 15,
  },
  {
    avatar: { name: "Charlie", avatar_url: "", badge: null },
    points: 300,
    completed_challenge_count: 5,
    received_reaction_count: 10,
  },
];

// TooltipWrapper uses Radix which needs a provider — mock it
vi.mock("~/components/ui/tooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Ranking route", () => {
  it("renders the page heading", async () => {
    renderWithRouter(RankingList, {
      path: "/ranking",
      loader: () => ({ rankingUsers: mockRankingUsers }),
    });

    expect(await screen.findByText("Ranking")).toBeInTheDocument();
  });

  it("renders all ranking users", async () => {
    renderWithRouter(RankingList, {
      path: "/ranking",
      loader: () => ({ rankingUsers: mockRankingUsers }),
    });

    expect(await screen.findByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  it("renders user points", async () => {
    renderWithRouter(RankingList, {
      path: "/ranking",
      loader: () => ({ rankingUsers: mockRankingUsers }),
    });

    expect(await screen.findByText("500")).toBeInTheDocument();
    expect(screen.getByText("400")).toBeInTheDocument();
    expect(screen.getByText("300")).toBeInTheDocument();
  });

  it("renders Geral and Mensal filter links", async () => {
    renderWithRouter(RankingList, {
      path: "/ranking",
      loader: () => ({ rankingUsers: mockRankingUsers }),
    });

    expect(await screen.findByText("Geral")).toBeInTheDocument();
    expect(screen.getByText("Mensal")).toBeInTheDocument();
  });
});
