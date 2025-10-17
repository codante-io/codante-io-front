import { useLoaderData } from "react-router";
import type { BlogPost } from "~/lib/models/blog-post.server";
import { getPosts } from "~/lib/models/blog-post.server";
import BlogPostCard from "./components/blog-post-card";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import type { LoaderFunctionArgs } from "react-router";
import type { MetaFunction } from "react-router";

export const meta: MetaFunction = () => {
  const title = "Blog | Codante.io";
  const description =
    "Blog do Codante. Fique por dentro das últimas novidades sobre desenvolvimento front-end.";
  const imageUrl = getOgGeneratorUrl("Blog do Codante");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://codante.io/blog" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:domain", content: "codante.io" },
    { name: "twitter:url", content: "https://codante.io/blog" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "Blog do Codante" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const blogPosts = await getPosts(request);

  return { blogPosts };
}
export default function Blog() {
  const { blogPosts } = useLoaderData<typeof loader>();
  return (
    <div className="container mx-auto ">
      <h1 className="mb-10 text-3xl md:text-4xl text-center font-lexend">
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
