import { Link, useLoaderData } from "@remix-run/react";
import toast from "react-hot-toast";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import Button from "~/components/form/button";
import ProSpanWrapper from "~/components/pro-span-wrapper";
import type { Subscription } from "~/models/subscription.server";
import BoletoIcon from "./boleto-icon";
import ThumbIcon from "./thumb-icon";

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const subscriptionString = url.searchParams.get("subscription");

  if (!subscriptionString) {
    return { subscription: null };
  }
  const subscription: Subscription = JSON.parse(subscriptionString);
  return { subscription };
}

export default function AssineSucesso() {
  const { subscription } = useLoaderData<typeof loader>();
  const subscriptionStatus = subscription?.status;
  const paymentMethod = subscription?.payment_method;

  function copyBarcodeToClipboard() {
    if (!subscription?.boleto_url) return;
    navigator.clipboard.writeText(subscription?.boleto_url);
    toast.success("Código de barras copiado!");
  }

  if (!subscription) return null;

  return (
    <main className="container mx-auto mt-12 text-center">
      <div className="max-w-2xl mx-auto dark:bg-background-700 rounded-xl dark:border-background-600 border-[1.5px] border-gray-300 shadow-lg">
        <div className="flex items-center justify-center p-10 bg-gray-200 dark:bg-background-900 rounded-t-xl">
          {subscriptionStatus === "active" ? (
            <ThumbIcon className="text-green-500 dark:text-green-300 w-28 h-28" />
          ) : (
            <BoletoIcon className="w-28 h-28 dark:text-amber-300 text-amber-400" />
          )}
        </div>
        <div className="p-10 px-14">
          <h2 className="mb-3 text-3xl font-bold font-lexend">
            {subscriptionStatus === "active"
              ? "Tudo Certo!"
              : "Aguardando Pagamento"}
          </h2>
          <hr className="mx-auto border-2 rounded-full w-28 border-amber-400" />
          <p className="mt-8 font-light">
            {subscriptionStatus === "active" ? (
              <>
                Sua assinatura foi aprovada, você agora é{" "}
                <ProSpanWrapper>PRO</ProSpanWrapper>, aproveite!
                <br />
                Que tal navegar nos nossos{" "}
                <Link to="/workshops" className="text-brand hover:underline">
                  Workshops
                </Link>{" "}
                ou{" "}
                <Link to="/workshops" className="text-brand hover:underline">
                  Mini Projetos
                </Link>
                ?
              </>
            ) : (
              <>
                Você assinou o Codante <ProSpanWrapper>PRO</ProSpanWrapper>
                . <br /> Após o pagamento, aguarde até 2 dias úteis para seu
                pagamento ser reconhecido.
              </>
            )}
          </p>
          {subscriptionStatus !== "active" && paymentMethod === "boleto" && (
            <div className="flex items-center justify-center gap-10 mt-12">
              <Button
                onClick={copyBarcodeToClipboard}
                type="button"
                textColorClass="text-gray-700 dark:text-white"
                className="flex items-center justify-center w-48 gap-2 text-gray-700 transition-colors bg-transparent border border-gray-300 dark:text-gray-300 hover:border-brand group"
              >
                Código de Barras
                <FiCopy className="text-gray-400 transition-colors group-hover:text-brand" />
              </Button>
              <Button
                type="button"
                className="flex items-center justify-center w-48 gap-2 transition-colors bg-transparent border border-gray-300 hover:border-brand group"
                textColorClass="text-gray-700 dark:text-white"
                onClick={() =>
                  window.open(subscription?.boleto_url ?? "", "_blank")
                }
              >
                Ver Boleto
                <FiExternalLink className="text-gray-400 transition-colors group-hover:text-brand" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
