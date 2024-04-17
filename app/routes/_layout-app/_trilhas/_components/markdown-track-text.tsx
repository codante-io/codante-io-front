import MarkdownRenderer from "~/components/ui/markdown-renderer";
import type { TrackItem } from "~/lib/models/track.server";

interface MarkdownTrackTextProps {
  trackItem: TrackItem;
}

function MarkdownTrackText({ trackItem }: MarkdownTrackTextProps) {
  return (
    <div className="pb-6 text-start">
      <h1 className="text-xl">{trackItem?.pivot?.name}</h1>
      <MarkdownRenderer
        fontSize="small"
        prose={false}
        markdown={trackItem.content}
        wrapperClasses="dark:text-gray-400 text-gray-600"
      />
    </div>
  );
}

export default MarkdownTrackText;
