import { json } from '@remix-run/node';
import { useLoaderData, Link, Outlet } from '@remix-run/react';
import { getWorkshops } from '../../../models/workshop.server';

export const loader = async ({ request }: { request: Request }) => {
  return json({
    workshops: await getWorkshops(),
  });
};
export default function Workshops() {
  const { workshops } = useLoaderData<typeof loader>();

  return (
    <main className="mt-10 text-center">
      <h1 className="text-4xl font-lexend mb-10">Workshops</h1>
      <section className="font-lexend grid gap-5 grid-cols-2 grid-rows-3">
        {workshops.map((workshop) => (
          <Link key={workshop.id} to={workshop.slug}>
            <article className="border border-gray-500 rounded-lg p-10 bg-gray-900 mb-4">
              <div>{/* image */}</div>
              <div>
                <div className="mb-4">
                  <h2 className="text-xl capitalize">{workshop.name}</h2>
                  <p className="text-xs font-light text-gray-500 capitalize">
                    {workshop.categories.map(
                      (category) => `${category.name}, `
                    )}
                  </p>
                </div>
                <div className="mb-4">
                  {/* <img src="" alt="" /> */}
                  <p className="text-sm font-light">
                    {workshop.instructor.name}
                  </p>
                  <p className="text-xs font-light text-gray-500 capitalize">
                    {workshop.instructor.company}
                  </p>
                </div>
                <div>
                  <p className="font-light text-gray-400">
                    {workshop.short_description}
                  </p>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </section>
      <Outlet />
    </main>
  );
}
