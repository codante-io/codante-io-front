import type { ChallengeUser, User } from "~/models/user.server";

const initialSteps: Step[] = [
  {
    name: "Conecte o seu GitHub",
    description:
      "Para participar do Mini Projeto você precisa conectar a sua conta do GitHub.",
    button: "Conectar GitHub",
    status: "upcoming",
    intent: "connect-github",
  },
  {
    name: "Participe da nossa comunidade",
    description:
      "Acesse nossa comunidade do Discord para tirar dúvidas e se conectar com outras pessoas que estão fazendo o Mini Projeto.",
    button: "Comunidade",
    status: "upcoming",
    intent: "join-discord",
    secondaryButton: "Pular",
    secondaryIntent: "join-discord",
  },
  {
    name: "Participe do Mini Projeto",
    description: "Participe. É 100% gratuito!",
    button: "Participar",
    status: "upcoming",
    intent: "join-challenge",
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
    description: "Quando acabar o seu Mini Projeto é só marcar como concluído.",
    button: "Marcar como concluído",
    status: "upcoming",
    intent: "finish-challenge",
  },
];

export type Step = {
  name: string;
  description: string;
  button: string;
  status: "upcoming" | "current" | "complete";
  intent: string;
  secondaryButton?: string;
  secondaryIntent?: string;
};

const DISCORD_INVITE_URL = "https://discord.com/invite/fmVw468ZMR";

export function buildInitialSteps({
  user,
  challengeUser,
  repositorySlug,
}: {
  user: User | null;
  challengeUser?: ChallengeUser;
  repositorySlug?: string;
}) {
  const initialStepsClone = structuredClone(initialSteps);

  console.log(challengeUser)
  let index = 0;

  if (!user) {
    initialStepsClone[index].status = "current";
    return initialStepsClone;
  }

  if (challengeUser?.completed) {
    index = initialStepsClone.findIndex((step) => step.intent === "finish-challenge");
  } else if (challengeUser?.submission_url) {
    index = initialStepsClone.findIndex((step) => step.intent === "submit-challenge");
  } else if (challengeUser?.joined_discord) {
    index = initialStepsClone.findIndex((step) => step.intent === "join-discord");
  } else if (challengeUser?.fork_url) {
    index = initialStepsClone.findIndex((step) => step.intent === "verify-fork");
    initialStepsClone[
      index
    ].description = `Acesse <a class="dark:text-blue-200 text-blue-600 font-bold" href="${DISCORD_INVITE_URL}" target="_blank">nossa comunidade no Discord</a> para tirar dúvidas e se conectar com outras pessoas que estão fazendo o Mini Projeto.`;
  } else if (challengeUser) {
    index = initialStepsClone.findIndex((step) => step.intent === "join-challenge");
    initialStepsClone[
      index
    ].description = `Acesse o <a class="dark:text-blue-200 text-blue-600 font-bold" href="https://github.com/codante-io/${repositorySlug}" target="_blank">link do repositório</a>, faça um fork e clique em "Verificar". Depois disso é só baixar o seu fork e começar a codar!`;
  } else if (user?.github_id?.length > 0) {
    index = initialStepsClone.findIndex((step) => step.intent === "join-challenge");
  } else {
    index = initialStepsClone.findIndex((step) => step.intent === "connect-github");
  }

  for (let i = 0; i < index; i++) initialStepsClone[i].status = "complete";
  if (index < initialStepsClone.findIndex((step) => step.intent === "connect-github")) initialStepsClone[index].status = "current";

  return initialStepsClone;
}
