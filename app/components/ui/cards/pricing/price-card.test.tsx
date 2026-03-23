import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PriceCard from "./price-card";

// Mock Tooltip which needs Radix provider
vi.mock("~/components/ui/tooltip", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("PriceCard", () => {
  it("renders children", () => {
    render(
      <PriceCard>
        <span>Card content</span>
      </PriceCard>,
    );
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <PriceCard className="border-amber-400">
        <span>Test</span>
      </PriceCard>,
    );
    expect(container.firstChild).toHaveClass("border-amber-400");
  });
});

describe("PriceCard.Title", () => {
  it("renders title text", () => {
    render(
      <PriceCard>
        <PriceCard.Title>Plano PRO</PriceCard.Title>
      </PriceCard>,
    );
    expect(screen.getByText("Plano PRO")).toBeInTheDocument();
  });

  it("renders skeleton when loading", () => {
    const { container } = render(
      <PriceCard>
        <PriceCard.Title isLoading>Plano PRO</PriceCard.Title>
      </PriceCard>,
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});

describe("PriceCard.Pricing", () => {
  it("renders monthly price", () => {
    render(
      <PriceCard>
        <PriceCard.Pricing monthlyPrice={49} />
      </PriceCard>,
    );
    expect(screen.getByText(/R\$\s*49/)).toBeInTheDocument();
  });

  it("renders installments when > 1", () => {
    render(
      <PriceCard>
        <PriceCard.Pricing monthlyPrice={49} installments={12} />
      </PriceCard>,
    );
    expect(screen.getByText("12x")).toBeInTheDocument();
  });

  it("renders full price with strikethrough", () => {
    render(
      <PriceCard>
        <PriceCard.Pricing monthlyPrice={49} fullPrice={99} />
      </PriceCard>,
    );
    expect(screen.getByText(/R\$ 99/)).toBeInTheDocument();
  });

  it("renders skeleton when loading", () => {
    const { container } = render(
      <PriceCard>
        <PriceCard.Pricing isLoading />
      </PriceCard>,
    );
    expect(container.querySelector(".animate-pulse")).toBeInTheDocument();
  });
});

describe("PriceCard.Features", () => {
  const features = [
    {
      "Recursos Principais": [
        { title: "Acesso a mini-projetos", isAvailable: true },
        { title: "Certificados", isAvailable: false },
      ],
    },
  ];

  it("renders feature items", () => {
    render(
      <PriceCard>
        <PriceCard.Features features={features} />
      </PriceCard>,
    );
    expect(screen.getByText("Acesso a mini-projetos")).toBeInTheDocument();
    expect(screen.getByText("Certificados")).toBeInTheDocument();
  });

  it("renders category name", () => {
    render(
      <PriceCard>
        <PriceCard.Features features={features} />
      </PriceCard>,
    );
    expect(screen.getByText("Recursos Principais")).toBeInTheDocument();
  });
});

describe("PriceCard.Coupon", () => {
  it("shows 'Possui cupom?' button initially", () => {
    render(
      <PriceCard>
        <PriceCard.Coupon onSubmit={vi.fn()} />
      </PriceCard>,
    );
    expect(screen.getByText("Possui cupom?")).toBeInTheDocument();
  });

  it("shows form when clicked", async () => {
    const user = userEvent.setup();
    render(
      <PriceCard>
        <PriceCard.Coupon onSubmit={vi.fn()} />
      </PriceCard>,
    );

    await user.click(screen.getByText("Possui cupom?"));
    expect(screen.getByPlaceholderText("Código do Cupom")).toBeInTheDocument();
    expect(screen.getByText("Aplicar")).toBeInTheDocument();
  });

  it("shows error message", async () => {
    const user = userEvent.setup();
    render(
      <PriceCard>
        <PriceCard.Coupon onSubmit={vi.fn()} error="Cupom inválido" />
      </PriceCard>,
    );

    await user.click(screen.getByText("Possui cupom?"));
    expect(screen.getByText("Cupom inválido")).toBeInTheDocument();
  });
});

describe("PriceCard.Divider", () => {
  it("renders a divider element", () => {
    const { container } = render(
      <PriceCard>
        <PriceCard.Divider />
      </PriceCard>,
    );
    expect(
      container.querySelector(".bg-background-500\\/30"),
    ).toBeInTheDocument();
  });
});
