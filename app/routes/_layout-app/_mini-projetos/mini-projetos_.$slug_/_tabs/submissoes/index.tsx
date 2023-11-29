import { useOutletContext } from "@remix-run/react";
import type { Challenge, ChallengeSubmission } from "~/models/challenge.server";
import SubmissionCard from "../../components/submission-card";

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
          <SubmissionCard
            key={challengeSubmissions[0].id}
            submission={{...challengeSubmissions[0], is_resolution: true}}
            user={{
              is_pro: challengeSubmissions[0].is_pro,
              avatar_url: challengeSubmissions[0].user_avatar_url,
              name: challengeSubmissions[0].user_name,
            }}
            reactions={challengeSubmissions[0].reactions}
            size="medium"
            slug={challenge.slug}
          />
        {challengeSubmissions.map((submission) => (
          <SubmissionCard
            key={submission.id}
            submission={submission}
            user={{
              is_pro: submission.is_pro,
              avatar_url: submission.user_avatar_url,
              name: submission.user_name,
            }}
            reactions={submission.reactions}
            size="medium"
          />
        ))}
      </div>
    </>
  );
}
