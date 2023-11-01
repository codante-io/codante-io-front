import { Form, useActionData, useNavigation } from "@remix-run/react";
import type { Challenge } from "~/models/challenge.server";
import type { ChallengeUser } from "~/models/user.server";
import LoadingButton from "~/components/form/loading-button";

export default function UpdateSubmission({
  challengeUser,
  challenge,
}: {
  challengeUser: ChallengeUser;
  challenge: Challenge;
}) {
  const errors = useActionData();
  const transition = useNavigation();

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  return (
    <Form method="PUT">
      <div>
        <label
          htmlFor="submission_url"
          className="block text-sm font-medium leading-6 text-gray-800 dark:text-white"
        >
          Submeta o link atualizado da sua aplicação funcionando.
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
            <input
              type="text"
              name="submission_url"
              defaultValue={challengeUser?.pivot?.submission_url}
              id="submission_url"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-800 dark:text-gray-400 dark:placeholder:text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="https://mp-example.vercel.app/"
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <LoadingButton
          type="submit"
          className="relative transition duration-200"
          status={status}
          isSuccessfulSubmission={isSuccessfulSubmission}
          name="intent"
          value="update"
        >
          Enviar
        </LoadingButton>
      </div>
    </Form>
  );
}
