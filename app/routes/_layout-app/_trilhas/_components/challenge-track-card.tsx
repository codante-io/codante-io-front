import { Card } from "~/components/ui/cards/card";
import { cn } from "~/lib/utils/cn";
import { ChallengeTrackable } from "~/lib/models/track.server";
import { ChallengeSteps } from "~/routes/_layout-app/_trilhas/_components/challenge-steps";

interface ChallengeTrackCardProps {
  challenge: ChallengeTrackable;
  userIsPro: boolean;
  moduleNumber: number;
}

function ChallengeTrackCard({
  challenge,
  moduleNumber,
}: ChallengeTrackCardProps) {
  return (
    <Card
      border="bright"
      className="w-full relative text-start p-4 mb-12 md:p-12 flex gap-8 pb-0 md:pb-0 lg:flex-row flex-col bg-transparent"
      id={challenge.slug}
    >
      <div className="lg:basis-1/2 basis-full h-full aspect-video mb-4 md:mb-12">
        <VideoHoverElement moduleNumber={moduleNumber} challenge={challenge} />
      </div>

      <div className="lg:basis-1/2 basis-full">
        <ChallengeSteps
          trackLessons={challenge.track_lessons}
          challengeSlug={challenge.slug}
          // solution={challenge.solution}
        />
      </div>
    </Card>
  );
}

function VideoHoverElement({
  challenge,
  moduleNumber,
}: {
  challenge: ChallengeTrackable;
  moduleNumber: number;
}) {
  return (
    <div className="aspect-video w-full h-full relative group/challenge bg-background-100 dark:bg-background-700 overflow-hidden rounded-lg">
      {challenge.image_url && (
        <img
          src={challenge.image_url}
          alt="Project preview"
          className="w-full h-full"
        />
      )}

      <div
        className={cn(
          "rounded-lg opacity-100 absolute top-0 left-0 w-full h-full dark:bg-background-700 bg-background-100 transition-all duration-300 flex items-center justify-center",
          challenge.image_url && "opacity-100 group-hover/challenge:opacity-0 ",
        )}
      >
        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <h2 className=" text-center dark:text-gray-300 text-gray-600 font-cursive ">
            {moduleNumber}.{" "}
            <span className="underline decoration-amber-300">Projeto</span>
          </h2>
          <h3 className="max-w-[75%] text-xl md:text-2xl font-lexend font-bold decoration-amber-400 text-center">
            {challenge.name}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default ChallengeTrackCard;
