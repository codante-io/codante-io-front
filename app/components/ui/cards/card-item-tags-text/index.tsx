import type { Tag } from "~/lib/models/tag.server";

function CardItemTagsText({ tags }: { tags: Tag[] }) {
  return (
    <div className="pb-1 overflow-x-auto overflow-scrollbar scrollbar-thumb tags">
      {tags?.map((tag, index) => (
        <span key={tag.id} className="inline-block text-xs mr-1">
          <span className="font-bold">{tag.name}</span>
          {index === tags.length - 2 && " e"}
          {index < tags.length - 2 && ", "}
        </span>
      ))}
    </div>
  );
}

export default CardItemTagsText;
