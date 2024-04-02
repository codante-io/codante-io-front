import axios from "axios";
import { currentToken } from "~/lib/services/auth.server";
import type { Reactions } from "./reactions.server";
import type { Tag } from "./tag.server";
import type { Instructor } from "./instructor.server";
import { environment } from "./environment";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  status: "draft" | "published" | "soon" | "archived";
  content: string;
  short_description: string;
  image_url: string;
  instructor: Instructor;
  reactions: Reactions;
  tags: Tag[];
};

export async function getPosts(request: Request) {
  const token = await currentToken({ request });
  const blogPosts: BlogPost[] = await axios
    .get(`${environment().API_HOST}/blog-posts`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data);
  return blogPosts;
}

export async function getPost(request: Request, slug: string) {
  const token = await currentToken({ request });
  const blogPost: BlogPost = await axios
    .get(`${environment().API_HOST}/blog-posts/${slug}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
  return blogPost;
}

export async function getPage(request: Request, slug: string) {
  const token = await currentToken({ request });
  const page: BlogPost = await axios
    .get(`${environment().API_HOST}/pages/${slug}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
  return page;
}
