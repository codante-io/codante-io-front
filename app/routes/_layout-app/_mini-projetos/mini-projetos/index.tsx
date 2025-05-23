import { useLoaderData } from "react-router";
import ChallengeCard from "~/components/ui/cards/challenge-card";
import type { ChallengeCard as ChallengeCardType } from "~/lib/models/challenge.server";
import { getChallenges } from "~/lib/models/challenge.server";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import FeaturedChallengeSection from "./featured-challenge-section";
import { Search, OrderBy, FiltersSheet } from "./components/filters";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  const title = "Mini Projetos | Codante.io";
  const description =
    "Mini Projetos de programação para você aprender praticando. Escolha um Mini Projeto para você se desafiar e aprender ainda mais.";
  const imageUrl = getOgGeneratorUrl("Mini Projetos");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://codante.io/mini-projetos" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:domain", content: "codante.io" },
    { name: "twitter:url", content: "https://codante.io/mini-projetos" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: "Mini Projetos Codante" },
  ];
};

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

  return {
    challenges,
    featuredChallenge,
    totalChallenges,
  };
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
      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
        <div className="flex flex-col gap-3 w-full md:w-auto">
          <Search placeholder="Pesquisar" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            Exibindo {challenges.length} de {totalChallenges} mini projetos
          </span>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <OrderBy />
          <FiltersSheet />
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-3 xl:grid-cols-4 auto-rows-min">
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
