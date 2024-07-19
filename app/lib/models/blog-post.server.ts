import type { Reactions } from "./reactions.server";
import type { Tag } from "./tag.server";
import type { Instructor } from "./instructor.server";
import { createAxios } from "~/lib/services/axios.server";

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
  const axios = await createAxios(request);

  const blogPosts: BlogPost[] = await axios
    .get("/blog-posts")
    .then((res) => res.data.data);
  return blogPosts;
}

export async function getPost(request: Request, slug: string) {
  const axios = await createAxios(request);

  const blogPost: BlogPost = await axios
    .get(`/blog-posts/${slug}`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
  return blogPost;
}

export async function getPage(request: Request, slug: string) {
  const axios = await createAxios(request);
  const page: BlogPost = await axios
    .get(`/pages/${slug}`)
    .then((res) => res.data.data)
    .catch((e) => {
      if (e.response.status === 404) {
        return null;
      }
    });
  return page;
}
