import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import Blog from "./index";

vi.mock("~/lib/hooks/useUserFromOutletContext", () => ({
  useUserFromOutletContext: () => null,
}));

// Mock server module to prevent env var validation at import time
vi.mock("~/lib/models/blog-post.server", () => ({
  getPosts: vi.fn(),
}));

const mockBlogPosts = [
  {
    id: 1,
    title: "Post sobre React",
    slug: "post-react",
    status: "published" as const,
    content: "<p>Conteúdo</p>",
    short_description: "Aprenda React",
    image_url: "https://example.com/img.jpg",
    instructor: {
      id: 1,
      name: "João",
      slug: "joao",
      avatar_url: "https://example.com/avatar.jpg",
      company: "Codante",
    },
    reactions: { reaction_counts: [], user_reactions: [] },
    tags: [],
  },
  {
    id: 2,
    title: "Post sobre TypeScript",
    slug: "post-typescript",
    status: "published" as const,
    content: "<p>Conteúdo TS</p>",
    short_description: "Aprenda TypeScript",
    image_url: "https://example.com/img2.jpg",
    instructor: {
      id: 2,
      name: "Maria",
      slug: "maria",
      avatar_url: "https://example.com/avatar2.jpg",
      company: "Codante",
    },
    reactions: { reaction_counts: [], user_reactions: [] },
    tags: [],
  },
];

describe("Blog route", () => {
  it("renders the page heading", async () => {
    renderWithRouter(Blog, {
      path: "/blog",
      loader: () => ({ blogPosts: mockBlogPosts }),
    });

    expect(await screen.findByText("Blog do Codante")).toBeInTheDocument();
  });

  it("renders all blog posts from loader data", async () => {
    renderWithRouter(Blog, {
      path: "/blog",
      loader: () => ({ blogPosts: mockBlogPosts }),
    });

    expect(await screen.findByText("Post sobre React")).toBeInTheDocument();
    expect(screen.getByText("Post sobre TypeScript")).toBeInTheDocument();
  });

  it("renders blog post descriptions", async () => {
    renderWithRouter(Blog, {
      path: "/blog",
      loader: () => ({ blogPosts: mockBlogPosts }),
    });

    expect(await screen.findByText("Aprenda React")).toBeInTheDocument();
    expect(screen.getByText("Aprenda TypeScript")).toBeInTheDocument();
  });
});
