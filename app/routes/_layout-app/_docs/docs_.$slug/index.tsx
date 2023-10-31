import type { LoaderArgs, MetaFunction } from "@remix-run/node";
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

export const meta: MetaFunction<typeof loader> = ({ data, params }) => {
  // para não quebrar se não houver blogPost ainda.
  if (!data?.page) {
    return {};
  }

  const title = `${data.page.title} | Codante.io`;
  const description = data.page.short_description;
  const imageUrl = getOgGeneratorUrl(data.page.title, "Página");

  return {
    title: title,
    description: description,
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "og:type": "website",
    "og:url": `https://codante.io/docs/${params.slug}`,

    "twitter:card": "summary_large_image",
    "twitter:domain": "codante.io",
    "twitter:url": `https://codante.io/docs/${params.slug}`,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
    "twitter:image:alt": data.page.title,
  };
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

export async function loader({ request, params }: LoaderArgs) {
  const page = await getPage(request, params.slug!);
  if (!page) {
    return abort404();
  }

  return { page };
}

export default function PagePost() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <Post
        blogPost={page}
        withBreadcrumbs={false}
        withReactions={false}
        withAuthor={false}
      />
    </main>
  );
}
