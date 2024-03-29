import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { FiGithub } from "react-icons/fi";
import { useUserFromOutletContext } from "~/lib/hooks/useUserFromOutletContext";

import classNames from "~/lib/utils/class-names";

export default function PriceButton({
  plan,
}: {
  plan: "Gratuito" | "PRO (Vitalício)";
}) {
  const user = useUserFromOutletContext();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [isHovering, setIsHovering] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const isSubmittingOrLoading =
    fetcher.state === "submitting" || fetcher.state === "loading";

  // Use effect para manter o loading enquanto o fetcher estiver em submitting.
  useEffect(() => {
    if (isSubmittingOrLoading) {
      setIsLoading(true);
    }
    if (!isSubmittingOrLoading) {
      setIsLoading(false);
    }
  }, [isSubmittingOrLoading]);

  function sendToGoogleTagManager() {
    //check if there is window
    if (typeof window === "undefined") {
      return;
    }
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: "checkout",
    });
  }

  async function checkout() {
    setIsLoading(true);

    sendToGoogleTagManager();
    // send event to google tag manager

    toast.custom(
      () => (
        <div className="flex flex-col items-center text-center justify-center bg-background-700 p-6 rounded-xl border border-background-500 max-w-xs">
          <h3 className="text-xl font-bold flex items-center gap-3  ">
            <CgSpinner className="animate-spin text-brand" />
            Aguarde
          </h3>
          <p className="mt-2 text-gray-300 text-sm">
            Você está sendo redirecionado para a página do provedor de
            pagamento...
          </p>
        </div>
      ),
      {
        duration: 10000,
      },
    );

    // wait 2 seconds to show the toast (wait promise)
    setTimeout(() => {
      fetcher.submit({}, { method: "post", action: "/assine" });
    }, 2000);
  }

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
          className="flex items-center justify-center w-full p-2 text-white border rounded-md sm:py-2 md:py-4 bg-background-700 border-background-600 gap-x-2 hover:bg-background-600"
        >
          <FiGithub />
          Entre com Github
        </button>
      );
    }
    return (
      <button
        onClick={() => navigate("/login?redirectTo=/assine")}
        className={classNames(
          isHovering && "bg-opacity-50",
          "w-full p-2 text-white bg-brand rounded-md sm:py-2 md:py-4 flex items-center justify-center gap-x-2",
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
        className="w-full p-2 text-white border rounded-md cursor-not-allowed sm:py-2 md:py-4 bg-background-700 gap-x-2 border-background-600"
      >
        Você já tem esse plano
      </button>
    );
  }

  // if there is user and user.isPro === true
  if (user && plan === "PRO (Vitalício)" && user.is_pro) {
    return (
      <button
        disabled
        className="w-full p-2 text-white border rounded-md cursor-not-allowed sm:py-2 md:py-4 bg-background-700 gap-x-2 border-background-600"
      >
        Você já tem esse plano
      </button>
    );
  }
  return (
    <button
      onClick={checkout}
      disabled={isLoading}
      className={classNames(
        "w-full p-2 text-white rounded-md hover:bg-opacity-70 sm:py-2 md:py-4 bg-brand",
        isLoading && "cursor-not-allowed",
        isLoading && "bg-opacity-50 hover:bg-opacity-50",
        !isLoading && "hover:bg-opacity-70",
      )}
    >
      {isLoading ? (
        <CgSpinner className="animate-spin text-center inline-block h-5 w-5" />
      ) : (
        "Assinar Pro"
      )}
    </button>
  );
}
