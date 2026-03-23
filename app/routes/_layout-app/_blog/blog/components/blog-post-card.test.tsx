import { screen } from "@testing-library/react";
import { renderWithRouter } from "~/test/render-with-router";
import BlogPostCard from "./blog-post-card";

vi.mock("~/lib/hooks/useUserFromOutletContext", () => ({
  useUserFromOutletContext: () => null,
}));

const mockBlogPost = {
  id: 1,
  title: "Introdução ao React Router v7",
  slug: "introducao-react-router-v7",
  status: "published" as const,
  content: "<p>Conteúdo completo</p>",
  short_description: "Aprenda as novidades do React Router v7",
  image_url: "https://example.com/image.jpg",
  instructor: {
    id: "1",
    name: "João",
    slug: "joao",
    avatar_url: "https://example.com/avatar.jpg",
    company: "Codante",
    email: "joao@codante.io",
    bio: "Instrutor",
    created_at: "2024-01-01",
    updated_at: "2024-01-01",
  },
  reactions: {
    reaction_counts: [],
    user_reactions: [],
  },
  tags: [],
};

describe("BlogPostCard", () => {
  it("renders the blog post title", () => {
    renderWithRouter(() => <BlogPostCard blogPost={mockBlogPost} />);
    expect(
      screen.getByText("Introdução ao React Router v7"),
    ).toBeInTheDocument();
  });

  it("renders the short description", () => {
    renderWithRouter(() => <BlogPostCard blogPost={mockBlogPost} />);
    expect(
      screen.getByText("Aprenda as novidades do React Router v7"),
    ).toBeInTheDocument();
  });

  it("links to the correct blog post URL", () => {
    renderWithRouter(() => <BlogPostCard blogPost={mockBlogPost} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/blog/introducao-react-router-v7");
  });
});
