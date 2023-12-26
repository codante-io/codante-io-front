import { Form } from "@remix-run/react";
import { useFetcher } from "react-router-dom";
import type { ChallengeUser } from "~/models/user.server";

export default function RequestCertificateButton({
  challengeUser,
  sourceType,
  sourceId,
}: {
  challengeUser: ChallengeUser;
  sourceType: "challenge" | "workshop";
  sourceId: string;
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
      <button
        className="p-2 bg-blue-500 rounded-lg text-white"
        onClick={handleSubmitCertificate}
        type="submit"
      >
        Solicitar certificado
      </button>
    </Form>
  );
}
