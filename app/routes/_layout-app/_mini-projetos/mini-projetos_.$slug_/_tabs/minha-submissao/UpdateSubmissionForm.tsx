import { Form, useActionData, useNavigation } from "@remix-run/react";
import type { ChallengeUser } from "~/models/user.server";
import LoadingButton from "~/components/form/loading-button";
import { useState } from "react";
import Button from "~/components/form/button";

export default function UpdateSubmissionForm({
  challengeUser,
  showEditForm,
}: {
  challengeUser: ChallengeUser;
  showEditForm?: () => void;
}) {
  const [cancelSubmition, setCancelSubmition] = useState(false);
  const errors = useActionData();
  const transition = useNavigation();

  const handleCancelBtn = () => {
    if (showEditForm) {
      showEditForm();
      setCancelSubmition(!cancelSubmition);
    }
  };

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  return (
    <Form method="PUT">
      <div>
        <label
          htmlFor="submission_url"
          className="block text-sm font-medium leading-6 text-gray-800 dark:text-white"
        >
          Atualize o link da sua aplicação
        </label>
        <div className="mt-2">
          <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
            <input
              type="text"
              name="submission_url"
              defaultValue={challengeUser?.pivot?.submission_url}
              id="submission_url"
              className="rounded block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-800 dark:text-gray-400 dark:placeholder:text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="https://mp-example.vercel.app/"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-x-3">
        <LoadingButton
          type="submit"
          className="relative transition duration-200"
          status={status}
          isSuccessfulSubmission={isSuccessfulSubmission}
          name="intent"
          value="updateSubmission"
        >
          Enviar
        </LoadingButton>
        <Button
          className=" border border-gray-300  dark:border-gray-600 hover:border-red-400 dark:hover:border-red-400"
          type="button"
          onClick={handleCancelBtn}
          textColorClass="text-gray dark:text-gray-300"
          bgClass="bg-transparent"
        >
          Cancelar
        </Button>
      </div>
    </Form>
  );
}
