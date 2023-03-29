import { Link, useLoaderData } from "@remix-run/react";
import { getSession, user } from "~/services/auth.server";

export let loader = async ({ request }: { request: Request }) => {
  const loggedUser = await user({ request });

  // get the current session
  const session = await getSession(request.headers.get("Cookie"));

  return { user: loggedUser, session };
};

export default function Index() {
  let { user, session } = useLoaderData();

  console.log(Request);
  return (
    <div className="bg-gray-800 min-h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-blue-500 text-5xl mb-6">Codante</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <div>
        {user ? (
          <>
            <div className="text-center">
              <img
                className="inline-block"
                width={50}
                style={{ borderRadius: "100px" }}
                src={user.avatar_url}
                alt="Github Avatar"
              />
              <p>Você está logado, {user.name}</p>
            </div>
            <pre className="bg-gray-600 rounded p-4 mt-4">
              {JSON.stringify(user, null, 2)}
            </pre>
          </>
        ) : (
          <p>Você está deslogado</p>
        )}
      </div>
    </div>
  );
}
