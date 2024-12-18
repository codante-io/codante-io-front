import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import {
  joinChallenge,
  submitChallenge,
  submitChallengeWithoutDeploy,
  updateChallengeCompleted,
  verifyAndUpdateForkURL,
} from "~/lib/models/challenge.server";
import { logout } from "~/lib/services/auth.server";
import { abort404 } from "~/lib/utils/responses.server";

export async function action({ request }: { request: any }) {
  // const lessonId = params.lessonId;

  const formData = await request.formData();

  const intent = formData.get("intent") as string;
  const redirectTo = formData.get("redirectTo") as string;
  const slug = formData.get("slug");

  switch (intent) {
    case "connect-github":
      return logout({
        request,
        redirectTo: `/login?redirectTo=${redirectTo}`,
      });
    case "finish-challenge":
      return updateChallengeCompleted({
        slug,
        completed: true,
        request,
      });
    case "join-challenge":
      const lala = await joinChallenge({ request, slug }); //eslint-disable-line
      return lala;
    case "verify-fork":
      return verifyAndUpdateForkURL({
        slug,
        request,
      });

    case "submit-challenge":
      // get the url from the form
      //eslint-disable-next-line
      return await submitChallenge(
        request,
        slug,
        formData.get("submission-url") as string,
      ); //eslint-disable-line
    case "submit-challenge-without-deploy":
      //eslint-disable-next-line
      return await submitChallengeWithoutDeploy(
        request,
        slug,
        formData.get("submission_image"),
      );
    default:
      return null;
  }
}

export async function loader() {
  return abort404();
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return <Error500 error={error} />;
}
