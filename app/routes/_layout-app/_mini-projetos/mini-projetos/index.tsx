import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChallengeCard from "~/components/cards/challenge-card";
import {
  getChallenges,
  type ChallengeCardInfo,
} from "~/models/challenge.server";
import { getOgGeneratorUrl } from "~/utils/path-utils";

export function meta() {
  const title = "Mini Projetos | Codante.io";
  const description =
    "Mini Projetos de programação para você aprender praticando. Escolha um Mini Projeto para você se desafiar e aprender ainda mais.";
  const imageUrl = getOgGeneratorUrl("Mini Projetos");

  return {
    title: title,
    description: description,
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "og:type": "website",
    "og:url": `https://codante.io/mini-projetos`,

    "twitter:card": "summary_large_image",
    "twitter:domain": "codante.io",
    "twitter:url": `https://codante.io/mini-projetos`,
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
    "twitter:image:alt": "Mini Projetos Codante",
  };
}

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
