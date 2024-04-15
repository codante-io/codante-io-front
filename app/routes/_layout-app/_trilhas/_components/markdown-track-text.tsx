import MarkdownRenderer from "~/components/ui/markdown-renderer";
import type { TrackItem } from "~/lib/models/track.server";

interface MarkdownTrackTextProps {
  trackItem: TrackItem;
}

function MarkdownTrackText({ trackItem }: MarkdownTrackTextProps) {
  return (
    <div className="pb-6 text-start prose-sm">
      <h1>{trackItem?.pivot.name}</h1>
      <MarkdownRenderer markdown={trackItem.content} />
    </div>
  );
}

export default MarkdownTrackText;
