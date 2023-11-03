import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
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
  const fetcher = useFetcher();

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const scriptTag = document.createElement("script");
    scriptTag.src = "https://assets.pagar.me/checkout/1.1.0/checkout.js";

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  async function sendPaymentRequest(
    pagarmeToken: string,
    paymentMethod: string
  ) {
    // const formData = new FormData();
    // formData.append("pagarmeToken", pagarmeToken);
    // formData.append("paymentMethod", paymentMethod);

    try {
      fetcher.submit(
        { pagarmeToken, paymentMethod },
        { method: "post", action: "/assine" }
      );
    } catch (error) {
      // console.log(error);
    }

    //   const response = await fetch("/assine", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   const data = await response.json();
    //   console.log(response);
    //   console.log(data);

    //   if (!response.ok) {
    //     toast.error(data.error);
    //     toast.error(`Erro no pagamento, transação não realizada.`);
    //   } else {
    //     toast.success("Pagamento realizado com sucesso!", {
    //       duration: 5000,
    //       style: {
    //         minWidth: "500px",
    //         padding: "20px",
    //         fontSize: "18px",
    //       },
    //     });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }

  async function openModal() {
    // @ts-ignore-next-line
    var checkout = new PagarMeCheckout.Checkout({
      // @ts-ignore-next-line
      encryption_key: window.ENV.PAGARME_ENCRYPTION_KEY,
      success: async function (data: {
        token: string;
        payment_method: string;
      }) {
        sendPaymentRequest(data.token, data.payment_method);
      },
      error: function (err: any) {
        // console.log("Erro no Modal!");
      },
    });
    checkout.open({
      amount: 58800,
      customerData: "true",
      createToken: "true",
      paymentMethods: "credit_card,pix,boleto",
      maxInstallments: 12,
      items: [
        {
          id: "1",
          title: "Codante - Vitalício",
          unit_price: 58800,
          quantity: 1,
          tangible: "false",
        },
      ],
    });
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
          "w-full p-2 text-white bg-brand rounded-md sm:py-2 md:py-4 flex items-center justify-center gap-x-2"
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

  return (
    <button
      onClick={openModal} // TODO - alterar para link de pagamento
      className="w-full p-2 text-white rounded-md hover:bg-opacity-70 sm:py-2 md:py-4 bg-brand"
    >
      Assinar PRO
    </button>
  );
}
