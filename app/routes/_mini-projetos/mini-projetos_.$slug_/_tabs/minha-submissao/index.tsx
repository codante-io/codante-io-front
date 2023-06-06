import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import { FiExternalLink } from "react-icons/fi";
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
        <a
          href={challengeUser.pivot.submission_url}
          target="_blank"
          rel="noreferrer"
        >
          <div
            className="relative rounded-xl  border-[1.5px] border-background-200 dark:border-background-600
         hover:shadow-lg  dark:hover:shadow-lg transition-all group bg-background-800"
          >
            <button className="absolute inset-0 z-10 flex items-center justify-center w-24 h-20 p-4 m-auto transition-all opacity-0 rounded-2xl dark:bg-background-700 bg-background-200 group-hover:opacity-100">
              {" "}
              <FiExternalLink className="text-4xl text-gray-800 dark:text-white" />{" "}
            </button>
            <img
              src={challengeUser?.pivot?.submission_image_url}
              alt="Screenshot da aplicação submetida"
              className="w-full transition-all aspect-video group-hover:blur-sm group-hover:opacity-40 rounded-xl"
            />
          </div>
        </a>
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
