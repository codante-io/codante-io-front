import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChallengeCard from "~/components/cards/challenge-card";
import {
  getChallenges,
  type ChallengeCardInfo,
} from "~/models/challenge.server";

export async function loader({ request }: { request: Request }) {
  return json({
    challenges: await getChallenges(),
  });
}

export function headers() {
  return {
    "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
  };
}

export default function Projects() {
  const { challenges } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <h1 className="mb-10 text-4xl text-center font-lexend">Mini Projetos</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 ">
        {challenges.map((challenge: ChallengeCardInfo) => (
          <div key={challenge.slug} className="mx-auto">
            <ChallengeCard challenge={challenge} />
          </div>
        ))}
      </div>
    </main>
  );
}
