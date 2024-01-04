import { useOutletContext } from "@remix-run/react";
import type { Challenge } from "~/lib/models/challenge.server";
import SubmissionCard from "../../components/submission-card";
import type { ChallengeUser } from "~/lib/models/user.server";

export default function Submissions() {
  const { challengeUsers, challenge } = useOutletContext<{
    challengeUsers: ChallengeUser[];
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
        {challengeUsers.map((challengeUser) => (
          <SubmissionCard
            key={challengeUser.id}
            challengeUser={challengeUser}
            size="medium"
            challengeSlug={challenge.slug}
          />
        ))}
      </div>
    </>
  );
}
