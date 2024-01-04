import type { LoaderFunctionArgs } from "@remix-run/node";
import type { MetaArgs } from "@remix-run/react";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useState } from "react";
import slugify from "slugify";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import Post, { BlogTableOfContents } from "~/components/features/blog/post";
import useIntersectionObserver from "~/lib/hooks/useIntersectionObserver";
import { getPost } from "~/lib/models/blog-post.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { abort404 } from "~/lib/utils/responses.server";

export const meta = ({ data, params }: MetaArgs<any>) => {
  // para não quebrar se não houver blogPost ainda.
  if (!data?.blogPost) {
    return [{}];
  }

  const title = `${data.blogPost.title} | Codante.io`;
  const description = data.blogPost.short_description;
  const imageUrl = getOgGeneratorUrl(data.blogPost.title, "Blog");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `https://codante.io/blog/${params.slug}` },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/blog/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.blogPost.title },
  ];
};

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return <Error500 error={error} />;
}

function getHeadersFromMarkdown(markdown: string) {
  const headers = markdown.match(/^(#{2,3})\s+(.*)$/gm);
  if (!headers) {
    return [];
  }

  return headers.map((header) => {
    const slug = slugify(header, { lower: true });
    const level = header.startsWith("###") ? 3 : 2;
    const title = header.replace(/^(#{2,3})\s+(.*)$/, "$2");

    return {
      title,
      slug,
      level,
    };
  });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const blogPost = await getPost(request, params.slug!);
  if (!blogPost) {
    return abort404();
  }

  const headers = getHeadersFromMarkdown(blogPost.content);

  return { blogPost, headers };
}

export default function BlogPost() {
  const { blogPost, headers } = useLoaderData<typeof loader>();

  const [activeId, setActiveId] = useState();
  useIntersectionObserver(setActiveId);

  return (
    <main className="container mx-auto">
      <section className="flex justify-between">
        <Post blogPost={blogPost} withBreadcrumbs={true} withReactions={true} />
        <BlogTableOfContents headers={headers} activeId={activeId} />
      </section>
    </main>
  );
}
