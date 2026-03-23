import { render, screen } from "@testing-library/react";
import WhatsButton from "./index";

describe("WhatsButton", () => {
  it("renders a link to WhatsApp", () => {
    render(<WhatsButton />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", expect.stringContaining("wa.me"));
  });

  it("opens in a new tab", () => {
    render(<WhatsButton />);
    expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
  });

  it("has accessible label", () => {
    render(<WhatsButton />);
    expect(
      screen.getByLabelText("Fale conosco pelo WhatsApp"),
    ).toBeInTheDocument();
  });

  it("renders without fixed positioning when onlyWrapper", () => {
    const { container } = render(<WhatsButton onlyWrapper />);
    const link = container.querySelector("a");
    expect(link?.className).not.toContain("fixed");
  });

  it("renders with fixed positioning by default", () => {
    const { container } = render(<WhatsButton />);
    const link = container.querySelector("a");
    expect(link?.className).toContain("fixed");
  });
});
