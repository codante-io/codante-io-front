import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import NotFound from "./index";

vi.mock("~/components/_layouts/public-env", () => ({
  getPublicEnv: (key: string) => (key === "NODE_ENV" ? "test" : undefined),
}));

describe("NotFound", () => {
  it("renders 404 status code", () => {
    renderWithRouter(() => <NotFound />);
    expect(screen.getByText("404")).toBeInTheDocument();
  });

  it("renders page heading", () => {
    renderWithRouter(() => <NotFound />);
    expect(screen.getByText("Página não encontrada")).toBeInTheDocument();
  });

  it("renders description", () => {
    renderWithRouter(() => <NotFound />);
    expect(
      screen.getByText("Desculpe, não encontramos nada por aqui..."),
    ).toBeInTheDocument();
  });

  it("renders link to home", () => {
    renderWithRouter(() => <NotFound />);
    const link = screen.getByText(/Voltar para a Home/);
    expect(link.closest("a")).toHaveAttribute("href", "/");
  });

  it("shows error details in non-production", () => {
    renderWithRouter(() => <NotFound error="some error info" />);
    expect(screen.getByText(/"some error info"/)).toBeInTheDocument();
  });
});
