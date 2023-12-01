import UserAvatar from "~/components/user-avatar";
import type { ChallengeParticipants } from "~/models/challenge.server";
import ParticipantsCounter from "./participants-counter";
import type { UserAvatar as UserAvatarType } from "~/models/user.server";

export default function ParticipantsSection({
  className = "",
  participants,
  avatar,
  currentUserIsEnrolled,
}: {
  avatar: UserAvatarType | null;
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
            {currentUserIsEnrolled && avatar && (
              <UserAvatar className="w-16 h-16" avatar={avatar} />
            )}
            {currentUserIsEnrolled && avatar
              ? participants?.avatars
                  .filter(
                    (participantsAvatar) =>
                      participantsAvatar.avatar_url !== avatar.avatar_url,
                  )
                  .map((avatar, index) => (
                    <UserAvatar
                      key={index}
                      avatar={avatar}
                      className="w-16 h-16"
                    />
                  ))
              : participants?.avatars.map((avatar, index) => (
                  <UserAvatar
                    key={index}
                    avatar={avatar}
                    className="w-16 h-16"
                  />
                ))}
          </div>
        </section>
      </>
    </article>
  );
}
