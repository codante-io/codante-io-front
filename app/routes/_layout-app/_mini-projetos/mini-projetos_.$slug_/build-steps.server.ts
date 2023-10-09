const initialSteps = [
  {
    name: "Conecte o seu GitHub",
    description:
      "Para participar do Mini Projeto você precisa conectar a sua conta do GitHub.",
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
    name: "Faça o fork do repositório",
    description:
      'Acesse o link do repositório, faça um fork e clique em "Verificar". Depois disso é só baixar o seu fork e começar a codar!',
    button: "Verificar Fork",
    status: "upcoming",
    intent: "verify-fork",
  },
  {
    name: "Participe da nossa comunidade",
    description:
      "Acesse nossa comunidade do Discord para tirar dúvidas e se conectar com outras pessoas que estão fazendo o Mini Projeto.",
    button: "Feito!",
    status: "upcoming",
    intent: "join-discord",
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

const initialStepsRinha = [
  {
    name: "Conecte o seu GitHub",
    description:
      "Para participar do projeto você precisa conectar a sua conta do GitHub.",
    button: "Conectar GitHub",
    status: "upcoming",
    intent: "connect-github",
  },
  {
    name: "Participe do projeto",
    description: "Registre sua participação aqui.",
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
    name: "Participe da nossa comunidade",
    description:
      "Siga nossa conta no Twitter/X para se conectar com outras pessoas que estão participando.",
    button: "Feito!",
    status: "upcoming",
    intent: "join-discord",
  },
  {
    name: "Submeta sua resolução",
    description:
      "Faça deploy do seu projeto e envie o link para aparecer na galeria de submissões.",
    button: "Submeter",
    status: "upcoming",
    intent: "submit-challenge",
  },
  {
    name: "Finalizar projeto",
    description: "Quando acabar o seu projeto é só marcar como concluído.",
    button: "Marcar como concluído",
    status: "upcoming",
    intent: "finish-challenge",
  },
];

const DISCORD_INVITE_URL = "https://discord.com/invite/fmVw468ZMR";
const TWITTER_URL = "https://twitter.com/rinhafront";

export function buildInitialSteps({
  user,
  challengeUser,
  repositorySlug,

  // @rinha
  isRinha,
}: {
  user?: any;
  challengeUser?: any;
  repositorySlug?: string;

  // @rinha
  isRinha?: boolean;
}) {
  const initialStepsClone = isRinha
    ? structuredClone(initialStepsRinha)
    : structuredClone(initialSteps);

  let index = 0;

  if (!user) {
    initialStepsClone[index].status = "current";
    return initialStepsClone;
  }

  if (challengeUser?.pivot.completed) {
    index = 6;
  } else if (challengeUser?.pivot.submission_url) {
    index = 5;
  } else if (challengeUser?.pivot.joined_discord) {
    index = 4;
  } else if (challengeUser?.pivot.fork_url?.length > 0) {
    index = 3;
    initialStepsClone[index].description = isRinha
      ? `Siga <a class="dark:text-blue-200 text-blue-600 font-bold" href="${TWITTER_URL}" target="_blank">nossa conta no Twitter/X</a> para se conectar com outras pessoas que estão participando.`
      : `Acesse <a class="dark:text-blue-200 text-blue-600 font-bold" href="${DISCORD_INVITE_URL}" target="_blank">nossa comunidade no Discord</a> para tirar dúvidas e se conectar com outras pessoas que estão fazendo o Mini Projeto.`;
  } else if (challengeUser) {
    index = 2;
    initialStepsClone[
      index
    ].description = `Acesse o <a class="dark:text-blue-200 text-blue-600 font-bold" href="https://github.com/codante-io/${repositorySlug}" target="_blank">link do repositório</a>, faça um fork e clique em "Verificar". Depois disso é só baixar o seu fork e começar a codar!`;
  } else if (user?.github_id?.length > 0) {
    index = 1;
  } else {
    index = 0;
  }

  for (let i = 0; i < index; i++) initialStepsClone[i].status = "complete";
  if (index < 6) initialStepsClone[index].status = "current";

  return initialStepsClone;
}
