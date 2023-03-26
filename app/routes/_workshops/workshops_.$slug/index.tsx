import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from 'tiny-invariant'
import { getWorkshop } from "~/models/workshop.server";

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  return json({ slug: params.slug, workshop: await getWorkshop(params.slug) });
};

export default function WorkshopSlug() {
  const { slug, workshop } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Workshop: {slug}
      </h1>
        <pre>{JSON.stringify(workshop, null, 2)}</pre>
    </main>
  );
}