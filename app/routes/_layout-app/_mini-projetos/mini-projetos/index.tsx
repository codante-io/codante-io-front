import { json } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import { getChallenges } from "~/lib/models/challenge.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { metaV1 } from "@remix-run/v1-meta";
import MainTechFilter from "~/components/features/main-tech-filter/main-tech-filter";
import FeaturedChallengeSection from "./featured-challenge-section";

export function meta(args: any) {
  const title = "Mini Projetos | Codante.io";
  const description =
    "Mini Projetos de programação para você aprender praticando. Escolha um Mini Projeto para você se desafiar e aprender ainda mais.";
  const imageUrl = getOgGeneratorUrl("Mini Projetos");

  return metaV1(args, {
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
  });
}

export async function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const tech = url.searchParams.get("tecnologia") ?? "";

  const { challenges, featuredChallenge } = await getChallenges({
    tech,
    request,
  });

  return json({
    challenges,
    featuredChallenge,
  });
}

export default function ChallengesIndex() {
  const { challenges, featuredChallenge } = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const selectedTechs = searchParams.get("tecnologia");

  return (
    <main className="container mx-auto">
      <h1 className="mb-10 text-3xl lg:text-4xl font-lexend text-center">
        Mini Projetos
      </h1>
      <FeaturedChallengeSection featuredChallenge={featuredChallenge} />
      <MainTechFilter
        selectedTechs={selectedTechs}
        baseUrl="/mini-projetos"
        techsToDisplay={[
          "nextjs",
          "tailwindcss",
          "react",
          "fundamentos",
          "hackathon",
        ]}
      />
      <section className="mt-16 flex flex-col gap-20">
        <div className="grid grid-cols-1 gap-0 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-min">
          {challenges.map((challenge: ChallengeCardType) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      </section>
    </main>
  );
}
