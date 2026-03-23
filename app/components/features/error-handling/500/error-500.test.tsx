import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import { Error500 } from "./index";

const mockError = { message: "Test error", stack: "Error stack trace" };

describe("Error500", () => {
  it("renders 500 status code", () => {
    renderWithRouter(() => <Error500 error={mockError} />);
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("renders error heading", () => {
    renderWithRouter(() => <Error500 error={mockError} />);
    expect(screen.getByText("Ops...")).toBeInTheDocument();
  });

  it("renders description text", () => {
    renderWithRouter(() => <Error500 error={mockError} />);
    expect(screen.getByText("Alguma coisa deu errada...")).toBeInTheDocument();
  });

  it("renders link back to home", () => {
    renderWithRouter(() => <Error500 error={mockError} />);
    expect(screen.getByText(/Voltar para a Home/)).toBeInTheDocument();
  });

  it("shows error details in non-production", () => {
    renderWithRouter(() => <Error500 error={mockError} />);
    expect(screen.getByText(/"Test error"/)).toBeInTheDocument();
  });
});
