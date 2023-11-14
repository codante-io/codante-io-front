import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useState } from "react";
import slugify from "slugify";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";
import Post, { BlogTableOfContents } from "~/components/post";
import useIntersectionObserver from "~/hooks/useIntersectionObserver";
import { getPage } from "~/models/blog-post.server";
import { getOgGeneratorUrl } from "~/utils/path-utils";
import { abort404 } from "~/utils/responses.server";

export const meta = ({ data, params }: any) => {
  // para não quebrar se não houver blogPost ainda.
  if (!data?.page) {
    return [{}];
  }

  const title = `${data.page.title} | Codante.io`;
  const description = data.page.short_description;
  const imageUrl = getOgGeneratorUrl(data.page.title, "Página");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `https://codante.io/docs/${params.slug}` },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/docs/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: data.page.title },
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
  const page = await getPage(request, params.slug!);
  if (!page) {
    return abort404();
  }

  // get all headers from the markdown file
  const headers = getHeadersFromMarkdown(page.content);

  return { page, headers };
}

export default function PagePost() {
  const { page, headers } = useLoaderData<typeof loader>();

  const [activeId, setActiveId] = useState();
  useIntersectionObserver(setActiveId);

  return (
    <main className="container mx-auto">
      <section className="flex justify-between">
        <Post
          blogPost={page}
          withBreadcrumbs={false}
          withReactions={false}
          withAuthor={false}
        />
        <BlogTableOfContents headers={headers} activeId={activeId} />
      </section>
    </main>
  );
}
