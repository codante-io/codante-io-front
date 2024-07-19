import type { AxiosResponse } from "axios";
import { createAxios } from "~/lib/services/axios.server";

export type AllowedReaction = "like" | "exploding-head" | "rocket" | "fire";

export type ReactionCount = {
  reaction: AllowedReaction;
  count: number;
};

export type Reactions = {
  reaction_counts: ReactionCount[];
  user_reactions: AllowedReaction[];
};

export async function react(
  request: Request,
  reactableId: string,
  reactableType: string,
  reaction: AllowedReaction,
): Promise<AxiosResponse<any, any> | { error?: string }> {
  const axios = await createAxios(request);
  return axios
    .post("/reactions", {
      reactable_id: reactableId,
      reactable_type: reactableType,
      reaction,
    })
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro ao reagir. Por favor, tente novamente ou entre em contato.",
      };
    });
}
