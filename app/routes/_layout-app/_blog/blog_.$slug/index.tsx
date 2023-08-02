import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { TiArrowBackOutline } from "react-icons/ti";
import MarkdownRenderer from "~/components/markdown-renderer";
import ReactionsButton from "~/components/reactions-button";
import { getPost } from "~/models/blog-post.server";
import { getOgGeneratorUrl } from "~/utils/path-utils";

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  // para não quebrar se não houver blogPost ainda.
  if (!data?.blogPost) {
    return {};
  }

  const title = `${data.blogPost.title} | Codante.io`;
  const description = data.blogPost.short_description;
  const imageUrl = getOgGeneratorUrl(data.blogPost.title, "Blog");

  return {
    title: title,
    description: description,
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "og:type": "website",
    "og:url": `https://codante.io/blog/${params.slug}`,

    "twitter:card": "summary_large_image",
    "twitter:domain": "codante.io",
    "twitter:url": `https://codante.io/blog/${params.slug}`,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
    "twitter:image:alt": data.blogPost.title,
  };
};

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
          <div className="flex items-center justify-between">
            <ReactionsButton
              reactableId={blogPost.id}
              reactableType="BlogPost"
              reactions={blogPost.reactions}
              className="pl-0"
              side="right"
            />

            <div className="flex items-center gap-4 max-h-8">
              <img
                src={blogPost.instructor.avatar_url}
                alt=""
                className="w-8 h-8 m-0 rounded-full"
              />
              <span className="text-sm">{blogPost.instructor?.name}</span>
            </div>
          </div>
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
