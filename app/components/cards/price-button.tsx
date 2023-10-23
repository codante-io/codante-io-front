import { useNavigate } from "@remix-run/react";
import { useState } from "react";
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
  const buttonText = isHovering ? "Você precisa se cadastrar" : "Assinar PRO";

  if (!user) {
    if (plan === "Gratuito") {
      return (
        <button
          onClick={() => navigate("/login?redirectTo=/assine")}
          className="w-full p-2 text-white bg-green-700 rounded-md"
        >
          Cadastre-se
        </button>
      );
    }
    return (
      <button
        onClick={() => navigate("/login?redirectTo=/assine")} // TODO - alterar para link de pagamento
        className={classNames(
          isHovering && "bg-opacity-50",
          "w-full p-2 text-white bg-green-700 rounded-md"
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
        className="w-full p-2 text-white bg-green-700 bg-opacity-50 rounded-md"
      >
        Você faz parte desse plano
      </button>
    );
  }

  return (
    <button
      onClick={() => navigate("/assine")} // TODO - alterar para link de pagamento
      className="w-full p-2 text-white bg-green-700 rounded-md"
    >
      Assinar PRO
    </button>
  );
}
