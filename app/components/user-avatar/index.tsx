export default function UserAvatar({
  key,
  avatarUrl,
  className = "w-7 h-7 m-[2px]",
}: {
  key?: number;
  avatarUrl?: string;
  className?: string;
}) {
  return (
    <img
      key={key || avatarUrl}
      className={`${className} inline-block rounded-full ring-2 ring-white dark:ring-gray-800`}
      src={avatarUrl || "https://source.boringavatars.com/"}
      alt="Avatar do usuário"
    />
  );
}
