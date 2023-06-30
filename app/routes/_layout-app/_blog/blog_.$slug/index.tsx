import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import MarkdownRenderer from "~/components/markdown-renderer";
import { getPost } from "~/models/blog-post.server";

export async function loader({ request, params }: LoaderArgs) {
  const blogPost = await getPost(request, params.slug!);
  return { blogPost };
}

export default function BlogPost() {
  const { blogPost } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <h1 className="mb-2 text-5xl">{blogPost.title}</h1>
      <p className="text-lg italic font-light">{blogPost.short_description}</p>
      <div className="prose prose-lg dark:prose-invert">
        <MarkdownRenderer markdown={blogPost.content} />
      </div>
    </main>
  );
}
