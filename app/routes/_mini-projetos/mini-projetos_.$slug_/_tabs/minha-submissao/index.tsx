import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import LoadingButton from "~/components/form/loading-button";

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

  const errors = useActionData();
  const transition = useNavigation();

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  return (
    <div className="container">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Minha submissão
      </h1>
      {challengeUser?.pivot?.submission_url ? (
        <div className="overflow-hidden rounded-xl w-[377px] h-[212px]">
          <img
            src={challengeUser?.pivot?.submission_image_url}
            alt="Screenshot da aplicação submetida"
            className="w-[377px] h-[212px] object-cover"
          />
        </div>
      ) : (
        <Form method="POST">
          <div>
            <label
              htmlFor="submission-url"
              className="block text-sm font-medium leading-6 text-gray-800 dark:text-white"
            >
              Submeta o link da sua aplicação funcionando
              <br />
              <span className="text-xs font-light text-gray-600 dark:text-gray-400">
                Nós vamos tirar uma screenshot para colocar na nossa galeria
              </span>
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
                <input
                  type="text"
                  name="submission-url"
                  defaultValue={challengeUser?.pivot?.submission_url}
                  id="submission-url"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-800 dark:text-gray-400 dark:placeholder:text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="https://mp-example.vercel.app/"
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <LoadingButton
              type="submit"
              className="relative transition duration-200"
              status={status}
              isSuccessfulSubmission={isSuccessfulSubmission}
            >
              Enviar
            </LoadingButton>
          </div>
        </Form>
      )}
    </div>
  );
}
