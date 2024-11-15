import faqQuestions from "../faq-questions";
import { Link } from "@remix-run/react";
import FaqItem from "~/components/ui/faq-item";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import FreePricingCard from "~/components/ui/cards/pricing/free";
import ProPricingCard from "~/components/ui/cards/pricing/pro";
import YearlyPricingCard from "~/components/ui/cards/pricing/yearly";

export default function AssinePage() {
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

          <section className="flex flex-col-reverse justify-center gap-10 mt-10 mb-20 lg:flex-row">
            <FreePricingCard />
            <YearlyPricingCard />
            <ProPricingCard />
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
