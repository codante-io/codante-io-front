import { Link } from "@remix-run/react";
import ReactionsButton from "~/components/reactions-button";
import type { BlogPost } from "~/models/blog-post.server";

export default function BlogPostCard({ blogPost }: { blogPost: BlogPost }) {
  return (
    <Link to={`/blog/${blogPost.slug}`}>
      <article className="flex flex-col justify-between h-full p-6 pb-2 dark:bg-background-700 rounded-xl">
        <div>
          <h2 className="text-xl font-bold">{blogPost.title}</h2>
          <p className="mt-4 font-light break-words">
            {blogPost.short_description}
          </p>
        </div>
        <footer className="flex items-center justify-end gap-4 dark:bg-background-700">
          {/* <div className="flex items-center gap-4">
            <img
              src={blogPost.instructor.avatar_url}
              alt="Avatar do usuário"
              className="w-10 h-10 border rounded-full border-background-200 dark:border-background-600"
            />
            <div className="">
              <h3 className="font-semibold line-clamp-1">
                {blogPost.instructor.name}
              </h3>
            </div>
          </div> */}
          <ReactionsButton
            reactions={blogPost.reactions}
            reactableId={blogPost.id}
            reactableType="BlogPost"
          />
        </footer>
      </article>
    </Link>
  );
}
