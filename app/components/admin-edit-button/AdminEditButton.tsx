import { useUserFromOutletContext } from "~/hooks/useUserFromOutletContext";

type AdminEditButtonProps = {
  baseURL?: string;
  url: string;
};

export default function AdminEditButton({
  baseURL = "https://api.codante.io/admin",
  url,
}: AdminEditButtonProps) {
  const user = useUserFromOutletContext();

  return (
    <div className="my-4 ">
      {user?.is_admin ? (
        <a
          href={baseURL + url}
          target="_blank"
          rel="noreferrer"
          className="p-2 text-xs text-red-500 border-2 border-red-300 rounded hover:underline max-w-20 dark:border-red-900 dark:text-red-300"
        >
          Editar
        </a>
      ) : null}
    </div>
  );
}
