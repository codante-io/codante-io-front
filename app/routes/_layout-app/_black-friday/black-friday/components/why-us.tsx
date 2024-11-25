export default function WhyUs() {
  return (
    <>
      <h1 className="mb-12 text-2xl lg:text-4xl font-light font-lexend text-center">
        A nossa plataforma é{" "}
        <span className="color-underline decoration-amber-400">
          ideal para quem...
        </span>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-xl sm:max-w-2xl lg:max-w-6xl mx-auto mt-12">
        <div className="mx-4 md:mx-0 group relative flex flex-col gap-4 dark:bg-background-800 bg-background-100 p-4 rounded-lg border border-background-200 dark:border-background-700">
          <div className="absolute top-0 left-0 w-full h-full bg-amber-400 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-lg font-medium font-lexend">
            <span className="text-amber-400 mr-2">1.</span>
            Busca uma formação{" "}
            <span className="underline decoration-amber-400">
              prática
            </span> e{" "}
            <span className="underline decoration-amber-400">direta</span>
          </h3>
          <p className="dark:text-gray-300 text-gray-600">
            Você quer aprender o que realmente importa para o mercado, sem
            enrolação ou teoria em excesso.
          </p>
        </div>
        <div className="mx-4 md:mx-0 group relative flex flex-col gap-4 dark:bg-background-800 bg-background-100 p-4 rounded-lg border border-background-200 dark:border-background-700">
          <div className="absolute top-0 left-0 w-full h-full bg-amber-400 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-lg font-medium font-lexend">
            <span className="text-amber-400 mr-2">2.</span>
            Quer garantir uma{" "}
            <span className="underline decoration-amber-400">
              vantagem competitiva
            </span>
          </h3>
          <p className="dark:text-gray-300 text-gray-600">
            Com habilidades que empresas realmente valorizam, você deseja ser
            visto como alguém que agrega valor e tem potencial.
          </p>
        </div>

        <div className="mx-4 md:mx-0 group relative flex flex-col gap-4 dark:bg-background-800 bg-background-100 p-4 rounded-lg border border-background-200 dark:border-background-700">
          <div className="absolute top-0 left-0 w-full h-full bg-amber-400 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-lg font-medium font-lexend">
            <span className="text-amber-400 mr-2">3.</span>
            Precisa de{" "}
            <span className="underline decoration-amber-400">suporte</span> para
            esclarecer dúvidas
          </h3>
          <p className="dark:text-gray-300 text-gray-600">
            Para avançar com confiança, você sabe que ter acesso a um suporte
            pode ser a chave para desbloquear todo o seu potencial.
          </p>
        </div>

        <div className="mx-4 md:mx-0 group relative flex flex-col gap-4 dark:bg-background-800 bg-background-100 p-4 rounded-lg border border-background-200 dark:border-background-700">
          <div className="absolute top-0 left-0 w-full h-full bg-amber-400 blur-md -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <h3 className="text-lg font-medium font-lexend">
            <span className="text-amber-400 mr-2">4.</span>
            Prefere{" "}
            <span className="underline decoration-amber-400">
              flexibilidade
            </span>{" "}
            e{" "}
            <span className="underline decoration-amber-400">
              acessibilidade
            </span>
          </h3>
          <p className="dark:text-gray-300 text-gray-600">
            Está em busca de um conteúdo acessível e prático, que você pode
            começar agora mesmo e ajustar ao seu ritmo.
          </p>
        </div>
      </div>
    </>
  );
}
