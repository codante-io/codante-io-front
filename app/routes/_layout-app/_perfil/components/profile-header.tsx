import { FaGithub, FaLinkedin } from "react-icons/fa";
import UserAvatar from "~/components/ui/user-avatar";
import ProBadge from "~/components/ui/pro-badge";
import { formatName } from "~/lib/utils/format-name";
import { formatDate } from "~/lib/utils/format-date";
import type { UserProfile } from "~/lib/models/user.server";

export default function ProfileHeader({ user }: { user: UserProfile["user"] }) {
  return (
    <section className="flex flex-col items-center gap-4 md:flex-row md:items-start md:gap-8">
      <UserAvatar
        avatar={user.avatar}
        className="w-24 h-24"
        showTooltip={false}
      />
      <div className="flex flex-col items-center md:items-start gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-bold font-lexend dark:text-gray-50">
            {formatName(user.name)}
          </h1>
          {user.avatar.badge === "pro" && <ProBadge />}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          {user.github_user && (
            <a
              href={`https://github.com/${user.github_user}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FaGithub className="w-4 h-4" />
              <span>@{user.github_user}</span>
            </a>
          )}
          {user.linkedin_user && (
            <a
              href={`https://linkedin.com/in/${user.linkedin_user}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FaLinkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-500">
          Membro desde {formatDate(user.created_at)}
        </p>
      </div>
    </section>
  );
}
