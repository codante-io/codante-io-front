import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import LoadingButton from "~/components/form/loading-button";

import type { Challenge, ChallengeSubmission } from "~/models/challenge.server";
import { submitChallenge } from "~/models/challenge.server";
import type { ChallengeUser } from "~/models/user.server";
import SubmissionCard from "../../components/submission-card";

//action submit challenge
export async function action({
  request,
  params,
}: {
  request: Request;
  params: { slug: string };
}) {
  let formData = await request.formData();
  let submissionUrl = formData.get("submission_url") as string;
  const metadata = getMetadataFromFormData(formData);

  return submitChallenge(request, params.slug, submissionUrl, metadata);
}

// Método criando para adicionar campos de metadata (rinha de frontend usou)
function getMetadataFromFormData(formData: FormData) {
  const metadata: { [key: string]: string } = {};

  for (let [key, value] of formData.entries()) {
    metadata[key] = value as string;
  }

  return metadata;
}

export default function MySubmission() {
  // get challengeUser from outlet context
  const { challengeUser, challenge, challengeSubmissions } = useOutletContext<{
    challengeUser: ChallengeUser;
    challenge: Challenge;
    challengeSubmissions: ChallengeSubmission[];
  }>();

  const userSubmission = challengeSubmissions.find(
    (submission) => submission.id === challengeUser.pivot.id
  );

  const errors = useActionData();
  const transition = useNavigation();

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  return (
    <div className="container">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Minha submissão
      </h1>
      {userSubmission ? (
        <SubmissionCard
          submission={{ id: userSubmission.id, ...challengeUser.pivot }}
          user={challengeUser}
          reactions={userSubmission?.reactions}
        />
      ) : (
        <Form method="POST">
          <div>
            <label
              htmlFor="submission_url"
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
                  name="submission_url"
                  defaultValue={challengeUser?.pivot?.submission_url}
                  id="submission_url"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-800 dark:text-gray-400 dark:placeholder:text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="https://mp-example.vercel.app/"
                />
              </div>
            </div>
            {/* Rinha de frontend usou esses campos */}
            {challenge.slug === "rinha-frontend" && <RinhaFormFields />}
          </div>
          <div className="mt-10">
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

function RinhaFormFields() {
  return (
    <>
      <label
        htmlFor="twitter_username"
        className="block mt-6 text-sm font-medium leading-6 text-gray-800 dark:text-white"
      >
        Seu @ do Twitter/X
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
          <input
            type="text"
            name="twitter_username"
            id="twitter_username"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-800 dark:text-gray-400 dark:placeholder:text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <label
        htmlFor="rinha_largest_filename"
        className="block mt-6 text-sm font-medium leading-6 text-gray-800 dark:text-white"
      >
        Qual o maior arquivo json que sua aplicação conseguiu carregar?
        <br />
        <span className="text-xs font-light text-gray-600 dark:text-gray-400">
          Selecione o nome do maior arquivo que a aplicação carrega sem quebrar
        </span>
      </label>
      <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset dark:ring-gray-600 ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600 sm:max-w-md">
          <select
            name="rinha_largest_filename"
            id="rinha_largest_filename"
            className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-800 dark:text-gray-400 dark:placeholder:text-gray-600 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
          >
            <option value="alltypes.json">alltypes.json</option>
            <option value="verysmall.json">verysmall.json</option>
            <option value="small.json">small.json</option>
            <option value="pokedex.json">pokedex.json</option>
            <option value="startwitharray.json">startwitharray.json</option>
            <option value="large.json">large.json</option>
            <option value="giant.json">giant.json</option>
            <option value="invalid.json">invalid.json</option>
            <option value="nullreference.json">nullreference.json</option>
          </select>
        </div>
      </div>
    </>
  );
}
