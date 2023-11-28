import { useOutletContext, useNavigate, useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import { BsGithub, BsGlobe } from "react-icons/bs";
import { useColorMode } from "~/contexts/color-mode-context";
import { getResolutions, type Challenge } from "~/models/challenge.server";
import ProSpanWrapper from "~/components/pro-span-wrapper";
import { FaCrown } from "react-icons/fa";
import toast from "react-hot-toast";

// export async function loader({ request }: { request: Request }) {
//   return json({
//     resolutions: await getResolutions(request),
//   });
// }

export default function ResolutionCode() {
  // const { resolutions } = useLoaderData<typeof loader>();
  // console.log(resolutions)
  const context = useOutletContext<{ challenge: Challenge }>();
  const navigate = useNavigate();
  const challenge = context?.challenge;

  const { colorMode } = useColorMode();

  if (!challenge?.has_solution) {
    return navigate(`/mini-projetos/${challenge?.slug}`);
  }

  const githubOrganization = null;
  const githubRepo = "mp-lista-de-paises-next";

  function handleClick(event: React.MouseEvent) {
    if (!githubOrganization) {
      event?.preventDefault();
      toast((t) => (
        <p>
          Apenas membros <ProSpanWrapper>PRO</ProSpanWrapper> podem acessar essa resolução.
        </p>
      ));
    }
  }

  return (
    <section className="container">
      <h1 className="flex items-center mb-4 text-2xl font-semibold font-lexend text-brand">
        Resolução em Código
      </h1>
      <div className="relative w-full h-[65vh] rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-cover lg:bg-fill bg-center bg-no-repeat blur-sm bg-[url('/img/cover-stackblitz-light.png')] dark:bg-[url('/img/cover-stackblitz-dark.png')]"></div>
        {
          githubOrganization ? (
            <iframe
              title="slug"
              src={`https://stackblitz.com/github/${githubOrganization}/${githubRepo}?ctl=1&embed=1&terminalHeight=0&file=src%2Fapp%2Fpage.tsx&hideNavigation=1&view=editor&theme=${colorMode}`}
              className="w-full h-full rounded-lg shadow blur-none relative z-10"
            ></iframe>
          ) : (
            <div className="absolute z-20 p-3 bg-white border border-gray-200 rounded-lg shadow-2xl shadow-background-700 dark:border- dark:bg-background-800 dark:border-background-600 md:p-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <h3 className="font-bold md:text-2xl text-brand font-lexend">
                Ops...{" "}
              </h3>
              <span>
                Você precisa ser um membro <ProSpanWrapper>PRO</ProSpanWrapper> para
                acessar essa aula
              </span>
              <Link to="/assine" className="w-full inline-block mt-4">
                <button className="mx-auto w-full flex gap-1 justify-center items-center px-4 py-4 text-gray-700 rounded-lg bg-gradient-to-r animate-bg from-amber-200 via-amber-300 to-amber-400">
                  <FaCrown className="mr-2 text-amber-500" />
                  <span>
                    Seja
                    <b className="ml-1">PRO </b>
                  </span>
                </button>
              </Link>
            </div>
          )
        }

      </div>
      <div className="mt-10 w-full flex md:gap-8 gap-4">
        <a
          className={`dark:bg-[#17212B] flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 justify-between dark:border-background-700 w-full rounded-lg p-5`}
          href="https://codante.io"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => handleClick(event)}
        >
          <p className="text-xs md:text-base lg:text-lg">
            Acessar o código no GitHub
          </p>
          <BsGithub className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600" />
        </a>

        <a
          className={`dark:bg-[#17212B] flex flex-col-reverse md:flex-row text-center md:text-start gap-2 items-center shadow bg-white border-[1.5px] group dark:hover:border-brand-500 hover:border-brand-500 border-background-200 justify-between dark:border-background-700 w-full rounded-lg p-5`}
          href="https://codante.io"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => handleClick(event)}
        >
          <p className="text-xs md:text-base lg:text-lg">
            Acessar o deploy da aplicação
          </p>
          <BsGlobe className="text-3xl group-hover:text-brand-500 text-background-200 dark:text-background-600" />
        </a>
      </div>
    </section>
  );
}
