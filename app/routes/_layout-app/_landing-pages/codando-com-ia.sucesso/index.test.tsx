import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import CodandoComIaCheckoutSuccess from "./index";

vi.mock("~/lib/models/pagarme.server", () => ({
  getCodandoComIaOrderStatus: vi.fn(),
}));

describe("CodandoComIaCheckoutSuccess route", () => {
  it("renders error state when error is returned", async () => {
    renderWithRouter(CodandoComIaCheckoutSuccess, {
      path: "/codando-com-ia/sucesso",
      loader: () => ({
        order: null,
        error: "Não encontramos informações da sua compra.",
      }),
    });

    expect(
      await screen.findByText("Não foi possível encontrar sua compra"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Não encontramos informações da sua compra."),
    ).toBeInTheDocument();
  });

  it("renders paid status correctly", async () => {
    renderWithRouter(CodandoComIaCheckoutSuccess, {
      path: "/codando-com-ia/sucesso",
      loader: () => ({
        order: {
          id: "order_123",
          status: "paid",
          amount: 29700,
          charges: [
            {
              status: "paid",
              payment_method: "credit_card",
              last_transaction: { status: "paid" },
            },
          ],
        },
        error: null,
      }),
    });

    expect(
      await screen.findByText("Pagamento confirmado!"),
    ).toBeInTheDocument();
    expect(screen.getByText("order_123")).toBeInTheDocument();
    expect(screen.getByText("R$ 297,00")).toBeInTheDocument();
  });

  it("renders pending boleto status with next steps", async () => {
    renderWithRouter(CodandoComIaCheckoutSuccess, {
      path: "/codando-com-ia/sucesso",
      loader: () => ({
        order: {
          id: "order_456",
          status: "pending",
          amount: 29700,
          charges: [
            {
              status: "pending",
              payment_method: "boleto",
              last_transaction: {
                status: "waiting_payment",
                url: "https://boleto.example.com",
                line: "12345.67890 12345.678901 12345.678901 1 12340000029700",
              },
            },
          ],
        },
        error: null,
      }),
    });

    expect(
      await screen.findByText("Pagamento em processamento"),
    ).toBeInTheDocument();
    expect(screen.getByText("Abrir boleto")).toBeInTheDocument();
  });

  it("renders denied status", async () => {
    renderWithRouter(CodandoComIaCheckoutSuccess, {
      path: "/codando-com-ia/sucesso",
      loader: () => ({
        order: {
          id: "order_789",
          status: "failed",
          amount: 29700,
          charges: [
            {
              status: "failed",
              payment_method: "credit_card",
              last_transaction: { status: "failed" },
            },
          ],
        },
        error: null,
      }),
    });

    const elements = await screen.findAllByText("Pagamento não confirmado");
    expect(elements.length).toBeGreaterThanOrEqual(1);
  });

  it("renders contact email link", async () => {
    renderWithRouter(CodandoComIaCheckoutSuccess, {
      path: "/codando-com-ia/sucesso",
      loader: () => ({
        order: null,
        error: "Erro genérico",
      }),
    });

    expect(await screen.findByText("contato@codante.io")).toBeInTheDocument();
  });
});
