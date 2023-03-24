import { json } from '@remix-run/node';
import { useLoaderData, Link } from '@remix-run/react';
import { getCourses } from '~/models/course.server';

export const loader = async () => {
  return json({workshops: await getCourses() });
};

export default function Workshops() {
  const { workshops } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Workshops</h1>
      <ul>
        {workshops.map((course) => (
          <li key={course.slug}>
            <Link
              to={course.slug}
              className="text-blue-600 underline"
            >
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
