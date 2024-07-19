import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
import type { AxiosError } from "axios";
import PriceCard from "~/components/ui/cards/pricing/price-card";
import {
  freePlanDetails,
  freePlanFeatures,
  proPlanDetails,
  proPlanFeatures,
} from "~/components/ui/cards/pricing/pricing-data";
import type { Subscription } from "~/lib/models/subscription.server";
import faqQuestions from "../faq-questions";
import type { Plan } from "~/lib/models/plan.server";
import { getPlanDetails } from "~/lib/models/plan.server";
import { Link, useLoaderData } from "@remix-run/react";
import FaqItem from "~/components/ui/faq-item";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import { createAxios } from "~/lib/services/axios.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const plan = await getPlanDetails();
  return { request, plan };
}

export async function action({ request }: { request: Request }) {
  const axios = await createAxios(request);

  try {
    const response = await axios.get<{
      checkoutLink: string;
      pagarmeOrderID: string;
      subscription: Subscription;
    }>("/pagarme/get-link");

    return redirect(`${response.data.checkoutLink}`);
  } catch (error: any) {
    if (error.isAxiosError) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        return redirect("/login");
      }

      const errorMessage = error.response.data.message;
      const encodedErrorMessage = encodeURIComponent(errorMessage);

      return redirect(`/assine/erro?error=${encodedErrorMessage}`);
    }

    return redirect(`/assine/erro`);
  }
}

export default function AssinePage() {
  const loaderData = useLoaderData<typeof loader>();
  const plan = loaderData.plan as Plan;

  const promotionInfo = JSON.parse(plan?.details || "{}");

  const currentPrice =
    plan.price_in_cents +
    promotionInfo?.content_count * 100 +
    promotionInfo?.user_raised_count * 100 * 10;

  const proPlanWithPrice = {
    ...proPlanDetails,
    monthlyPrice: Math.trunc((currentPrice / 100 / 12) * 100) / 100, // truncate 2 decimals
    totalPrice: currentPrice / 100,
  };
  return (
    <main className="container mx-auto ">
      <h1 className="mb-10 text-3xl md:text-4xl text-center font-lexend">
        <span className="font-bold underline decoration-amber-400 ">
          Assine
        </span>{" "}
        o Codante
      </h1>

      <section>
        <div className="flex flex-col items-center ">
          <p className="mt-2 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-3xl">
            O Codante <ProSpanWrapper>PRO</ProSpanWrapper> vai te ajudar a
            conquistar os seus objetivos de carreira. Saiba mais sobre a nossa
            metodologia{" "}
            <Link to="/assine" className="underline font-bold">
              {" "}
              clicando aqui
            </Link>
            .
          </p>
          <p className="mt-2 mb-4 font-light text-center font-inter text-md md:text-xl lg:max-w-3xl">
            Assine nosso{" "}
            <span className="text-brand-400">
              plano vitalício com valor promocional de lançamento
            </span>{" "}
            <span className="font-bold underline text-brand-400">
              por tempo limitado
            </span>
            . Sem assinaturas. Pague apenas uma vez, acesse para sempre.
          </p>

          <section className="flex flex-col-reverse justify-center gap-20 mt-10 mb-20 lg:flex-row">
            <PriceCard
              featuresByCategory={freePlanFeatures}
              data={freePlanDetails}
            />
            <PriceCard
              data={proPlanWithPrice}
              featuresByCategory={proPlanFeatures}
            />
          </section>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="mb-10 text-3xl md:text-4xl text-center font-lexend">
          Perguntas{" "}
          <span className="font-bold underline decoration-amber-400 ">
            {" "}
            Frequentes
          </span>
        </h2>
        <section className="mt-14">
          {faqQuestions.map((question, index) => (
            <FaqItem
              key={index}
              question={question.question}
              answer={question.answer}
            />
          ))}
        </section>
      </section>
    </main>
  );
}
