import { useOutletContext } from "@remix-run/react";
import type { Challenge, ChallengeSubmission } from "~/models/challenge.server";
import SubmissionCard from "../../components/submission-card";
import getUserRole from "~/utils/get-user-role";

export default function Submissions() {
  const { challengeSubmissions, challenge } = useOutletContext<{
    challengeSubmissions: ChallengeSubmission[];
    challenge: Challenge;
  }>();

  return (
    <>
      <div className="container">
        <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
          Galeria de Submissões
        </h1>
      </div>
      <div className="container grid justify-center gap-10 lg:grid-cols-3 md:grid-cols-2">
        {challengeSubmissions.map((submission) => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
            user={{
              role: getUserRole(submission) as "pro" | "admin",
              avatar_url: submission.user_avatar_url,
              name: submission.user_name,
            }}
            reactions={submission.reactions}
            size="medium"
            challengeSlug={challenge.slug}
          />
        ))}
      </div>
    </>
  );
}
