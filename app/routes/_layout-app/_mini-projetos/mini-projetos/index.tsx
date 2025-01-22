import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import { getChallenges } from "~/lib/models/challenge.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { metaV1 } from "@remix-run/v1-meta";
import FeaturedChallengeSection from "./featured-challenge-section";
import { Search, OrderBy, FiltersSheet } from "./components/filters";

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
  const tecnologia = url.searchParams.get("tecnologia") ?? "";
  const dificuldade = url.searchParams.get("dificuldade") ?? "";
  const q = url.searchParams.get("q") ?? "";
  const gratuito = url.searchParams.get("gratuito") ?? "";
  const ordenacao = url.searchParams.get("ordenacao") ?? "";
  const { challenges, featuredChallenge, totalChallenges } =
    await getChallenges({
      filters: {
        tecnologia,
        dificuldade,
        q,
        gratuito,
        ordenacao,
      },
      request,
    });

  return json({
    challenges,
    featuredChallenge,
    totalChallenges,
  });
}

export default function ChallengesIndex() {
  const { challenges, featuredChallenge, totalChallenges } =
    useLoaderData<typeof loader>();

  function getChallengesGroupedByTech() {
    const challengesGroupedByTech = challenges.reduce<
      Record<string, ChallengeCardType[]>
    >((acc, challenge) => {
      const tech = challenge.main_technology.name;
      acc[tech] = acc[tech] || [];
      acc[tech].push(challenge);
      return acc;
    }, {});

    return Object.entries(challengesGroupedByTech).sort(
      (a, b) => techOrder.indexOf(a[0]) - techOrder.indexOf(b[0]),
    );
  }

  const techOrder = [
    "Next.js",
    "TailwindCSS",
    "React",
    "Fundamentos",
    "Hackathon",
  ];

  return (
    <main className="container mx-auto">
      <h1 className="mb-10 text-3xl text-center lg:text-4xl font-lexend">
        Mini Projetos
      </h1>
      {featuredChallenge && (
        <FeaturedChallengeSection featuredChallenge={featuredChallenge} />
      )}
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-3">
          <Search placeholder="Pesquisar" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Exibindo {challenges.length} de {totalChallenges} mini projetos
          </span>
        </div>
        <div className="flex gap-4">
          <FiltersSheet />
          <OrderBy />
        </div>
      </div>
      {challenges.length > 0 && (
        <section className="flex flex-col gap-20 mt-16">
          {getChallengesGroupedByTech().map(([tech, groupedChallenges]) => (
            <div key={tech}>
              <h2 className="text-2xl mb-4 flex items-center gap-2 font-light">
                <img
                  src={groupedChallenges[0].main_technology.image_url}
                  alt={tech}
                  className="w-8 h-8"
                />
                {tech}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 auto-rows-min">
                {groupedChallenges.map((challenge: ChallengeCardType) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}
