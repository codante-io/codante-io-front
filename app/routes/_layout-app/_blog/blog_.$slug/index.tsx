import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import MarkdownRenderer from "~/components/markdown-renderer";
import ReactionsButton from "~/components/reactions-button";
import { getPost } from "~/models/blog-post.server";

export async function loader({ request, params }: LoaderArgs) {
  const blogPost = await getPost(request, params.slug!);
  return { blogPost };
}

export default function BlogPost() {
  const { blogPost } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <div className="mx-auto max-w-prose">
        <BlogBreadcrumbs postTitle={blogPost.title} />
        <div className="mt-6 prose lg:prose-lg dark:prose-invert">
          <h1>{blogPost.title}</h1>
          <p className="lead">{blogPost.short_description}</p>
          <ReactionsButton
            reactableId={blogPost.id}
            reactableType="BlogPost"
            reactions={blogPost.reactions}
          />
          <MarkdownRenderer markdown={blogPost.content} />
        </div>
      </div>
    </main>
  );
}

function BlogBreadcrumbs({ postTitle }: { postTitle?: string }) {
  return (
    <div className="flex items-center space-x-2 text-gray-500">
      <Link
        to="/"
        className="hover:underline hover:text-gray-800 dark:hover:text-gray-100"
      >
        Home
      </Link>
      <span className="text-brand">{`>`}</span>
      <Link
        to="/blog"
        className="hover:underline hover:text-gray-800 dark:hover:text-gray-100"
      >
        Blog
      </Link>
      <span className="text-brand">{`>`}</span>
      <span>{postTitle}</span>
    </div>
  );
}
