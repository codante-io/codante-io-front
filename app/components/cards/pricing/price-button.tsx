import { useFetcher, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
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

  //useeffect for toast submitting
  // useEffect(() => {
  //   if (isSubmitting) {
  //     toast.loading("Aguarde...");
  //   } else {
  //     toast.dismiss();
  //   }
  // }, [isSubmitting]);

  async function checkout() {
    toast.custom(
      () => (
        <div className="flex flex-col items-center text-center justify-center bg-background-700 p-6 rounded-xl border border-background-500 max-w-xs">
          <h3 className="text-xl font-bold flex items-center gap-3  ">
            <CgSpinner className="animate-spin text-brand" />
            Aguarde
          </h3>
          <p className="mt-2 text-gray-300 text-sm">
            Você está sendo redirecionado para a página do provedor de pagamento...
          </p>
        </div>
      ),
      {
        duration: 10000,
      },
    );

    // wait 2 seconds to show the toast (wait promise)
    // await new Promise((resolve) => setTimeout(resolve, 2000));

    setTimeout(() => {
      fetcher.submit({}, { method: "post", action: "/assine" });
    }, 2000);
  }

  async function sendPaymentRequest(
    pagarmeToken: string,
    paymentMethod: string,
  ) {
    try {
      fetcher.submit(
        { pagarmeToken, paymentMethod },
        { method: "post", action: "/assine" },
      );
    } catch (error) {
      // Acho que esse catch é inútil: https://github.com/remix-run/remix/discussions/4242
      toast.error("Erro ao processar pagamento.");
      //eslint-disable-next-line
      console.log(error);
    }
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
        await sendPaymentRequest(data.token, data.payment_method);
      },
      error: function (err: any) {
        // console.log("Erro no Modal!");
      },
    });
    checkout.open({
      amount: 58800,
      customerData: "true",
      createToken: "true",
      paymentMethods: "credit_card,boleto",
      postbackUrl: "https://eorgzkrbdc3gnuq.m.pipedream.net",
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
    // <Form action="/assine" method="post">
    <button
      onClick={checkout}
      className="w-full p-2 text-white rounded-md hover:bg-opacity-70 sm:py-2 md:py-4 bg-brand"
    >
      Assinar PRO
    </button>
    // </Form>
  );
}
