import { useLoaderData } from "@remix-run/react";
import type { BlogPost } from "~/lib/models/blog-post.server";
import { getPosts } from "~/lib/models/blog-post.server";
import BlogPostCard from "./components/blog-post-card";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { metaV1 } from "@remix-run/v1-meta";
import type { LoaderFunctionArgs } from "@remix-run/node";

export function meta(args: any) {
  const title = "Blog | Codante.io";
  const description =
    "Blog do Codante. Fique por dentro das últimas novidades sobre desenvolvimento front-end.";
  const imageUrl = getOgGeneratorUrl("Blog do Codante");

  return metaV1(args, {
    title: title,
    description: description,
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "og:type": "website",
    "og:url": `https://codante.io/blog`,

    "twitter:card": "summary_large_image",
    "twitter:domain": "codante.io",
    "twitter:url": `https://codante.io/blog`,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
    "twitter:image:alt": "Blog do Codante",
  });
}

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
