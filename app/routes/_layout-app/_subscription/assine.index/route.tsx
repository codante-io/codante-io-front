import { redirect, type LoaderArgs } from "@remix-run/node";
import axios from "axios";
import PriceCard from "~/components/cards/pricing/price-card";
import {
  freePlanDetails,
  freePlanFeatures,
  proPlanDetails,
  proPlanFeatures,
} from "~/components/cards/pricing/pricing-data";
import type { Subscription } from "~/models/subscription.server";
import { currentToken } from "~/services/auth.server";

export function loader({ request }: LoaderArgs) {
  return { request };
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const pagarmeToken = formData.get("pagarmeToken");
  const paymentMethod = formData.get("paymentMethod");

  let token = await currentToken({ request });

  try {
    const response = await axios.post<{ data: Subscription }>(
      `${process.env.API_HOST}/subscribe`,
      {
        pagarmeToken,
        paymentMethod,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // Redirect to another page
    const subscription = response.data.data;
    const encodedSubscription = encodeURIComponent(
      JSON.stringify(subscription)
    );

    return redirect(`/assine/sucesso?subscription=${encodedSubscription}`);
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.response.data.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default function AssinePage() {
  return (
    <main className="container mx-auto ">
      <h1 className="mb-10 text-4xl text-center font-lexend">
        <span className="font-bold border-b-4 border-amber-400">Assine</span> o
        Codante
      </h1>

      <section>
        <div className="container flex flex-col items-center">
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
              data={proPlanDetails}
              featuresByCategory={proPlanFeatures}
            />
          </section>
        </div>
      </section>
      <section className="mt-12">
        <h2 className="mb-10 text-4xl text-center font-lexend">
          Perguntas{" "}
          <span className="font-bold border-b-4 border-amber-400">
            Frequentes
          </span>
        </h2>
      </section>
    </main>
  );
}
