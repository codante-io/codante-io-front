import type { ChallengeUser, User } from "~/lib/models/user.server";

const stepsTemplate: Step[] = [
  {
    name: "Conecte o seu GitHub",
    description: "Para participar é necessário conectar com o GitHub.",
    button: "Conectar GitHub",
    status: "upcoming",
    intent: "connect-github",
  },
  {
    name: "Participe do Mini Projeto",
    description: "Participe. É 100% gratuito!",
    button: "Participar",
    status: "upcoming",
    intent: "join-challenge",
  },
  {
    name: "Participe da nossa comunidade",
    description:
      "Tire dúvidas e conecte-se com outras pessoas que estão fazendo esse Mini Projeto.",
    button: "Comunidade",
    status: "upcoming",
    intent: "join-discord",
    secondaryButton: "Pronto",
    secondaryIntent: "skip-discord",
  },
  {
    name: "Faça o fork do repositório",
    description:
      'Acesse o link do repositório, faça um fork e clique em "Verificar". Depois disso é só baixar o seu fork e começar a codar!',
    button: "Verificar Fork",
    status: "upcoming",
    intent: "verify-fork",
  },

  {
    name: "Submeta sua resolução",
    description:
      "Faça deploy do seu Mini Projeto e envie o link para aparecer na galeria de submissões.",
    button: "Submeter",
    status: "upcoming",
    intent: "submit-challenge",
  },
  {
    name: "Finalizar projeto",
    description:
      "Quando acabar o seu Mini Projeto é só marcar aqui como concluído.",
    button: "Marcar como concluído",
    status: "upcoming",
    intent: "finish-challenge",
  },
];

export type Step = {
  name: string;
  description: string;
  button: string;
  status: "upcoming" | "current" | "completed";
  intent: string;
  secondaryButton?: string;
  secondaryIntent?: string;
};

export function buildInitialSteps({
  user,
  challengeUser,
  repositorySlug,
}: {
  user: User | null;
  challengeUser?: ChallengeUser;
  repositorySlug?: string;
}) {
  const steps = structuredClone(stepsTemplate);

  // Se o usuário não estiver logado, o primeiro passo é conectar o GitHub.
  // Vamos retornar os passos com o primeiro passo como "current"
  if (!user) {
    steps[0].status = "current";
    return steps;
  }

  let currentStepIndex = 0;

  if (user.github_user) {
    let index = steps.findIndex((step) => step.intent === "connect-github");
    steps[index].status = "completed";
    currentStepIndex = index + 1;
  }

  if (challengeUser) {
    let index = steps.findIndex((step) => step.intent === "join-challenge");
    steps[index].status = "completed";
    currentStepIndex = index + 1;
  }

  if (user.discord_user || challengeUser?.joined_discord) {
    // só vamos marcar concluída essa etapa quando o usuário já tiver participado do mini projeto
    if (challengeUser) {
      let index = steps.findIndex((step) => step.intent === "join-discord");
      steps[index].status = "completed";
      currentStepIndex = index + 1;
    }
  }

  if (challengeUser?.fork_url) {
    let index = steps.findIndex((step) => step.intent === "verify-fork");
    steps[index].status = "completed";
    currentStepIndex = index + 1;
  }

  if (challengeUser?.submission_url) {
    let index = steps.findIndex((step) => step.intent === "submit-challenge");
    steps[index].status = "completed";
    currentStepIndex = index + 1;
  }

  if (challengeUser?.completed) {
    let index = steps.findIndex((step) => step.intent === "finish-challenge");
    steps[index].status = "completed";
    currentStepIndex = index + 1;
  }

  // Vamos marcar o index + 1 como current
  if (steps[currentStepIndex]) {
    steps[currentStepIndex].status = "current";
  }

  return steps;
}
