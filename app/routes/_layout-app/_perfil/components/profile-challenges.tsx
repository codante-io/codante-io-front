import { Link } from "react-router";
import type { ProfileChallengeSubmission } from "~/lib/models/user.server";

export default function ProfileChallenges({
  challenges,
  githubUser,
}: {
  challenges: ProfileChallengeSubmission[];
  githubUser: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold font-lexend dark:text-gray-50 mb-6">
        Mini Projetos Concluídos
      </h2>
      {challenges.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">
          Nenhum mini-projeto concluído ainda.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((submission) => (
            <Link
              key={submission.id}
              to={`/mini-projetos/${submission.challenge.slug}/submissoes/${githubUser}`}
              prefetch="intent"
              className="group overflow-hidden rounded-xl border border-background-200 dark:border-background-600 bg-background-50 dark:bg-background-800 hover:border-background-500 hover:shadow-lg transition-all"
            >
              <div className="aspect-video overflow-hidden bg-background-200 dark:bg-background-700">
                {submission.submission_image_url ? (
                  <img
                    src={submission.submission_image_url}
                    alt={submission.challenge.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <img
                      src={submission.challenge.image_url}
                      alt={submission.challenge.name}
                      className="h-20 object-contain"
                    />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 line-clamp-2">
                  {submission.challenge.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
