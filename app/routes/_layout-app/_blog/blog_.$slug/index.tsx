import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { TiArrowBackOutline } from "react-icons/ti";
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
        <div className="prose lg:prose-lg dark:prose-invert">
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
    <>
      <div className="items-center hidden space-x-2 text-sm text-gray-500 md:flex dark:text-gray-400">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="text-brand">{`>`}</span>
        <Link to="/blog" className="hover:underline ">
          Blog
        </Link>
        <span className="text-brand">{`>`}</span>
        <span className="text-gray-700 dark:text-white">{postTitle}</span>
      </div>
      {/* Botão voltar (mobile) */}
      <Link
        to="/blog"
        className="inline-block p-2 text-sm text-gray-500 transition-colors rounded md:invisible dark:hover:text-white dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-2 ">
          <TiArrowBackOutline />
          Voltar
        </div>
      </Link>
    </>
  );
}
