import { render, screen } from "@testing-library/react";
import ProfileStats from "./profile-stats";

describe("ProfileStats", () => {
  const mockStats = {
    points: 250,
    completed_challenge_count: 12,
    received_reaction_count: 45,
  };

  it("renders challenge count", () => {
    render(<ProfileStats stats={mockStats} />);
    expect(screen.getByText("12")).toBeInTheDocument();
  });

  it("renders reaction count", () => {
    render(<ProfileStats stats={mockStats} />);
    expect(screen.getByText("45")).toBeInTheDocument();
  });

  it("renders points", () => {
    render(<ProfileStats stats={mockStats} />);
    expect(screen.getByText("250")).toBeInTheDocument();
  });

  it("renders labels in Portuguese", () => {
    render(<ProfileStats stats={mockStats} />);
    expect(screen.getByText("mini-projetos concluídos")).toBeInTheDocument();
    expect(screen.getByText("reações recebidas")).toBeInTheDocument();
    expect(screen.getByText("pontos")).toBeInTheDocument();
  });

  it("renders zero values correctly", () => {
    render(
      <ProfileStats
        stats={{
          points: 0,
          completed_challenge_count: 0,
          received_reaction_count: 0,
        }}
      />,
    );
    const zeros = screen.getAllByText("0");
    expect(zeros).toHaveLength(3);
  });
});
