import { render, screen } from "@testing-library/react";
import ProBadge from "./index";

describe("ProBadge", () => {
  it("renders PRO text", () => {
    render(<ProBadge />);
    expect(screen.getByText("PRO")).toBeInTheDocument();
  });

  it("has amber background", () => {
    render(<ProBadge />);
    expect(screen.getByText("PRO")).toHaveClass("bg-amber-400");
  });
});
