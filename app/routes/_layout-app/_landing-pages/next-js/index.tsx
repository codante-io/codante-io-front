import imageSrc from "./img.png";

export default function NextJsLandingPage() {
  return (
    <div className="container mx-auto">
      <main className="text-center">
        <header className="mt-10">
          <p className="text-amber-400 font-cursive text-sm font-extralight">
            com Roberto Cestari e amigos
          </p>
          <h1 className="text-6xl font-bold">Aprenda Next.js</h1>
          <p className="text-gray-500 dark:text-gray-300 text-3xl font-extralight mt-0">
            ++ do zero ao avançado
          </p>
        </header>
        <img
          src={imageSrc}
          className="mx-auto px-8 mt-10 hero-dashboard-border-gradient xs:h-[400px] sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px]"
        />

        <p>
          Não preciso nem dizer o porque Next.js é importante. (empresas que
          usam)
        </p>
        <p>Aqui, um pouco da metodologia</p>

        <section className="mt-12 w-full flex flex-col md:flex-row items-center bg-gray-900 text-white rounded-2xl shadow-lg p-8 gap-8 max-w-4xl mx-auto">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <img
              src={imageSrc}
              alt="Instrutor"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
            <p className="text-xs text-center mt-2 text-amber-300 font-semibold">
              MEET YOUR INSTRUCTOR
            </p>
          </div>
          {/* Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Roberto Cestari</h2>
            <p className="mb-4 text-gray-200">
              Roberto é um engenheiro de software que já escreveu livros e
              cursos sobre JavaScript e React. Possui mais de uma década de
              experiência desenvolvendo aplicações web e consultoria para
              startups e empresas globais. Atuou em projetos para empresas como
              MakerDAO e o governo dos EUA, entre outros.
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> Bestselling
                JavaScript Book Author
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 3.000.000+ Blog
                Visits/ano
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 80.000+
                Leitores/Alunos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 50.000+ Newsletter
                Readers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 23.000+ Twitter
                Followers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 10.000+ LinkedIn
                Followers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 8.000+ GitHub
                Followers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> 6.000+ GitHub Stars
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> GitHub Star Award
                (várias vezes)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> Co-fundador Técnico
                do CloudCamping
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">✔️</span> Pai de dois meninos
                incríveis
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-20">
          <header>
            <h2 className="text-4xl font-bold mb-2">
              Tecnologia que vamos aprender
            </h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full text-left">
            <div>React Server Components</div>
            <div>React Server Actions</div>
            <div>Data Fetching</div>
            <div>Streaming e Suspense</div>
            <div>React Server Components</div>
            <div>React Server Actions</div>
            <div>Data Fetching</div>
            <div>Streaming e Suspense</div>
          </div>
        </section>
      </main>
    </div>
  );
}
