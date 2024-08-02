import { useNavigate } from "@remix-run/react";

import { FiGithub } from "react-icons/fi";
import { useUserFromOutletContext } from "~/lib/hooks/useUserFromOutletContext";

export default function PriceButtonFree() {
  const user = useUserFromOutletContext();
  const navigate = useNavigate();

  if (!user) {
    return (
      <button
        onClick={() => navigate("/login?redirectTo=/assine")}
        className="flex items-center justify-center w-full p-2 text-white border rounded-md sm:py-2 md:py-4 bg-background-700 border-background-600 gap-x-2 hover:bg-background-600"
      >
        <FiGithub />
        Entre com Github
      </button>
    );
  }

  return (
    <button
      disabled
      className="w-full p-2 text-white border rounded-md cursor-not-allowed sm:py-2 md:py-4 bg-background-700 gap-x-2 border-background-600"
    >
      Você já tem esse plano
    </button>
  );
}
