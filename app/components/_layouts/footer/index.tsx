import { Link } from "@remix-run/react";

export default function Footer() {
  const navigation = [
    {
      name: "Email",
      href: "mailto:contato@codante.io",
      icon: (props: any) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path
            fillRule="evenodd"
            d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5l-8-5V6l8 5l8-5v2z"
          />
        </svg>
      ),
    },
    {
      name: "Linkedin",
      href: "https://www.linkedin.com/company/codante/",
      icon: (props: any) => (
        <>
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <circle cx="4.983" cy="5.009" r="2.188" fillRule="evenodd" />
            <path
              fillRule="evenodd"
              d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118c1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783c-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"
            />
          </svg>
        </>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/codante.io/",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    // {
    //   name: "Twitter",
    //   href: "#",
    //   icon: (props: any) => (
    //     <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    //       <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
    //     </svg>
    //   ),
    // },
    {
      name: "GitHub",
      href: "https://github.com/codante-io",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@codante-io",
      icon: (props: any) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-background-100 dark:bg-background-800 bg-opacity-80">
      <section className="px-6 py-12 mx-auto max-w-7xl grid grid-cols-2 gap-8 lg:grid-cols-5 lg:px-8 justify-center">
        <nav className="col-span-1 flex flex-col gap-4">
          <Link to="/projetos">Projetos</Link>
          <Link
            to="/projetos?tecnologia=react"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Projetos de React
          </Link>
          <Link
            to="/projetos?tecnologia=nextjs"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Projetos de Next.js
          </Link>
          <Link
            to="/projetos?tecnologia=tailwindcss"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Projetos de Tailwind CSS
          </Link>
          <Link
            to="/projetos?tecnologia=fundamentos"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Projetos de Fundamentos
          </Link>
        </nav>
        <div className="col-span-1 flex flex-col gap-4">
          <Link to="/workshops">Workshops</Link>
          <Link
            to="/workshops?tecnologia=react"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Workshops de React
          </Link>
          <Link
            to="/workshops?tecnologia=nextjs"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Workshops de Next.js
          </Link>
          <Link
            to="/workshops?tecnologia=fundamentos"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Workshops de Fundamentos
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <span>Outros recursos</span>
          <Link
            to="/testes-tecnicos"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Testes técnicos
          </Link>
          <Link
            to="https://docs.apis.codante.io/"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
            target="_blank"
          >
            APIs gratuitas
          </Link>
          <Link
            to="https://guias.codante.io"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
            target="_blank"
          >
            Guias dos workshops
          </Link>
          <Link
            to="/ranking"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Ranking
          </Link>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <span>Empresa</span>
          <Link
            to="/agenda"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Agenda
          </Link>
          <Link
            to="/blog"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Blog
          </Link>
          <Link
            to="https://changelog.codante.io"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
            target="_blank"
          >
            Changelog
          </Link>

          <Link
            to="/planos"
            className="text-xs dark:text-gray-400 dark:hover:text-gray-500 text-gray-500 hover:text-gray-600"
          >
            Planos e preços
          </Link>
        </div>
      </section>

      <div className="px-6 py-12 mx-auto max-w-7xl md:flex md:items-center md:justify-between lg:px-8">
        <nav className="mt-8 md:mt-0 flex justify-center space-x-6 items-center">
          <Link
            to={"/termos-de-uso"}
            className="block text-xs leading-5 text-center text-gray-500 hover:underline"
          >
            Termos de Uso
          </Link>
          <div className="w-1 h-1 bg-gray-500 rounded-full" />
          <Link
            to={"/politica-de-privacidade"}
            className="block text-xs leading-5 text-center text-gray-500 hover:underline"
          >
            Política de Privacidade
          </Link>
        </nav>

        <div className="p-2 text-xs font-light text-center text-gray-700 dark:text-gray-500 ">
          © {new Date().getFullYear()} Codante Educação Ltda CNPJ:
          26.607.049/0001-09
        </div>

        <nav className="flex justify-center space-x-6">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              className="text-gray-400 hover:text-gray-500"
              rel="noreferrer"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="w-6 h-6" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
