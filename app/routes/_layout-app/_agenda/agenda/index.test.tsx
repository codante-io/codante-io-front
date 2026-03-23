import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import Calendar from "./index";

vi.mock("~/lib/models/calendar.server", () => ({
  getUpcomingEvents: vi.fn(),
  getPreviousEvents: vi.fn(),
}));

// Calendar uses useOutletContext for user data
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useOutletContext: () => ({ user: null }),
  };
});

// BlurReveal uses framer-motion — mock to passthrough
vi.mock("~/components/ui/motion/blur-reveal", () => ({
  BlurReveal: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockEvents = {
  upcoming: [
    {
      id: 1,
      title: "Workshop React Router v7",
      description: "Aprenda React Router v7",
      datetime: "2026-04-15T19:00:00Z",
      type: "workshop",
      url: "/workshops/react-router-v7",
      image_url: null,
    },
    {
      id: 2,
      title: "Mini Projeto CSS Grid",
      description: "Pratique CSS Grid",
      datetime: "2026-04-20T19:00:00Z",
      type: "challenge",
      url: "/mini-projetos/css-grid",
      image_url: null,
    },
  ],
  previous: [
    {
      id: 3,
      title: "Workshop TypeScript",
      description: "TypeScript avançado",
      datetime: "2026-01-10T19:00:00Z",
      type: "workshop",
      url: "/workshops/typescript",
      image_url: null,
    },
  ],
};

describe("Agenda route", () => {
  it("renders the page heading", async () => {
    renderWithRouter(Calendar, {
      path: "/agenda",
      loader: () => mockEvents,
    });

    expect(await screen.findByText("Agenda")).toBeInTheDocument();
  });

  it("renders upcoming events", async () => {
    renderWithRouter(Calendar, {
      path: "/agenda",
      loader: () => mockEvents,
    });

    expect(
      await screen.findByText("Workshop React Router v7"),
    ).toBeInTheDocument();
    expect(screen.getByText("Mini Projeto CSS Grid")).toBeInTheDocument();
  });

  it("renders filter toggle buttons", async () => {
    renderWithRouter(Calendar, {
      path: "/agenda",
      loader: () => mockEvents,
    });

    expect(await screen.findByText("Mini Projetos")).toBeInTheDocument();
    expect(screen.getByText("Workshops")).toBeInTheDocument();
    expect(screen.getByText("Resoluções de Mini Projetos")).toBeInTheDocument();
  });

  it("renders upcoming/previous toggle", async () => {
    renderWithRouter(Calendar, {
      path: "/agenda",
      loader: () => mockEvents,
    });

    expect(await screen.findByText("Próximos eventos")).toBeInTheDocument();
    expect(screen.getByText("Eventos passados")).toBeInTheDocument();
  });

  it("shows empty state when no events match filter", async () => {
    renderWithRouter(Calendar, {
      path: "/agenda",
      loader: () => ({ upcoming: [], previous: [] }),
    });

    expect(
      await screen.findByText("Nenhum evento encontrado"),
    ).toBeInTheDocument();
  });
});
