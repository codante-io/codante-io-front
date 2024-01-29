import type { AxiosResponse } from "axios";
import axios from "axios";
import { currentToken } from "~/lib/services/auth.server";
import { environment } from "./environment.server";
import type { User } from "./user.server";

export type Comment = {
  id: string;
  user: User;
  comment: string;
  replying_to?: string;
  commentable_id: string;
  commentable_type: string;
};

export async function createComment(
  request: Request,
  commentableId: string,
  commentableType: string,
  comment: string,
  replyingTo: string | null = null,
): Promise<AxiosResponse<any, any> | { error?: string }> {
  let token = await currentToken({ request });

  return axios
    .post(
      `${environment().API_HOST}/comments`,
      {
        commentable_id: commentableId,
        commentable_type: commentableType,
        comment,
        replying_to: replyingTo,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
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
  let token = await currentToken({ request });

  return axios
    .put(
      `${environment().API_HOST}/comments`,
      {
        comment_id: commentId,
        comment,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    )
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
  let token = await currentToken({ request });

  return axios
    .delete(`${environment().API_HOST}/comments`, {
      data: {
        comment_id: commentId,
      },
      headers: {
        Authorization: "Bearer " + token,
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
