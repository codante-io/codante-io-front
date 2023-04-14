import { BsFillPlayFill, BsFillPersonFill } from "react-icons/bs";
import { json } from "@remix-run/node";
import { getHome } from "~/models/home.server";
import { useLoaderData } from "@remix-run/react";
import WorkshopCard from "~/components/cards/workshop-card";
import { useEffect } from "react";
import ChallengeCard from "~/components/cards/challenge-card";
import { useColorMode } from "~/contexts/color-mode-context";
import PriceCard from "~/components/cards/price-card";

export const loader = async () => {
  return json({
    homeInfo: await getHome(),
  });
};

export default function Index() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const { colorMode } = useColorMode();

  useEffect(() => {
    console.log(homeInfo);
  }, [homeInfo]);

  return (
    <div className="text-white flex flex-col items-center justify-center">
      <section
        id="headline"
        className="w-full flex justify-center bg-[url('/img/bg.jpg')] bg-cover "
      >
        <div className="w-full flex flex-col items-center backdrop-blur-sm">
          <div className="container flex flex-col items-center">
            <h1 className="font-lexend font-light mt-16 text-3xl md:text-5xl text-center">
              Evolua na{" "}
              <span className="inline-block pr-4 font-bold text-blue-200">
                programação
              </span>
            </h1>
            <p className="font-inter text-md px-2 md:text-xl font-light mt-16 text-center lg:w-7/12">
              Fuja dos tutoriais e aprimore suas{" "}
              <span className="italic">skills</span> em programação com{" "}
              <span className="font-bold italic">workshops</span> e{" "}
              <span className="font-bold italic">mini projetos</span> ensinados
              por profissionais do mercado.
            </p>
            <div className="flex flex-col lg:flex-row mt-10 gap-4 justify-around">
              <button className="rounded-full py-2 px-4 bg-gray-700">
                Saiba mais
              </button>
              <button className="flex items-center rounded-full py-2 px-4 bg-slate-100 text-gray-700">
                <BsFillPersonFill className="mr-2" color="#5282FF" />{" "}
                Cadastre-se
              </button>
            </div>
            <div className="w-[553px] h-[311px] bg-black flex items-center justify-center rounded-lg mt-10 mb-20">
              <button className="flex items-center justify-center rounded-full h-12 w-12 bg-slate-100 text-gray-700">
                <BsFillPlayFill size={24} color="#5282FF" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="workshops"
        className="w-full dark:bg-gray-900 bg-white flex justify-center text-gray-800 dark:text-white mb-16"
      >
        <div className="container mb-10">
          <h1 className="font-lexend font-light mt-16 mb-10 text-3xl sm:px-6 lg:px-8">
            Workshops
          </h1>
          <section className="flex flex-wrap justify-between gap-4">
            {homeInfo?.featured_workshops?.slice(0, 2).map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} />
            ))}
          </section>
        </div>
      </section>
      {colorMode && (
        <img
          src={`/img/wave-top-${colorMode}.svg`}
          className="w-full relative"
          alt="Wave detail"
        />
      )}
      <section
        id="mini-projects"
        className="w-full dark:bg-slate-800 bg-slate-50 text-gray-800 dark:text-white flex justify-center"
      >
        <div className="container -top-56 relative">
          <h1 className="font-lexend font-light mt-16 mb-10 text-3xl sm:px-6 lg:px-8">
            Mini projetos
          </h1>
          <section className="grid grid-cols-4 gap-y-8">
            {homeInfo?.featured_challenges?.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </section>
        </div>
      </section>
      {colorMode && (
        <img
          src={`/img/wave-bottom-${colorMode}.svg`}
          className="w-full -top-20 relative"
          alt="Wave detail"
        />
      )}
      <section
        id="tracks"
        className="w-full dark:bg-gray-900 bg-white flex justify-center text-gray-800 dark:text-white"
      >
        <div className="container relative -top-56">
          <h1 className="font-lexend font-light mt-16 text-3xl sm:px-6 lg:px-8">
            Trilhas
          </h1>
        </div>
      </section>

      <section
        id="tracks"
        className="w-full dark:bg-gray-900 bg-white flex justify-center text-gray-800 dark:text-white text-center"
      >
        <div className="container relative">
          <h1 className="font-lexend font-light mt-16 text-3xl sm:px-6 lg:px-8">
            Preços
          </h1>
          <section className="flex justify-center mt-10 gap-20 mb-20">
            <PriceCard
              price={{
                name: "Gratuito",
                price: 0,
                features: {
                  Comunidade: true,
                  "Mini projetos": true,
                  "Workshops gratuitos": true,
                  "Area vip da comunidade": false,
                  "Workshops premium": false,
                  "Resoluçoes dos mini projetos": false,
                },
              }}
            />
            <PriceCard
              price={{
                name: "Premium",
                banner: "Gratuito por tempo limitado",
                price: 0,
                features: {
                  Comunidade: true,
                  "Mini projetos": true,
                  "Workshops gratuitos": true,
                  "Area vip da comunidade": true,
                  "Workshops premium": true,
                  "Resoluçoes dos mini projetos": true,
                },
              }}
            />
          </section>
        </div>
      </section>
    </div>
  );
}
