import type { ChallengeUser, User } from "~/lib/models/user.server";

const stepArr = [
  "connect-github",
  "join-challenge",
  "join-discord",
  "verify-fork",
  "submit-challenge",
  "finish-challenge",
] as const;

export type UserStep = {
  id: (typeof stepArr)[number];
  status: "completed" | "current" | "upcoming";
};

export type UserStepsIds = UserStep["id"];
export type StepStatus = UserStep["status"];

export function userSteps(user: User | null, challengeUser?: ChallengeUser) {
  const steps: UserStep[] = stepArr.map((step) => {
    return {
      id: step,
      status: "upcoming",
    };
  });

  // Se não há user, o primeiro passo é conectar o GitHub
  if (!user) {
    steps.find((step) => step.id === "connect-github")!.status = "current";
  }

  // Se o usuário já conectou o GitHub, o próximo passo é participar do mini projeto
  if (user?.github_user) {
    steps.find((step) => step.id === "connect-github")!.status = "completed";
    steps.find((step) => step.id === "join-challenge")!.status = "current";
  }

  // Se o usuário já participou do mini projeto, o próximo passo é conectar com a comunidade
  if (challengeUser) {
    steps.find((step) => step.id === "join-challenge")!.status = "completed";
    steps.find((step) => step.id === "join-discord")!.status = "current";
  }

  // Se o usuário já conectou com a comunidade, o próximo passo é verificar o fork
  if (user?.discord_user || challengeUser?.joined_discord) {
    steps.find((step) => step.id === "join-discord")!.status = "completed";
    steps.find((step) => step.id === "verify-fork")!.status = "current";
  }

  // Se o usuário já verificou o fork, o próximo passo é submeter a resolução
  if (challengeUser?.fork_url || challengeUser?.is_solution) {
    steps.find((step) => step.id === "verify-fork")!.status = "completed";
    steps.find((step) => step.id === "submit-challenge")!.status = "current";
  }

  // Se o usuário já submeteu a resolução, o próximo passo é finalizar o projeto
  if (challengeUser?.submission_url) {
    steps.find((step) => step.id === "submit-challenge")!.status = "completed";
    steps.find((step) => step.id === "finish-challenge")!.status = "current";
  }

  // Se o usuário já finalizou o projeto, todos os passos estão completos
  if (challengeUser?.completed) {
    steps.find((step) => step.id === "finish-challenge")!.status = "completed";
  }

  return steps;
}
