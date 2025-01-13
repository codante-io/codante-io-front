import { Card } from "~/components/ui/cards/card";
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
      className="w-full relative text-start p-4 mb-12 md:p-12 flex gap-8  lg:flex-row flex-col bg-transparent"
      id={challenge.slug}
    >
      <div className="lg:basis-1/2 basis-full h-full ">
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
    <>
      {challenge.image_url && (
        <img src={challenge.image_url} alt="Project preview" className="" />
      )}

      <div className="flex flex-col items-center justify-center gap-2 w-full">
        <h2 className=" text-center dark:text-gray-300 text-gray-600 font-cursive ">
          {moduleNumber}.{" "}
          <span className="underline decoration-amber-300">Projeto</span>
        </h2>
        <h3 className="max-w-[75%] text-xl md:text-2xl font-lexend font-bold decoration-amber-400 text-center">
          {challenge.name}
        </h3>
      </div>
    </>
  );
}

export default ChallengeTrackCard;
