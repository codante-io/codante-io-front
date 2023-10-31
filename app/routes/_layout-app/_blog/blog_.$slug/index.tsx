import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Error500 } from "~/components/errors/500";
import NotFound from "~/components/errors/not-found";
import Post from "~/components/post";
import { getPost } from "~/models/blog-post.server";
import { getOgGeneratorUrl } from "~/utils/path-utils";
import { abort404 } from "~/utils/responses.server";

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
  const blogPost = await getPost(request, params.slug!);
  if (!blogPost) {
    return abort404();
  }

  return { blogPost };
}

export default function BlogPost() {
  const { blogPost } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <Post blogPost={blogPost} withBreadcrumbs={true} withReactions={true} />
    </main>
  );
}
