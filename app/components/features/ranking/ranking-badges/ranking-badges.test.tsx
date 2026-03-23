import { render } from "@testing-library/react";
import { FirstPlace, SecondPlace, ThirdPlace } from "./index";

describe("Ranking Badges", () => {
  it("renders FirstPlace SVG with amber fill", () => {
    const { container } = render(<FirstPlace />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(container.querySelector(".fill-amber-400")).toBeInTheDocument();
  });

  it("renders SecondPlace SVG with slate fill", () => {
    const { container } = render(<SecondPlace />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(container.querySelector(".fill-slate-400")).toBeInTheDocument();
  });

  it("renders ThirdPlace SVG with amber-700 fill", () => {
    const { container } = render(<ThirdPlace />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(container.querySelector(".fill-amber-700")).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    const { container } = render(<FirstPlace data-testid="badge" />);
    expect(
      container.querySelector("[data-testid='badge']"),
    ).toBeInTheDocument();
  });
});
