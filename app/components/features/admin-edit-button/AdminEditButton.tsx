import { useUserFromOutletContext } from "~/lib/hooks/useUserFromOutletContext";
import { BiEdit } from "react-icons/bi";

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
    user?.is_admin && (
      <a
        href={baseURL + url}
        target="_blank"
        rel="noreferrer"
        className="p-2 text-xs inline-block align-middle"
      >
        <BiEdit className="w-6 h-6 text-red-200" />
      </a>
    )
  );
}
