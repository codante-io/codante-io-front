import UserAvatar from "~/components/user-avatar";
import type { ChallengeParticipants } from "~/models/challenge.server";

export default function ParticipantsSection({
  className = "",
  participants,
  userAvatar,
  currentUserIsEnrolled,
}: {
  className?: string;
  participants: ChallengeParticipants;
  userAvatar?: string;
  currentUserIsEnrolled: boolean;
}) {
  return (
    <article className={`${className} relative w-full p-4 pt-3 font-inter`}>
      <>
        <h1 className="flex justify-center mt-24 text-2xl font-light text-center font-lexend">
          {currentUserIsEnrolled &&
            (participants?.count > 1 ? (
              <span>
                Você e mais{" "}
                <span className="font-bold">{participants?.count} pessoas</span>{" "}
                estão fazendo esse mini projeto.
              </span>
            ) : (
              <span>Você é o primeiro a participar deste mini projeto.</span>
            ))}
          {!currentUserIsEnrolled &&
            (participants?.count > 0 ? (
              participants?.count > 1 ? (
                <span>
                  Junte-se a outras{" "}
                  <span className="font-bold">
                    {participants?.count} pessoas
                  </span>{" "}
                  que estão fazendo esse mini projeto.
                </span>
              ) : (
                <span>
                  Junte-se a outra pessoa que está fazendo esse mini projeto.
                </span>
              )
            ) : (
              <span>
                Esse mini projeto ainda não tem participantes. Seja a primeira
                pessoa a participar!
              </span>
            ))}
        </h1>
        <section className="p-2">
          <div className="flex flex-wrap justify-center -space-x-3 overflow-hidden">
            {currentUserIsEnrolled && (
              <UserAvatar avatarUrl={userAvatar} size="medium" />
            )}
            {currentUserIsEnrolled
              ? participants?.avatars
                  .filter((avatar) => avatar !== userAvatar)
                  .map((avatar, index) => (
                    <UserAvatar key={index} avatarUrl={avatar} size="medium" />
                  ))
              : participants?.avatars.map((avatar, index) => (
                  <UserAvatar key={index} avatarUrl={avatar} size="medium" />
                ))}
          </div>
        </section>
      </>
    </article>
  );
}
