import { render, screen } from "@testing-library/react";
import Chip from "./chip";

describe("Chip", () => {
  it("renders the text", () => {
    render(<Chip text="PRO" />);
    expect(screen.getByText("PRO")).toBeInTheDocument();
  });

  it("renders with free type styling", () => {
    render(<Chip text="Gratuito" type="free" />);
    const chip = screen.getByText("Gratuito");
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveClass("text-green-600");
  });

  it("renders with unlisted type styling", () => {
    render(<Chip text="Não listado" type="unlisted" />);
    const chip = screen.getByText("Não listado");
    expect(chip).toHaveClass("text-red-600");
  });

  it("applies default type when no type is provided", () => {
    render(<Chip text="Default" />);
    const chip = screen.getByText("Default");
    expect(chip).toHaveClass("text-blue-600");
  });

  it("accepts additional className", () => {
    const { container } = render(
      <Chip text="Test" className="my-custom-class" />,
    );
    const outerDiv = container.firstChild as HTMLElement;
    expect(outerDiv).toHaveClass("my-custom-class");
  });
});
