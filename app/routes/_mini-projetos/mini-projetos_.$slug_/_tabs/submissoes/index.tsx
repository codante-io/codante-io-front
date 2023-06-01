import { Link, useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { getChallengeSubmissions } from "~/models/challenge.server";
import invariant from "tiny-invariant";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.slug, `params.slug is required`);

  const challengeSubmissions = await getChallengeSubmissions(params.slug);

  return { challengeSubmissions };
}

export default function Submissions() {
  const { challengeSubmissions } = useLoaderData<typeof loader>();
  return (
    <div className="container grid grid-cols-3 gap-10">
      {challengeSubmissions.map((submission) => (
        <Link
          key={submission.user_github_user}
          to={submission.user_github_user}
        >
          <article className="overflow-hidden rounded-xl border-[1.5px] dark:border-background-600 border-background-200 shadow-sm text-gray-800 dark:text-white hover:shadow-lg transition-shadow">
            <img
              src={submission.submission_image_url}
              alt="Print da aplicação submetida"
            />
            <footer className="flex items-center gap-4 p-4 dark:bg-background-700 ">
              <img
                src={submission.user_avatar_url}
                alt="Avatar do usuário"
                className="w-10 h-10 border rounded-full border-background-200 dark:border-background-600"
              />
              <div>
                <h4 className="text-xs dark:text-gray-400 font-regular">
                  Resolução de
                </h4>
                <h3 className="font-semibold">{submission.user_name}</h3>
              </div>
            </footer>
          </article>
        </Link>
      ))}
    </div>
  );
}
