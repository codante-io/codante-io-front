import { render, screen } from "@testing-library/react";
import AlertBanner from "./index";

describe("AlertBanner", () => {
  it("renders title and subtitle", () => {
    render(<AlertBanner title="Atenção" subtitle="Algo aconteceu" />);
    expect(screen.getByText("Atenção")).toBeInTheDocument();
    expect(screen.getByText("Algo aconteceu")).toBeInTheDocument();
  });

  it("renders default type with info styling", () => {
    const { container } = render(
      <AlertBanner title="Info" subtitle="Details" />,
    );
    expect(container.firstChild).toHaveClass("border-brand");
  });

  it("renders warning type", () => {
    const { container } = render(
      <AlertBanner title="Aviso" subtitle="Cuidado" type="warning" />,
    );
    expect(container.firstChild).toHaveClass("border-yellow-400");
  });

  it("renders streaming type", () => {
    const { container } = render(
      <AlertBanner title="Ao Vivo" subtitle="Stream" type="streaming" />,
    );
    expect(container.firstChild).toHaveClass("border-red-500");
  });

  it("renders workshop-is-live type", () => {
    const { container } = render(
      <AlertBanner
        title="Workshop"
        subtitle="Ao vivo agora"
        type="workshop-is-live"
      />,
    );
    expect(container.firstChild).toHaveClass("border-red-500");
  });

  it("renders black-friday type", () => {
    const { container } = render(
      <AlertBanner title="BF" subtitle="Promo" type="black-friday" />,
    );
    expect(container.firstChild).toHaveClass("border-yellow-500");
  });

  it("applies custom className", () => {
    const { container } = render(
      <AlertBanner title="T" subtitle="S" className="my-custom" />,
    );
    expect(container.firstChild).toHaveClass("my-custom");
  });

  it("renders custom icon when provided", () => {
    render(
      <AlertBanner
        title="T"
        subtitle="S"
        icon={<span data-testid="custom-icon">!</span>}
      />,
    );
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
  });
});
