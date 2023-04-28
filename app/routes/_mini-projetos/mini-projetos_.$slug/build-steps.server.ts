import axios from "axios";

const initialSteps = [
  {
    name: "Conecte o seu GitHub",
    description:
      "Para participar do mini projeto você precisa conectar a sua conta do GitHub.",
    button: "Conectar GitHub",
    status: "upcoming",
    intent: "connect-github",
  },
  {
    name: "Participe do mini projeto",
    description:
      "Clique aqui para registrar sua participação nesse projeto. É 100% gratuito!",
    button: "Participar",
    status: "upcoming",
    intent: "join-challenge",
  },
  {
    name: "Faça o fork do repositório",
    description:
      'Acesse o link do repositório, faça um fork e clique em "Verificar". Depois disso é só baixar o seu fork e começar a codar!',
    button: "Verificar fork",
    status: "upcoming",
    intent: "verify-fork",
  },
  {
    name: "Participe da nossa comunidade do Discord",
    description:
      "Acesse nossa comunidade do Discord para tirar dúvidas e se conectar com outras pessoas que estão fazendo o mini projeto.",
    button: "Marcar como concluído",
    status: "upcoming",
    intent: "join-discord",
  },
  {
    name: "Finalizar projeto",
    description: "Quando acabar o seu mini projeto é só marcar como concluído.",
    button: "Marcar como concluído",
    status: "upcoming",
    intent: "finish-challenge",
  },
];
const DISCORD_INVITE_URL = "";
export function buildInitialSteps({
  user,
  challengeUser,
  repositoryUrl,
}: {
  user?: any;
  challengeUser?: any;
  repositoryUrl?: string;
}) {
  let index = 0;
  if (challengeUser?.pivot.completed) {
    index = 5;
  } else if (challengeUser?.pivot.joined_discord) {
    index = 4;
  } else if (challengeUser?.pivot.fork_url?.length > 0) {
    index = 3;
    initialSteps[
      index
    ].description = `Acesse <a class="dark:text-blue-200 text-blue-600 font-bold" href="${DISCORD_INVITE_URL}" target="_blank">nossa comunidade no Discord</a> para tirar dúvidas e se conectar com outras pessoas que estão fazendo o mini projeto.`;
  } else if (challengeUser) {
    index = 2;
    initialSteps[
      index
    ].description = `Acesse o <a class="dark:text-blue-200 text-blue-600 font-bold" href="${repositoryUrl}" target="_blank">link do repositório</a>, faça um fork e clique em "Verificar". Depois disso é só baixar o seu fork e começar a codar!`;
  } else if (user?.github_id?.length > 0) {
    index = 1;
  } else {
    index = 0;
  }

  for (let i = 0; i < index; i++) initialSteps[i].status = "complete";
  if (index < 5) initialSteps[index].status = "current";

  return initialSteps;
}
