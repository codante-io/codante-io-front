import PriceCard from "~/components/cards/pricing/price-card";
import { freePlan, proPlan } from "~/components/cards/pricing/pricingData";

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
              featuresByCategory={freePlan}
              data={{
                name: "Gratuito",
                price: 0,
                installments: 0,
              }}
            />
            <PriceCard
              data={{
                name: "PRO (Vitalício)",
                fullPrice: 948,
                banner: "Oferta de lançamento",
                immediateSettlementAmount: 588,
                price: 49,
                installments: 12,
              }}
              featuresByCategory={proPlan}
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
