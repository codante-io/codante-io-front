import type { LoaderFunctionArgs } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";
import Post from "~/components/post";
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
  const headers = markdown.match(/(?<=## )(.*?)(?=\n)/g);
  if (!headers) {
    return [];
  }

  return headers.map((header) => {
    const slug = header
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    return {
      title: header,
      slug,
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
  console.log(headers);
  console.log(page.content)
  return { page, headers };
}

export default function PagePost() {
  const { page, headers } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <section className="flex ">
        <Post
          blogPost={page}
          withBreadcrumbs={false}
          withReactions={false}
          withAuthor={false}
        />
        <div className="toc">
          <h3 className="text-xl font-bold">Conteúdo</h3>
          <ul className="list-disc list-inside">
            {headers.map((item) => (
              <li key={item.slug}>
                <a href={`#${item.slug}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
