import { Form } from "@remix-run/react";
import { useFetcher } from "react-router-dom";
import type { ChallengeUser } from "~/models/user.server";
import LoadingButton from "../form/loading-button";

export default function RequestCertificateButton({
  challengeUser,
  sourceType,
  sourceId,
  children,
  btnClass,
  status,
  isSuccessfulSubmission,
  disabled = false,
}: {
  challengeUser: ChallengeUser;
  sourceType: "challenge" | "workshop";
  sourceId: string;
  children: React.ReactNode;
  btnClass?: string;
  status: "idle" | "loading" | "submitting";
  isSuccessfulSubmission: boolean;
  disabled?: boolean;
}) {
  const fetcher = useFetcher();

  async function handleSubmitCertificate() {
    if (challengeUser) {
      const user_id = challengeUser.user_id;
      const source_type = sourceType;
      const source_id = sourceId;
      fetcher.submit(
        { intent: "requestCertificate", user_id, source_type, source_id },
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
