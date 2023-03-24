import type { LoaderArgs} from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getCourse } from "~/models/course.server";
import invariant from 'tiny-invariant'

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.slug, `params.slug is required`);
  return json({ slug: params.slug, course: await getCourse(params.slug) });
};

export default function CourseSlug() {
  const { slug, course } = useLoaderData<typeof loader>();

  return (
    <main className="mx-auto max-w-4xl">
      <h1 className="my-6 border-b-2 text-center text-3xl">
        Some Course: {slug}
      </h1>
        <pre>{JSON.stringify(course, null, 2)}</pre>
    </main>
  );
}