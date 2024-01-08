import { Form } from "@remix-run/react";
import { useFetcher } from "react-router-dom";
import type { ChallengeUser } from "~/lib/models/user.server";
import LoadingButton from "../form/loading-button";

export default function RequestCertificateButton({
  challengeUser,
  children,
  btnClass,
  status,
  isSuccessfulSubmission,
  disabled = false,
}: {
  challengeUser: ChallengeUser;
  children: React.ReactNode;
  btnClass?: string;
  status: "idle" | "loading" | "submitting";
  isSuccessfulSubmission: boolean;
  disabled?: boolean;
}) {
  const fetcher = useFetcher();

  async function handleSubmitCertificate() {
    if (challengeUser) {
      const certifiable_id = challengeUser.id;
      fetcher.submit(
        { intent: "requestCertificate", certifiable_id },
        { method: "post" },
      );
    }
  }
  return (
    <Form replace method="post">
      <LoadingButton
        isSuccessfulSubmission={isSuccessfulSubmission}
        status={status}
        className={btnClass}
        onClick={handleSubmitCertificate}
        type="submit"
        disabled={disabled}
      >
        {children}
      </LoadingButton>
    </Form>
  );
}
