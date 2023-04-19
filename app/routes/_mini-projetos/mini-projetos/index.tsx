import ChallengeCard from "~/components/cards/challenge-card";
import type { ChallengeCardInfo } from "~/models/challenge.server";

export default function Projects() {
  const challenge: ChallengeCardInfo = {
    id: "1",
    name: "Cronômetro para Escola",
    slug: "cronometro-para-escola",
    short_description:
      "Uma professora está buscando uma forma diferente de cronometrar seus intervalos. Crie um timer ou cronômetro",
    image_url: "/img/keyboard-icon.png",
    difficulty: 1,
    status: "soon",
    duration_in_minutes: "3h30",
    enrolled_users_count: 8,
    tags: ["Javascript", "React", "CSS"],
  };

  return (
    <main className="mx-auto container">
      <h1 className="text-4xl font-lexend mb-10 text-center mt-10">
        Mini Projetos
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
        <ChallengeCard challenge={challenge} />
        <ChallengeCard challenge={challenge} />
        <ChallengeCard challenge={challenge} />
        <ChallengeCard challenge={challenge} />
      </div>
    </main>
  );
}
