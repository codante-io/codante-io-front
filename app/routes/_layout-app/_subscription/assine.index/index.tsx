import { redirect, type LoaderFunctionArgs } from "@remix-run/node";
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
import faqQuestions from "../faq-questions";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import { AnimatePresence, motion } from "framer-motion";
import useSound from "use-sound";
import switchSound from "~/sounds/switch.mp3";
import classNames from "~/utils/class-names";

export function loader({ request }: LoaderFunctionArgs) {
  return { request };
}

export async function action({ request }: { request: Request }) {
  let token = await currentToken({ request });

  try {
    const response = await axios.get<{
      checkoutLink: string;
      pagarmeOrderID: string;
      subscription: Subscription;
    }>(`${process.env.API_HOST}/api/pagarme/get-link`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return redirect(`${response.data.checkoutLink}`);
  } catch (error: any) {
    // if it is an axios error
    // if (error.isAxiosError) {
    //   const axiosError = error as AxiosError;

    // console.log(error)

    return "errror";
    //   // if it is a 401 error
    //   if (axiosError.response?.status === 401) {
    //     // redirect to login page
    //     return redirect("/login");
    //   }

    //   const errorMessage = error.response.data.message;
    //   const encodedErrorMessage = encodeURIComponent(errorMessage);

    //   return redirect(`/assine/erro?error=${encodedErrorMessage}`);
    // }

    // return redirect(`/assine/erro`);
  }
}

export default function AssinePage() {
  return (
    <main className="container mx-auto ">
      <h1 className="mb-10 text-3xl md:text-4xl text-center font-lexend">
        <span className="font-bold border-b-4 border-amber-400">Assine</span> o
        Codante
      </h1>

      <section>
        <div className="flex flex-col items-center ">
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
        <h2 className="mb-10 text-3xl md:text-4xl text-center font-lexend">
          Perguntas{" "}
          <span className="font-bold border-b-4 border-amber-400">
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

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [playSound] = useSound(switchSound, { volume: 0.25 });

  return (
    <div
      className={classNames(
        isVisible ? "border-brand-500" : "border-transparent hover:border-gray-300 hover:dark:border-gray-600",
        "cursor-pointer shadow mb-6 mx-2 lg:mx-24 border font-lexend rounded-lg bg-white dark:bg-background-800 px-4 md:px-10 py-4",
      )}
      onClick={() => {
        setIsVisible(!isVisible);
        playSound();
      }}
    >
      <section className="flex justify-between items-center">
        <h3
          className={`py-4 md:py-6 text-lg md:text-xl  font-light text-gray-700 dark:text-white`}
        >
          {question}
        </h3>
        <RiArrowDownSLine
          className={`text-3xl md:text-4xl transition-transform flex-shrink-0 ${
            isVisible ? "-rotate-180 text-brand-500" : "text-gray-400"
          }`}
        />
      </section>
      <AnimatePresence initial={false}>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            height: isVisible ? "auto" : 0,
            transition: { opacity: { duration: 0.6 } },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: { opacity: { duration: 0.1 } },
          }}
          key={isVisible ? "open" : "closed"}
          className={`${isVisible ? "visible" : "invisible"} `}
        >
          <p className="font-extralight dark:text-gray-300 text-gray-600 pb-4 leading-relaxed">
            {answer} 
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
