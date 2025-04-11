import faqQuestions from "../faq-questions";
import FaqItem from "~/components/ui/faq-item";
import ProSpanWrapper from "~/components/ui/pro-span-wrapper";
import FreePricingCard from "~/components/ui/cards/pricing/free";
import ProPricingCard from "~/components/ui/cards/pricing/pro";
import YearlyPricingCard from "~/components/ui/cards/pricing/yearly";
import { BlurReveal } from "~/components/ui/motion/blur-reveal";
import { BlurRevealText } from "~/components/ui/motion/blur-reveal/text";
import Sparkles from "~/components/ui/motion/sparkles";
import { motion } from "framer-motion";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getHome } from "~/lib/models/home.server";

import TestimonialCard from "~/routes/_landing-page/components/testimonials/card";
import { features } from "./data";
import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const loader = async () => {
  return json({
    homeInfo: await getHome(),
  });
};

export default function PlanosPage() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const featuredTestimonials = homeInfo.featured_testimonials?.slice(0, 6);

  useEffect(() => {
    Crisp.configure("dec01a18-bf11-4fb8-a820-6a53760ba042");
  }, []);

  return (
    <main className="container mx-auto">
      <section className="flex flex-col items-start w-full">
        <BlurReveal className="flex flex-col items-start w-full gap-4">
          <h1 className="text-3xl sm:text-4xl text-start md:mt-10 font-lexend lg:text-5xl max-w-5xl">
            Assine o Codante <ProSpanWrapper>PRO</ProSpanWrapper>
          </h1>
          <h1 className="text-lg sm:text-xl text-start font-lexend font-light lg:text-2xl max-w-5xl">
            Tenha acesso completo a todos os nossos{" "}
            <span className="group">
              <Sparkles enableOnHover color="blue">
                workshops
              </Sparkles>{" "}
            </span>
            e{" "}
            <span className="group">
              <Sparkles enableOnHover color="yellow">
                mini projetos
              </Sparkles>
            </span>
            .
          </h1>
        </BlurReveal>
      </section>

      <section className="mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between gap-8 mt-10 mb-20 lg:flex-row text-start flex-wrap">
          <FreePricingCard />
          <YearlyPricingCard />
          <ProPricingCard />
        </div>
      </section>

      <section className="mt-40">
        <BlurRevealText
          element="h2"
          className="text-3xl font-lexend text-start max-w-xl mb-8"
        >
          Por que assinar o Codante <ProSpanWrapper>PRO</ProSpanWrapper>?
        </BlurRevealText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, transform: "blur(10px)" }}
              whileInView={{ opacity: 1, transform: "blur(0px)" }}
              transition={{ delay: 0.05 * index, duration: 0.5 }}
              className="flex flex-col gap-3 p-6 bg-background-50 dark:bg-background-800 rounded-xl border-[1.5px] border-background-200 dark:border-background-600 hover:border-brand-300 hover:shadow-md transition-all bg-grainy overflow-hidden"
            >
              <div className="p-3 bg-background-100 dark:bg-background-700 rounded-lg w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-lexend font-medium">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {featuredTestimonials && featuredTestimonials.length > 0 && (
        <section className="mt-40">
          <BlurRevealText
            element="h2"
            className="text-3xl font-lexend text-start max-w-xl mb-8"
          >
            O que nossa comunidade diz
          </BlurRevealText>

          <motion.section
            className="rounded-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-10 gap-5 w-full mt-8 "
            initial={{ x: 2 }}
          >
            {featuredTestimonials.map((testimonial, index) => {
              return (
                <TestimonialCard
                  key={index}
                  wide={[2, 4].includes(index)}
                  testimonial={testimonial.body}
                  avatarUrl={testimonial.avatar_url}
                  name={testimonial.name}
                  socialMediaProfileName={testimonial.social_media_nickname}
                  socialMediaProfileUrl={testimonial.social_media_link}
                />
              );
            })}
          </motion.section>
        </section>
      )}

      <section className="mt-40 mb-20">
        <BlurRevealText
          element="h2"
          className="text-3xl font-lexend text-start max-w-xl mb-8"
        >
          Perguntas Frequentes
        </BlurRevealText>

        <section className="mt-8">
          {faqQuestions.map((question, index) => (
            <FaqItem
              key={index}
              question={question.question}
              answer={question.answer}
              className="mx-0 lg:mx-0 xl:mx-0 2xl:mx-0 w-full lg:w-[70%]"
            />
          ))}
        </section>
      </section>
    </main>
  );
}
