import type { AxiosResponse } from "axios";
import type { User } from "./user.server";
import { createAxios } from "~/lib/services/axios.server";

export type Comment = {
  id: string;
  user: User;
  comment: string;
  replying_to?: string;
  commentable_id: string;
  commentable_type: string;
  created_at_human: string;
};

export async function createComment(
  request: Request,
  commentableId: string,
  commentableType: string,
  comment: string,
  replyingTo: string | null = null,
): Promise<AxiosResponse<any, any> | { error?: string }> {
  const axios = await createAxios(request);

  return axios
    .post("/comments", {
      commentable_id: commentableId,
      commentable_type: commentableType,
      comment,
      replying_to: replyingTo,
    })
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Ocorreu um erro ao comentar. Por favor, tente novamente ou entre em contato.",
      };
    });
}

export async function updateComment(
  request: Request,
  commentId: string,
  comment: string,
): Promise<AxiosResponse<any, any> | { error?: string }> {
  const axios = await createAxios(request);

  return axios
    .put("/comments", {
      comment_id: commentId,
      comment,
    })
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Não foi possível editar o comentário.",
      };
    });
}

export async function deleteComment(
  request: Request,
  commentId: string,
): Promise<AxiosResponse<any, any> | { error?: string }> {
  const axios = await createAxios(request);

  return axios
    .delete("/comments", {
      data: {
        comment_id: commentId,
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      return {
        error:
          error?.response?.data?.message ||
          "Não foi possível deletar o comentário.",
      };
    });
}
