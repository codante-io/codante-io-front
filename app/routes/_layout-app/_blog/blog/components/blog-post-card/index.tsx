import { Link } from "@remix-run/react";
import ReactionsButton from "~/components/reactions-button";
import type { BlogPost } from "~/models/blog-post.server";

export default function BlogPostCard({ blogPost }: { blogPost: BlogPost }) {
  return (
    <Link
      to={`/blog/${blogPost.slug}`}
      className="relative overflow-hidden min-h-[300px] group/border rounded-xl p-1"
    >
      <article className="absolute z-10 flex flex-col justify-between p-6 pb-4 transition-shadow inset-px dark:bg-background-700 bg-background-50 rounded-xl dark:border-background-600 hover:shadow-lg border-[1.5px] border-background-200">
        <div>
          <h2 className="text-xl font-bold">{blogPost.title}</h2>
          <p className="mt-4 font-light break-words">
            {blogPost.short_description}
          </p>
        </div>
        <footer className="flex items-center justify-end gap-4 dark:bg-background-700">
          <ReactionsButton
            reactions={blogPost.reactions}
            reactableId={blogPost.id}
            reactableType="BlogPost"
            readOnly={true}
          />
        </footer>
      </article>
      <span
        aria-hidden="true"
        className="absolute -z-0 inset-0 group/border scale-x-[1.5] blur before:absolute before:inset-0 before:h-10 before:top-[45%] before:w-[400px] before:bg-[conic-gradient(var(--tw-gradient-stops))] group-hover/border:visible invisible before:from-blue-900 dark:before:from-[#67d7eb] before:via-transparent before:to-transparent group-hover/border:before:animate-rotate-bg"
      ></span>
    </Link>
  );
}
