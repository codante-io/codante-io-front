import UserAvatar from "~/components/user-avatar";
import type { ChallengeParticipants } from "~/models/challenge.server";
import ParticipantsCounter from "./participants-counter";
import getUserRole from "~/utils/get-user-role";

export default function ParticipantsSection({
  className = "",
  participants,
  userAvatar,
  currentUserIsEnrolled,
  currentUserRole,
}: {
  className?: string;
  participants: ChallengeParticipants;
  userAvatar?: string;
  currentUserIsEnrolled: boolean;
  currentUserRole?: "pro" | "admin";
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
            {currentUserIsEnrolled && (
              <UserAvatar
                avatarUrl={userAvatar}
                className="w-16 h-16"
                role={currentUserRole}
              />
            )}
            {currentUserIsEnrolled
              ? participants?.avatars
                  .filter((info) => info.avatar_url !== userAvatar)
                  .map((info, index) => (
                    <UserAvatar
                      key={index}
                      avatarUrl={info.avatar_url}
                      className="w-16 h-16"
                      role={getUserRole(info)}
                    />
                  ))
              : participants?.avatars.map((info, index) => (
                  <UserAvatar
                    key={index}
                    avatarUrl={info.avatar_url}
                    className="w-16 h-16"
                    role={getUserRole(info)}
                  />
                ))}
          </div>
        </section>
      </>
    </article>
  );
}
