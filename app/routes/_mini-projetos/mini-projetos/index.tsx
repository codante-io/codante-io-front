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

// export function headers() {
//   return {
//     "Cache-Control": "s-maxage=1, stale-while-revalidate=59",
//   };
// }

export default function Projects() {
  const { challenges } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto">
      <h1 className="mb-10 text-4xl text-center font-lexend">Mini Projetos</h1>
      {/* <div className="text-gray-50"> text-gray-50</div>
      <div className="text-slate-50"> text-slate-50</div>
      <div className="text-slate-200"> text-slate-200</div>

      <div className="text-gray-300">text-gray-300</div>
      <div className="text-slate-300"> text-slate-300</div>
      <div className="text-zinc-300"> text-zinc-300</div>

      <div className="text-gray-400"> text-gray-400</div>
      <div className="text-slate-400"> text-slate-400</div>
      <div className="text-slate-500"> text-slate-500</div>
      <div className="text-zinc-400"> text-zinc-400</div>

      <div className="text-white"> text-white</div> */}

      <div className="text-zinc-50"> text-zinc-50</div>
      <div className="text-zinc-200"> text-zinc-300</div>
      <div className="text-zinc-400"> text-zinc-400</div>
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
