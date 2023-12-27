import type { ChallengeUser, User } from "~/models/user.server";

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
    secondaryButton: "Pular",
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

  if (steps[currentStepIndex]) {
    steps[currentStepIndex].status = "current";
  }

  // // O índice do passo atual é o inicial
  // let currentIndex = 0;

  // // Vamos setar o status do último passo completo de acordo com o estado do usuário
  // let condition: string;

  // if (challengeUser?.completed) {
  //   condition = "finish-challenge";
  // } else if (challengeUser?.submission_url) {
  //   condition = "submit-challenge";
  // } else if (challengeUser?.fork_url) {
  //   condition = "verify-fork";
  // } else if (challengeUser && user?.discord_user) {
  //   condition = "join-discord";
  // } else if (challengeUser) {
  //   condition = "join-challenge";
  // } else if (user?.github_user) {
  //   condition = "connect-github";
  // } else {
  //   condition = "start";
  // }

  // console.log("condition", condition);
  // currentIndex = steps.findIndex((step) => step.intent === condition);

  // console.log("currentIndex", currentIndex);
  // // Se o passo é verify fork, vamos atualizar para adicionar o link do repositório
  // if (condition === "verify-fork") {
  //   steps[
  //     currentIndex
  //   ].description = `Acesse o <a class="dark:text-blue-200 text-blue-600 font-bold" href="https://github.com/codante-io/${repositorySlug}" target="_blank">link do repositório</a>, faça um fork e clique em "Verificar". Depois disso é só baixar o seu fork e começar a codar!`;
  // }

  // // Vamos marcar os passos anteriores e o atual como "complete"
  // for (let i = 0; i <= currentIndex; i++) steps[i].status = "completed";

  // // vamos marcar o próximo passo como "current"
  // if (steps[currentIndex + 1]) steps[currentIndex + 1].status = "current";

  return steps;
}
