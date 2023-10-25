import { useOutletContext } from "@remix-run/react";
// import ReactionsButton from "~/components/reactions-button";
// import UserAvatar from "~/components/user-avatar";

import type { ChallengeSubmission } from "~/models/challenge.server";
import SubmissionCard from "../../components/submission-card";

export default function Submissions() {
  const { challengeSubmissions } = useOutletContext<{
    challengeSubmissions: ChallengeSubmission[];
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
            submissionUrl={submission.submission_url}
            githubUrl={submission.fork_url}
            submissionImage={submission.submission_image_url}
            user={{
              is_pro: submission.is_pro,
              avatar_url: submission.user_avatar_url,
              name: submission.user_name,
            }}
            reactions={submission.reactions}
            submissionId={submission.id}
          />
        ))}
      </div>
    </>
  );
}
