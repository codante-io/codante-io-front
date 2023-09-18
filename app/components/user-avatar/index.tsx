export default function UserAvatar({
  key,
  avatarUrl,
  size = "small",
}: {
  key?: number;
  avatarUrl?: string;
  size?: "small" | "medium" | "large";
}) {
  return (
    <img
      key={key || avatarUrl}
      className={`${size === "small" && "w-7 h-7 m-[2px]"} ${
        size === "medium" && "w-16 h-16"
      } inline-block rounded-full ring-2 ring-white dark:ring-gray-800`}
      src={avatarUrl || "https://source.boringavatars.com/"}
      alt="Avatar do usuário"
    />
  );
}
