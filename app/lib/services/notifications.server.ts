import { createAxios } from "~/lib/services/axios.server";

const URL = "/send-discord-notification";
const CHANNEL = "notificacoes-site";

export async function sendDiscordAdminNotification(
  message: string,
): Promise<void> {
  const axios = await createAxios();

  return axios.post(URL, { message, channel: CHANNEL });
}
