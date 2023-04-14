import { getSession, user } from "~/services/auth.server";
import { BsFillPlayFill } from "react-icons/bs";

export let loader = async ({ request }: { request: Request }) => {
  const loggedUser = await user({ request });

  // get the current session
  const session = await getSession(request.headers.get("Cookie"));

  return { user: loggedUser, session };
};

export default function Index() {
  return (
    <div className="text-white flex flex-col items-center justify-center">
      <section id="headline" className="w-full bg-gray-900 flex justify-center">
        <div className="container flex flex-col items-center">
          <h1 className="font-lexend font-light mt-16 text-5xl text-center">
            Evolua na{" "}
            <span className="inline-block pr-4 font-bold text-blue-200">
              programação
            </span>
          </h1>
          <p className="font-inter text-xl font-light mt-16 text-center w-7/12">
            Fuja dos tutoriais e aprimore suas{" "}
            <span className="italic">skills</span> em programação com{" "}
            <span className="font-bold italic">workshops</span> e{" "}
            <span className="font-bold italic">mini projetos</span> ensinados
            por profissionais do mercado.
          </p>
          <div className="flex mt-10 w-1/4 justify-around">
            <button className="rounded-full py-2 px-4 bg-gray-700">
              Saiba mais
            </button>
            <button className="flex items-center rounded-full py-2 px-4 bg-slate-100 text-gray-700">
              <BsFillPlayFill className="mr-2" color="#5282FF" /> Cadastre-se
            </button>
          </div>
          <div className="w-[553px] h-[311px] bg-black flex items-center justify-center rounded-lg mt-10">
            <button className="flex items-center justify-center rounded-full h-12 w-12 bg-slate-100 text-gray-700">
              <BsFillPlayFill size={24} color="#5282FF" />
            </button>
          </div>
        </div>
      </section>
      <section
        id="workshops"
        className="w-full bg-gray-900 flex justify-center"
      >
        <div className="container">
          <h1 className="font-lexend font-light mt-16 mb-32 text-3xl sm:px-6 lg:px-8">
            Workshops
          </h1>
        </div>
      </section>
      <img
        src="/img/wave-top.svg"
        className="w-full relative -top-32"
        alt="Wave detail"
      />
      <section
        id="mini-projects"
        className="w-full bg-slate-800 h-32 flex justify-center"
      >
        <div className="container">
          <h1 className="font-lexend font-light mt-16 text-3xl sm:px-6 lg:px-8">
            Mini projetos
          </h1>
        </div>
      </section>
      <img src="/img/wave-bottom.svg" className="w-full" alt="Wave detail" />
      <section
        id="tracks"
        className="w-full bg-gray-900 h-32 flex justify-center"
      >
        <div className="container">
          <h1 className="font-lexend font-light mt-16 text-3xl sm:px-6 lg:px-8">
            Trilhas
          </h1>
        </div>
      </section>

      <section id="pricing" className="w-full bg-slate-600 h-32">
        <div className="container"></div>
      </section>
    </div>
  );
}
