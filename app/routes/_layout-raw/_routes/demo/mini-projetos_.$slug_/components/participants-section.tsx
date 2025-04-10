import UserAvatar from "~/components/ui/user-avatar";
import type { ChallengeParticipants } from "~/lib/models/challenge.server";
import ParticipantsCounter from "./participants-counter";

export default function ParticipantsSection({
  className = "",
  participants,
  currentUserIsEnrolled,
}: {
  className?: string;
  participants: ChallengeParticipants;
  currentUserIsEnrolled: boolean;
}) {
  return (
    <article className={`${className} relative w-full p-4 pt-3 font-inter`}>
      <>
        <h1 className="flex justify-center text-2xl font-light text-center font-lexend">
          <ParticipantsCounter
            currentUserIsEnrolled={currentUserIsEnrolled}
            participantsCount={participants?.count}
          />
        </h1>
        <section className="p-2">
          <div className="flex flex-wrap justify-center p-1 -space-x-3">
            {participants.avatars.map((avatar, index) => (
              <UserAvatar key={index} avatar={avatar} className="w-16 h-16" />
            ))}
          </div>
        </section>
      </>
    </article>
  );
}
