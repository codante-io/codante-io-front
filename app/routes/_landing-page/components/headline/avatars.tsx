import { User, UserAvatar } from "~/lib/models/user.server";
import Avatar from "~/components/ui/user-avatar";

function AvatarsSection({
  user,
  avatars,
  userCount,
}: {
  user: User;
  avatars: UserAvatar[];
  userCount: number;
}) {
  return (
    <div className="flex items-start flex-col md:flex-row justify-start w-full mt-10 gap-4">
      <div className="flex -space-x-3">
        {user && (
          <Avatar
            avatar={user.avatar}
            className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
          />
        )}
        {user
          ? avatars
              .filter((avatar) => avatar.avatar_url !== user.avatar.avatar_url)
              .slice(0, 8)
              .map((avatar, index) => (
                <Avatar
                  key={index}
                  avatar={avatar}
                  className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                />
              ))
          : avatars
              .slice(0, 9)
              .map((avatar, index) => (
                <Avatar
                  key={index}
                  avatar={avatar}
                  className="xl:w-9 xl:h-9 lg:h-[30px] lg:w-[30px] w-9 h-9"
                />
              ))}
      </div>
      <h3 className="text-start text-xs font-inter dark:text-gray-300 text-gray-800 w-64">
        <b className=" inline-block dark:bg-background-700 bold border dark:border-background-600 bg-background-100 border-background-150 px-1 rotate-1 rounded-lg">
          {`${userCount} devs`}
        </b>{" "}
        já estão evoluindo suas habilidades de frontend com a Codante.
      </h3>
    </div>
  );
}

export default AvatarsSection;
