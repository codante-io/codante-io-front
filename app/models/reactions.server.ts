import axios, { AxiosResponse } from "axios";
import { currentToken } from "~/services/auth.server";

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
  reaction: AllowedReaction
): Promise<AxiosResponse<any, any> | { error?: string }> {
  let token = await currentToken({ request });

  return axios
    .post(
      `${process.env.API_HOST}/reactions`,
      {
        reactable_id: reactableId,
        reactable_type: reactableType,
        reaction,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    )
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro ao reagir. Por favor, tente novamente ou entre em contato.",
      };
    });
}
