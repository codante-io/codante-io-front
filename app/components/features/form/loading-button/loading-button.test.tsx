import { render, screen } from "@testing-library/react";
import LoadingButton from "./index";

describe("LoadingButton", () => {
  it("renders children text in idle state", () => {
    render(<LoadingButton status="idle">Enviar</LoadingButton>);
    expect(screen.getByText("Enviar")).toBeVisible();
  });

  it("is enabled in idle state", () => {
    render(<LoadingButton status="idle">Enviar</LoadingButton>);
    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("is disabled when loading", () => {
    render(<LoadingButton status="loading">Enviar</LoadingButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when submitting", () => {
    render(<LoadingButton status="submitting">Enviar</LoadingButton>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("shows spinner during loading", () => {
    const { container } = render(
      <LoadingButton status="loading">Enviar</LoadingButton>,
    );
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("shows spinner during submitting", () => {
    const { container } = render(
      <LoadingButton status="submitting">Enviar</LoadingButton>,
    );
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("hides children text when loading", () => {
    render(<LoadingButton status="loading">Enviar</LoadingButton>);
    expect(screen.getByText("Enviar")).toHaveClass("invisible");
  });

  it("is disabled on successful submission", () => {
    render(
      <LoadingButton status="idle" isSuccessfulSubmission>
        Enviar
      </LoadingButton>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("hides children on successful submission", () => {
    render(
      <LoadingButton status="idle" isSuccessfulSubmission>
        Enviar
      </LoadingButton>,
    );
    expect(screen.getByText("Enviar")).toHaveClass("invisible");
  });
});
