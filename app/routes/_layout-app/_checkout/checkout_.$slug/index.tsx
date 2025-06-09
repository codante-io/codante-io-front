import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/cards/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Button } from "~/components/ui/button";
import {
  CreditCard,
  Receipt,
  QrCode,
  ArrowRight,
  Check,
  ArrowLeft,
} from "lucide-react";
import CreditCardForm from "./components/credit-card-form";
import BoletoForm from "./components/boleto-form";
import PixForm from "./components/pix-form";
import OrderSummary from "./components/order-summary";
import { createPayment } from "~/lib/models/subscription.server";
import { json, MetaArgs, useActionData } from "@remix-run/react";
import { useRouteError, useParams, useFetcher } from "@remix-run/react";
import { isRouteErrorResponse } from "@remix-run/react";
import NotFound from "~/components/features/error-handling/not-found";
import { Error500 } from "~/components/features/error-handling/500";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";
import { Form } from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { checkoutFormSchema, type CheckoutFormValues } from "./schema";
import PersonalInfoForm from "~/routes/_layout-app/_checkout/checkout_.$slug/components/personal-info-form";
import { cn } from "~/lib/utils/cn";

export const meta = ({ params }: MetaArgs<any>) => {
  const title = `Checkout | Codante.io`;
  const description = "Finalize a assinatura do seu plano";
  const imageUrl = getOgGeneratorUrl(
    "Checkout",
    "Finalize a assinatura do seu plano",
  );

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: `https://codante.io/checkout/${params.slug}`,
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:domain", content: "codante.io" },
    {
      property: "twitter:url",
      content: `https://codante.io/checkout/${params.slug}`,
    },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
    { property: "twitter:image", content: imageUrl },
    { property: "twitter:image:alt", content: title },
  ];
};

export async function action({
  request,
  params,
}: {
  request: Request;
  params: { slug: string };
}) {
  const formData = await request.formData();
  const paymentMethod = formData.get("paymentMethod") as string;
  const planName = formData.get("planName") as string;
  const cardToken = formData.get("cardToken") as string;
  const installments = formData.get("installments") as string;
  const cardName = formData.get("cardName") as string;
  const document = formData.get("document") as string;

  const { slug } = params;

  console.log(
    "action",
    paymentMethod,
    planName,
    cardToken,
    installments,
    cardName,
    document,
  );

  let paymentResponse;

  switch (paymentMethod) {
    case "credit_card":
      paymentResponse = await createPayment(request, {
        planSlug: slug,
        paymentInfo: {
          paymentMethod,
          cardToken,
          installments,
          cardName,
          document,
        },
      });
      break;
    case "boleto":
      return null;
    case "pix":
      paymentResponse = await createPayment(request, {
        planSlug: slug,
        paymentInfo: {
          paymentMethod,
          document,
        },
      });
      break;
  }

  return json({
    status: paymentResponse?.data?.pagarmeOrder?.status,
    transaction:
      paymentResponse?.data?.pagarmeOrder?.charges[0]?.last_transaction,
  });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <NotFound />;
  }

  return <Error500 error={error} />;
}

export default function CheckoutPage() {
  const [isComplete, setIsComplete] = useState(false);
  const { slug } = useParams();
  const fetcher = useFetcher({ key: "checkout" });
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  // Initialize react-hook-form with zod validation
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      paymentMethod: "credit_card",
      planName: slug,
      installments: "1",
      cardName: "",
      document: "",
      cardToken: "",
    },
    mode: "onChange",
  });

  // Watch payment method to control tabs
  const paymentMethod = form.watch("paymentMethod");

  // Handle tab change
  const handleTabChange = (value: string) => {
    form.setValue("paymentMethod", value as "credit_card" | "pix", {
      shouldValidate: true,
    });
  };

  const goBack = () => {
    setCurrentStep(currentStep - 1);
  };

  // Form submission handler
  async function onSubmit(data: CheckoutFormValues) {
    console.log("Form data", data);
    const formData = new FormData();

    // Add all form values to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    try {
      // Submit the form data to the server
      fetcher.submit(formData, {
        method: "post",
        action: `/checkout/${slug}?index`,
      });

      // Simulate processing time before showing completion
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsComplete(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  if (isComplete && paymentMethod === "credit_card") {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              Pagamento Confirmado!
            </CardTitle>
            <CardDescription>
              Seu pagamento foi processado com sucesso. Você receberá um e-mail
              com os detalhes da sua compra.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button onClick={() => window.location.reload()}>
              Voltar para a loja
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto grid md:grid-cols-5 gap-6 relative">
      <Card className="md:col-span-3">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Finalizar Compra</CardTitle>
            <div className="flex items-center">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  currentStep >= 1
                    ? "bg-green-100 text-green-600"
                    : "dark:bg-background-600 bg-background-100 dark:text-gray-300 text-gray-400",
                )}
              >
                {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
              </div>
              <div
                className={cn(
                  "w-8 h-1",
                  currentStep >= 2
                    ? "dark:bg-green-100 bg-green-600"
                    : "dark:bg-background-600 bg-background-100",
                )}
              ></div>
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center",
                  currentStep >= 2
                    ? "dark:bg-green-100 bg-green-600 dark:text-gray-300 text-gray-400"
                    : "dark:bg-background-600 bg-background-100 dark:text-gray-300 text-gray-400",
                )}
              >
                {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
              </div>
            </div>
          </div>
          <CardDescription>
            {currentStep === 1
              ? "Informe seus dados pessoais e escolha o método de pagamento"
              : `Pagamento com ${paymentMethod === "credit_card" ? "Cartão de Crédito" : "PIX"}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 ? (
            <PersonalInfoForm onSubmit={() => {}} />
          ) : (
            <>
              {paymentMethod === "credit_card" && (
                <CreditCardForm form={form} formRef={formRef} />
              )}
              {paymentMethod === "pix" && (
                <PixForm form={form} formRef={formRef} />
              )}
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep === 2 && (
            <Button
              variant="outline"
              onClick={goBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar
            </Button>
          )}
          {currentStep === 1 ? (
            <div></div>
          ) : (
            <Button
              className="ml-auto"
              // onClick={handlePaymentSubmit}
              // disabled={isProcessing}
            >
              Finalizar Pagamento <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>

      <div className="md:col-span-2">
        <OrderSummary />
      </div>
    </div>
  );
}
