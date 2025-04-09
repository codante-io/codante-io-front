import { Link } from "@remix-run/react";
import { TiArrowBackOutline } from "react-icons/ti";
import type { BlogPost } from "~/lib/models/blog-post.server";
import ReactionsButton from "../../reactions/reactions-button";
import MarkdownRenderer from "../../../ui/markdown-renderer";

export default function Post({
  blogPost,
  withBreadcrumbs = true,
  withReactions = true,
  withAuthor = true,
}: {
  blogPost: BlogPost;
  withBreadcrumbs?: boolean;
  withReactions?: boolean;
  withAuthor?: boolean;
}) {
  return (
    <div className={`max-w-3xl w-full`}>
      {withBreadcrumbs && <BlogBreadcrumbs postTitle={blogPost.title} />}
      <div className={`prose lg:prose-lg dark:prose-invert`}>
        <h1>{blogPost.title}</h1>
        <p className="lead">{blogPost.short_description}</p>
        <div className="flex items-center justify-between">
          {withReactions && (
            <ReactionsButton
              reactableId={blogPost.id}
              reactableType="BlogPost"
              reactions={blogPost.reactions}
              className="pl-0"
              side="right"
            />
          )}

          {withAuthor && (
            <div className="flex items-center gap-4 max-h-8">
              <img
                src={blogPost.instructor.avatar_url}
                alt=""
                className="w-8 h-8 m-0 rounded-full"
              />
              <span className="text-sm">{blogPost.instructor?.name}</span>
            </div>
          )}
        </div>
      </div>
      <MarkdownRenderer markdown={blogPost.content} />
    </div>
  );
}

function BlogBreadcrumbs({ postTitle }: { postTitle?: string }) {
  return (
    <>
      <div className="items-center hidden space-x-2 text-sm text-gray-500 md:flex dark:text-gray-400">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span className="text-brand">{`>`}</span>
        <Link to="/blog" className="hover:underline ">
          Blog
        </Link>
        <span className="text-brand">{`>`}</span>
        <span className="text-gray-700 dark:text-white">{postTitle}</span>
      </div>
      {/* Botão voltar (mobile) */}
      <Link
        to="/blog"
        className="inline-block p-2 text-sm text-gray-500 transition-colors rounded-xs md:invisible dark:hover:text-white dark:hover:bg-gray-800"
      >
        <div className="flex items-center gap-2 ">
          <TiArrowBackOutline />
          Voltar
        </div>
      </Link>
    </>
  );
}

export function BlogTableOfContents({
  headers,
  activeId,
}: {
  headers: { title: string; slug: string; level: number }[];
  activeId: string | undefined;
}) {
  return (
    <div className="toc relative hidden md:block">
      <div className="sticky top-2 max-w-xs w-52">
        {/* <h3 className="mb-3">Conteúdo</h3> */}
        <ul className="">
          {headers.map((item) => (
            <li
              key={item.slug}
              className={`text-sm py-1.5 px-1  ${
                item.slug === activeId
                  ? "dark:text-white font-bold"
                  : "font-light text-gray-600 dark:text-gray-400"
              }`}
              style={{ marginLeft: `${item.level * 20 - 40}px` }}
            >
              <Link to={`#${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
