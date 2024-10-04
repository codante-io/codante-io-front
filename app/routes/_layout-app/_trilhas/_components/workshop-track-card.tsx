import { Card } from "~/components/ui/cards/card";
import { cn } from "~/lib/utils/cn";
import { WorkshopLessons } from "./workshop-lessons";
import { WorkshopTrackable } from "~/lib/models/track.server";

interface WorkshopTrackCardProps {
  workshop: WorkshopTrackable;
  userIsPro: boolean;
}

function WorkshopTrackCard({ workshop }: WorkshopTrackCardProps) {
  return (
    <Card
      border="bright"
      className="w-full relative text-start mb-12 p-8 flex gap-8 pb-0 lg:flex-row flex-col"
      id={workshop.slug}
    >
      <div className="lg:basis-1/2 basis-full h-full aspect-video mb-6">
        <VideoHoverElement workshop={workshop} />
      </div>

      <div className="lg:basis-1/2 basis-full">
        <WorkshopLessons
          lessons={workshop.lessons}
          workshopSlug={workshop.slug}
        />
      </div>
    </Card>
  );
}

function VideoHoverElement({ workshop }: { workshop: WorkshopTrackable }) {
  return (
    <div className="aspect-video w-full h-full relative group/workshop">
      {workshop.video_url && (
        <video
          autoPlay
          muted
          loop
          playsInline
          data-src={workshop.video_url}
          className={cn(
            "opacity-30 w-full h-full rounded-lg object-cover group-hover/workshop:opacity-60 transition-all duration-300 p-1  object-right-bottom lazy",
          )}
        />
      )}

      <div
        className={cn(
          "rounded-lg opacity-100 absolute top-0 left-0 w-full h-full dark:bg-background-700 bg-background-100 transition-all duration-300 flex items-center justify-center",
          workshop.video_url && "opacity-100 group-hover/workshop:opacity-0 ",
        )}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <h3 className="text-3xl font-lexend font-bold decoration-amber-400 underline text-center">
            {workshop.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default WorkshopTrackCard;
