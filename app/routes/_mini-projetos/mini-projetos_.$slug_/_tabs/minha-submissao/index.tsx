import { Form, useOutletContext } from "@remix-run/react";

import { submitChallenge } from "~/models/challenge.server";

import type { ChallengeUser } from "~/models/user.server";

//action submit challenge
export async function action({
  request,
  params,
}: {
  request: Request;
  params: { slug: string };
}) {
  let formData = await request.formData();

  let submissionUrl = formData.get("submission-url") as string;
  return submitChallenge(request, params.slug, submissionUrl);
}

export default function MySubmission() {
  // get challengeUser from outlet context
  const { challengeUser } = useOutletContext<{
    challengeUser: ChallengeUser;
  }>();

  console.log(challengeUser);
  if (challengeUser?.pivot?.submission_url) return null;
  return (
    <Form className="container mt-8" method="POST">
      <div>
        <label
          htmlFor="submission-url"
          className="block text-sm font-medium leading-6 text-gray-800 dark:text-white"
        >
          Link da sua aplicação funcionando
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
            <input
              type="text"
              name="submission-url"
              id="submission-url"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-800 dark:text-white dark:placeholder:text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="https://mp-example.vercel.app/
              "
            />
          </div>
        </div>
      </div>
      <div className="mt-6">
        <button
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
        >
          Enviar
        </button>
      </div>
    </Form>
  );
}
