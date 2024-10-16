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
      className="w-full relative text-start p-4 mb-12 md:p-12 flex gap-8 pb-0 md:pb-0 lg:flex-row flex-col bg-transparent"
      id={workshop.slug}
    >
      <div className="lg:basis-1/2 basis-full h-full aspect-video mb-4 md:mb-12">
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
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <h2 className=" text-center dark:text-gray-300 text-gray-600 font-cursive underline decoration-amber-400">
            Módulo
          </h2>
          <h3 className="max-w-[65%] text-xl md:text-2xl font-lexend font-bold text-center">
            {workshop.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default WorkshopTrackCard;
