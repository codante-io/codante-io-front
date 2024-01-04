import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useOutletContext,
} from "@remix-run/react";
import LoadingButton from "~/components/features/form/loading-button";
import { useEffect } from "react";
import type { Challenge } from "~/lib/models/challenge.server";
import { submitChallenge } from "~/lib/models/challenge.server";
import type { ChallengeUser, User } from "~/lib/models/user.server";

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
  // const metadata = getMetadataFromFormData(formData);
  const intent = formData.get("intent");
  switch (intent) {
    case "createSubmission":
      return submitChallenge(request, params.slug, submissionUrl);
  }
}

export default function MySubmission() {
  // get challengeUser from outlet context
  const { challengeUser, challenge, challengeUsers, user } = useOutletContext<{
    challengeUser: ChallengeUser;
    challenge: Challenge;
    challengeUsers: ChallengeUser[];
    user: User;
  }>();

  const userSubmission = challengeUsers.find(
    (submission) => submission.user.id === user.id,
  );

  const errors = useActionData();
  const transition = useNavigation();

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  const navigate = useNavigate();

  useEffect(() => {
    if (userSubmission) {
      navigate(
        `/mini-projetos/${challenge.slug}/submissoes/${userSubmission.user.github_user}`,
      );
    }
  }, [challenge.slug, navigate, userSubmission]);

  return (
    <div className="container">
      {!userSubmission && (
        <SubmissionForm
          challengeUser={challengeUser}
          status={status}
          isSuccessfulSubmission={isSuccessfulSubmission}
          challenge={challenge}
        />
      )}
    </div>
  );
}

function SubmissionForm({
  challengeUser,
  status,
  isSuccessfulSubmission,
  challenge,
}: {
  challengeUser: ChallengeUser;
  status: "idle" | "loading" | "submitting";
  isSuccessfulSubmission: boolean;
  challenge: Challenge;
}) {
  return (
    <>
      <h1 className="flex items-center mb-4 md:mb-10 text-2xl font-semibold font-lexend text-brand">
        Submeter solução
      </h1>
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
                defaultValue={challengeUser?.submission_url}
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
            value="createSubmission"
          >
            Enviar
          </LoadingButton>
        </div>
      </Form>
    </>
  );
}
