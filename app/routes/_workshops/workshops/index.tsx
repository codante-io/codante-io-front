import { json } from "@remix-run/node";
import { useLoaderData, Link, Outlet } from "@remix-run/react";
import { getWorkshops } from "~/models/workshop.server";
import { user, currentToken } from "~/services/auth.server";

export const loader = async ({ request }: { request: Request }) => {
  return json({
    workshops: await getWorkshops(),
    user: await user({ request }),
    apikey: await currentToken({ request }),
  });
};
export default function Workshops() {
  const { workshops, user, apikey } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Workshops</h1>
      <ul>
        {workshops.map((workshop) => (
          <li key={workshop.slug}>
            <Link to={workshop.slug} className="text-blue-600 underline">
              {workshop.name}
            </Link>
          </li>
        ))}
      </ul>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{JSON.stringify(apikey, null, 2)}</pre>
      <Link to="/">Home</Link>
      <Outlet />
    </main>
  );
}
