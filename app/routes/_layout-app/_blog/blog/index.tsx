import { useLoaderData } from "@remix-run/react";
import type { BlogPost } from "~/models/blog-post.server";
import { getPosts } from "~/models/blog-post.server";
import BlogPostCard from "./components/blog-post-card";

export function meta() {
  return {
    title: "Blog | Codante.io",
    description:
      "Blog do Codante. Fique por dentro das últimas novidades sobre desenvolvimento front-end.",
  };
}

export async function loader({ request }: { request: Request }) {
  const blogPosts = await getPosts(request);

  return { blogPosts };
}
export default function Blog() {
  const { blogPosts } = useLoaderData();
  return (
    <div className="container mx-auto ">
      <h1 className="mb-10 text-4xl text-center font-lexend">
        Blog do Codante
      </h1>
      <section className="grid justify-center grid-cols-1 gap-10 lg:grid-cols-3 md:grid-cols-2">
        {blogPosts.map((blogPost: BlogPost) => (
          <BlogPostCard key={blogPost.slug} blogPost={blogPost} />
        ))}
      </section>
    </div>
  );
}
