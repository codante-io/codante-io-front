import type { Tag } from "~/lib/models/tag.server";
import { cn } from "~/lib/utils/cn";

function CardItemTagsText({
  tags,
  light = false,
}: {
  tags: Tag[];
  light?: boolean;
}) {
  return (
    <div className="pb-1 leading-tight">
      {tags?.map((tag, index) => (
        <span key={tag.id} className="inline-block text-xs mr-1">
          <span
            className={cn(
              "flex items-center gap-1 font-bold ",
              light && "font-light",
            )}
          >
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
