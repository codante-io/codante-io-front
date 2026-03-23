import { render, screen } from "@testing-library/react";
import Input from "./index";

describe("Input", () => {
  it("renders label text", () => {
    render(<Input name="email" id="email" label="E-mail" />);
    expect(screen.getByText("E-mail")).toBeInTheDocument();
  });

  it("renders input with correct attributes", () => {
    render(<Input name="email" id="email" label="E-mail" type="email" />);
    const input = screen.getByLabelText("E-mail");
    expect(input).toHaveAttribute("type", "email");
    expect(input).toHaveAttribute("name", "email");
    expect(input).toHaveAttribute("id", "email");
  });

  it("defaults to text type", () => {
    render(<Input name="name" id="name" label="Nome" />);
    expect(screen.getByLabelText("Nome")).toHaveAttribute("type", "text");
  });

  it("supports disabled state", () => {
    render(<Input name="name" id="name" label="Nome" disabled />);
    expect(screen.getByLabelText("Nome")).toBeDisabled();
  });

  it("supports placeholder", () => {
    render(
      <Input
        name="name"
        id="name"
        label="Nome"
        placeholder="Digite seu nome"
      />,
    );
    expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(
      <Input name="name" id="name" label="Nome" data-testid="custom-input" />,
    );
    expect(screen.getByTestId("custom-input")).toBeInTheDocument();
  });
});
