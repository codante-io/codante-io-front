import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import { FiGithub } from "react-icons/fi";
import { useUserFromOutletContext } from "~/hooks/useUserFromOutletContext";
import classNames from "~/utils/class-names";

export default function PriceButton({
  plan,
}: {
  plan: "Gratuito" | "PRO (Vitalício)";
}) {
  const user = useUserFromOutletContext();
  const navigate = useNavigate();

  const [isHovering, setIsHovering] = useState(false);
  const buttonText = isHovering ? (
    <>
      <FiGithub />
      Entre com Github
    </>
  ) : (
    "Assinar PRO"
  );

  if (!user) {
    if (plan === "Gratuito") {
      return (
        <button
          onClick={() => navigate("/login?redirectTo=/assine")}
          className="flex items-center justify-center w-full p-2 py-4 text-white border rounded-md bg-background-700 border-background-600 gap-x-2 hover:bg-background-600"
        >
          <FiGithub />
          Entre com Github
        </button>
      );
    }
    return (
      <button
        onClick={() => navigate("/login?redirectTo=/assine")} // TODO - alterar para link de pagamento
        className={classNames(
          isHovering && "bg-opacity-50",
          "w-full p-2 text-white bg-brand rounded-md py-4 flex items-center justify-center gap-x-2"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {buttonText}
      </button>
    );
  }

  if (user && plan === "Gratuito") {
    return (
      <button
        disabled
        className="w-full p-2 py-4 text-white border rounded-md cursor-not-allowed bg-background-700 gap-x-2 border-background-600"
      >
        Você já tem esse plano
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate("/assine")} // TODO - alterar para link de pagamento
      className="w-full p-2 py-4 text-white rounded-md bg-brand"
    >
      Assinar PRO
    </button>
  );
}
