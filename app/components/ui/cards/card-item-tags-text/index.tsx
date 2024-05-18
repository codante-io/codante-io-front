import type { Tag } from "~/lib/models/tag.server";

function CardItemTagsText({ tags }: { tags: Tag[] }) {
  return (
    <div className="pb-1 overflow-x-auto overflow-scrollbar scrollbar-thumb tags">
      {tags?.map((tag, index) => (
        <span key={tag.id} className="inline-block text-xs mr-1">
          <span className="font-bold flex items-center gap-1">
            {tag.name}{" "}
            {index !== tags.length - 1 && (
              <span className="inline-block h-1 w-1 bg-brand-400 dark:bg-brand-500 rounded-full" />
            )}
          </span>
        </span>
      ))}
    </div>
  );
}

export default CardItemTagsText;
