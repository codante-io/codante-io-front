import type { ComponentType } from "react";
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useRouteError,
} from "react-router";
import type { ActionFunctionArgs, MetaFunction } from "react-router";

import BackgroundBlur from "~/components/_layouts/background-blur";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import FaqItem from "~/components/ui/faq-item";
import { BlurRevealText } from "~/components/ui/motion/blur-reveal/text";
import TestimonialCard from "~/routes/_landing-page/components/testimonials/card";
import { registerMarketingLead } from "~/lib/models/lead.server";
import { getHome } from "~/lib/models/home.server";
import {
  MonitorSmartphone,
  FileText,
  Users,
  Calendar,
  Video,
  Award,
  Gift,
  User,
} from "lucide-react";

const COURSE_TAG = "curso-ao-vivo-codando-com-ia-v1";

const instructorAssets: Record<
  string,
  {
    imageSrc: string;
    imageAlt: string;
  }
> = {
  "Ícaro Harry": {
    imageSrc: "/img/vendas/icaro.webp",
    imageAlt: "Foto do instrutor Ícaro Harry",
  },
  "Roberto Cestari": {
    imageSrc: "/img/vendas/cestari.webp",
    imageAlt: "Foto do instrutor Roberto Cestari",
  },
};

const schedule = [
  {
    id: "aula-01",
    date: "05/11",
    instructor: "Ícaro Harry",
    title: "Introdução à IA para Devs",
    theoryTopics: [
      "Breve histórico",
      "Mercado de trabalho",
      "Ferramentas atuais",
    ],
    practiceTopics: ["Panorama das principais ferramentas no dia a dia"],
  },
  {
    id: "aula-02",
    date: "12/11",
    instructor: "Roberto Cestari",
    title: "Modelos – O Estado da Arte",
    theoryTopics: [
      "Modelos SOTA em código",
      "Open Source vs Local",
      "Gateways: OpenRouter e AI Gateway",
      "Capacidades (visão, tooling, áudio)",
    ],
    practiceTopics: ["Mapa mental para escolha de modelos"],
  },
  {
    id: "aula-03",
    date: "19/11",
    instructor: "Ícaro Harry",
    title: "Context – Boas Práticas",
    theoryTopics: ["Prompt Engineering", "Context Engineering"],
    practiceTopics: ["Skills e agentes no Claude Code"],
  },
  {
    id: "aula-04",
    date: "26/11",
    instructor: "Roberto Cestari",
    title: "MCPs",
    theoryTopics: ["Melhores MCPs", "Como criar um MCP"],
    practiceTopics: ["Construindo um MCP server"],
  },
  {
    id: "aula-05",
    date: "03/12",
    instructor: "Ícaro Harry",
    title: "Tools e RAG",
    theoryTopics: ["Fundamentos de RAG", "Tooling avançado"],
    practiceTopics: ["App com memória usando RAG"],
  },
  {
    id: "aula-06",
    date: "10/12",
    instructor: "Roberto Cestari",
    title: "AI SDK – A lib mais popular para agentes",
    theoryTopics: ["APIs Responses e Completion", "Visão geral do AI SDK"],
    practiceTopics: ["Criando um agente completo"],
  },
];

const benefits: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}[] = [
  {
    title: "Aulas ao vivo",
    description:
      "Encontros sempre das 19h às 21h para tirar dúvidas em tempo real.",
    icon: Video,
  },
  {
    title: "Comunidade Codante PRO",
    description:
      "Acesso direto à comunidade para networking e suporte contínuo.",
    icon: Users,
  },
  {
    title: "Certificado de conclusão",
    description:
      "Receba um certificado para adicionar ao portfólio e LinkedIn.",
    icon: Award,
  },
  {
    title: "Assinatura anual inclusa",
    description: "Não assinantes ganham 1 ano de Codante ao garantir o curso.",
    icon: Gift,
  },
];

const faqs = [
  {
    question: "Preciso dominar TypeScript para participar?",
    answer:
      "Não. O curso é ideal para devs com base em JS/TS, mas todas as práticas serão guiadas para que você acompanhe sem sufoco.",
  },
  {
    question: "Como funciona para assinantes Codante PRO?",
    answer:
      "Assinantes têm acesso gratuito: basta registrar interesse e vamos liberar a vaga por e-mail.",
  },
  {
    question: "Não sou assinante. Como funciona o pagamento?",
    answer:
      "O curso custa R$599 com possibilidade de parcelamento em até 12x. Ao comprar, você recebe uma assinatura anual do Codante.",
  },
  {
    question: "As aulas ficam gravadas?",
    answer:
      "Gravações e prazos de acesso serão confirmados em breve. Entrando na lista, você recebe todas as atualizações por e-mail.",
  },
  {
    question: "Os encontros têm limite de vagas?",
    answer:
      "Estamos definindo o número ideal de vagas para manter as interações ao vivo. Informe seu interesse para garantir prioridade.",
  },
  {
    question: "Vou receber certificado?",
    answer:
      "Sim! Ao concluir as aulas e atividades propostas, emitimos um certificado de participação.",
  },
  {
    question: "Como tiro dúvidas fora do horário da aula?",
    answer:
      "Você terá acesso aos canais exclusivos da comunidade Codante PRO para suporte contínuo com o time e outros devs.",
  },
  {
    question: "Posso pedir reembolso?",
    answer:
      "Políticas de reembolso serão compartilhadas por e-mail antes da abertura das matrículas.",
  },
];

export const meta: MetaFunction = () => {
  const title = "Curso ao Vivo  Codando com IA | Codante";
  const description =
    "Integre IA ao seu workflow com TypeScript no primeiro curso ao vivo da Codante. Aulas das 19h às 21h, comunidade, certificado e assinatura anual inclusa.";

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://codante.io/curso-ao-vivo/codando-com-ia",
    },
    { property: "twitter:card", content: "summary_large_image" },
    { property: "twitter:title", content: title },
    { property: "twitter:description", content: description },
  ];
};

export const loader = async () => {
  const homeInfo = await getHome();
  return { homeInfo };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const email = (formData.get("email") as string) ?? "";
  const name = (formData.get("name") as string) ?? "";

  return registerMarketingLead(request, {
    email,
    name,
    tag: COURSE_TAG,
  });
};

export default function CodandoComIaLandingPage() {
  const { homeInfo } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const testimonials = homeInfo.featured_testimonials?.slice(0, 3) ?? [];

  return (
    <div className="flex flex-col items-center justify-center text-gray-900 dark:text-gray-5">
      <BackgroundBlur />
      <Hero actionData={actionData} />
      <Benefits />
      <Audience />
      <Schedule />
      <Logistics />
      <Instructors />
      <Offer />
      <Testimonials testimonials={testimonials} />
      <Faq />
      <FinalCta actionData={actionData} />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  return <Error500 error={error} />;
}

type LeadFeedback = Awaited<ReturnType<typeof registerMarketingLead>>;

function Hero({ actionData }: { actionData: LeadFeedback | undefined }) {
  return (
    <section className="flex justify-center w-full pt-16 md:pt-20">
      <div className="container grid gap-10 lg:grid-cols-[2fr_1fr] items-start">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <span className="text-sm uppercase tracking-wide text-amber-500">
              🔴 Curso ao vivo do Codante
            </span>
            <h1 className="text-4xl xl:text-5xl font-lexend max-w-3xl dark:text-white text-gray-800">
              Curso ao Vivo - Codando com IA
            </h1>
            <p className="text-lg font-light max-w-2xl text-gray-700 dark:text-gray-500">
              Aprenda a integrar IA no seu workflow e nas suas aplicações em
              TypeScript. Encontros ao vivo sempre das 19h às 21h, com tempo
              dedicado a perguntas.
            </p>
            <div className="flex items-center gap-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span>05/11/2025 a 10/12/2025 • aulas das 19h às 21h</span>
            </div>
          </div>
          {/* <div className="grid gap-4 sm:grid-cols-2 mt-8">
            <HighlightCard
              title="Preço garantido"
              description="R$599 à vista ou em 12x. Assinantes Codante PRO participam sem custo extra."
            />
            <HighlightCard
              title="E ganhe 1 ano de Codante"
              description="Compre o curso e receba 1 ano de acesso Codante!"
            />
          </div> */}
          <ul className="flex flex-col sm:flex-row gap-3 text-sm text-gray-700 dark:text-gray-200">
            <li className="px-4 py-2 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-500/10 dark:text-amber-300">
              Aulas ao vivo com dúvidas respondidas
            </li>
            <li className="px-4 py-2 rounded-full bg-blue-100 text-blue-900 dark:bg-blue-500/10 dark:text-blue-300">
              Comunidade Codante PRO
            </li>
            <li className="px-4 py-2 rounded-full bg-emerald-100 text-emerald-900 dark:bg-emerald-500/10 dark:text-emerald-300">
              Certificado ao concluir
            </li>
          </ul>
        </div>

        <LeadFormCard actionData={actionData} />
      </div>
    </section>
  );
}

// function HighlightCard({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="rounded-xl border border-background-200 dark:border-background-700 bg-white/80 dark:bg-background-800/80 backdrop-blur-sm p-5 shadow-sm">
//       <h3 className="text-base font-semibold text-gray-900 dark:text-gray-50">
//         {title}
//       </h3>
//       <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
//         {description}
//       </p>
//     </div>
//   );
// }

function LeadFormCard({
  actionData,
}: {
  actionData: LeadFeedback | undefined;
}) {
  return (
    <div className="w-full rounded-2xl border border-background-200 dark:border-background-700 bg-white dark:bg-background-900 p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">
        Entre na lista de interesse
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Avise a gente que você quer participar. Vamos te enviar a abertura das
        vagas e os próximos passos direto no seu e-mail.
      </p>
      <Form method="post" replace className="flex flex-col gap-4" noValidate>
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          Nome
          <input
            required
            name="name"
            type="text"
            placeholder="Seu nome"
            className="w-full rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          E-mail
          <input
            required
            name="email"
            type="email"
            placeholder="seuemail@exemplo.com"
            className="w-full rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </label>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 transition-colors"
        >
          Quero ser avisado
        </button>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Ao enviar o formulário você concorda em receber e-mails do Codante
          sobre o curso.
        </p>
        {actionData?.success && (
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            {actionData.success}
          </p>
        )}
        {actionData?.error && (
          <p className="text-sm text-red-600 dark:text-red-400">
            {actionData.error}
          </p>
        )}
      </Form>
    </div>
  );
}

function Benefits() {
  return (
    <section className="flex justify-center w-full mt-24">
      <div className="container flex flex-col gap-8">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend  text-gray-800 dark:text-white"
        >
          O que você leva com o Codando com IA
        </BlurRevealText>
        <div className="grid gap-6 md:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-background-200 dark:border-background-700 bg-white/70 dark:bg-background-800/80 backdrop-blur-sm p-6"
            >
              <div className="flex flex-col sm:flex-row items-start gap-5">
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-amber-500/10 border border-amber-400/30 dark:border-amber-500/40 flex items-center justify-center text-amber-600 dark:text-amber-300">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section className="flex justify-center w-full mt-24">
      <div className="container grid gap-8 md:grid-cols-[1.4fr_1fr] items-start">
        <div className="rounded-3xl border border-background-200 dark:border-background-700 bg-white dark:bg-background-900 p-8">
          <h2 className="text-3xl font-lexend mb-4 text-gray-800 dark:text-white">
            Para devs que querem acelerar com IA
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-200 max-w-xl">
            Se você já tem noções básicas de JavaScript ou TypeScript, esse
            curso vai te mostrar como usar modelos de IA no seu fluxo diário sem
            enrolação.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
            <li>• Quer aproveitar IA para entregar mais rápido e melhor.</li>
            <li>
              • Está começando com TypeScript e precisa de boas práticas na
              prática.
            </li>
            <li>
              • Procura mentoria ao vivo com quem já constrói produtos com IA.
            </li>
          </ul>
        </div>
        {/* <div className="rounded-3xl border border-amber-200 dark:border-amber-500/40 bg-amber-500/10 dark:bg-amber-500/10 p-8">
          <h3 className="text-xl font-semibold text-amber-700 dark:text-amber-300">
            Não é para você se...
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-amber-800 dark:text-amber-200">
            <li>• Busca um curso totalmente introdutório sem código.</li>
            <li>• Prefere conteúdo gravado sem interação ao vivo.</li>
          </ul>
        </div> */}
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="flex justify-center w-full mt-24">
      <div className="container flex flex-col gap-6">
        <div>
          <span className="text-sm uppercase tracking-wide text-amber-500">
            Aulas das 19h às 21h
          </span>
          <h2 className="text-3xl md:text-4xl font-lexend mt-2 text-gray-800 dark:text-white">
            Cronograma ao vivo
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mt-2">
            Seis encontros consecutivos para dominar modelos, contexto, MCPs,
            RAG e um agente completo em produção.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {schedule.map((session, index) => {
            const asset = instructorAssets[session.instructor];
            const lessonNumber = String(index + 1).padStart(2, "0");

            return (
              <article
                key={session.id}
                className="rounded-2xl border border-background-200/60 dark:border-background-800/80 bg-gradient-to-br from-background-50/95 via-white/85 to-amber-50/40 dark:from-background-900/80 dark:via-background-900/65 dark:to-background-800/55 shadow-lg backdrop-blur p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-500 dark:text-brand-300">
                      <span className="font-normal text-gray-400 dark:text-gray-500">
                        {lessonNumber} -
                      </span>{" "}
                      {session.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400/90 flex items-center gap-2 mt-3">
                      <Calendar className="h-4 w-4" />
                      {session.date}/2025
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400/90 flex items-center gap-2 mt-1 mb-4">
                      <User className="h-4 w-4" />
                      {session.instructor}
                    </p>
                  </div>
                  {asset ? (
                    <img
                      src={asset.imageSrc}
                      alt={asset.imageAlt}
                      className="h-16 w-16 rounded-full object-cover border border-background-200 dark:border-background-700"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-full border border-dashed border-gray-400 dark:border-gray-600 flex items-center justify-center text-xs text-gray-500">
                      Foto
                    </div>
                  )}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      Teoria
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300/90">
                      {session.theoryTopics.map((topic) => (
                        <li key={topic}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                      Prática
                    </h4>
                    <ul className="mt-2 space-y-2 text-sm text-gray-600 dark:text-gray-300/90">
                      {session.practiceTopics.map((topic) => (
                        <li key={topic}>• {topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Logistics() {
  return (
    <section className="flex justify-center w-full mt-24">
      <div className="container grid gap-6 md:grid-cols-3">
        <LogisticsCard
          title="Plataforma Codante"
          description="Todas as aulas acontecem dentro da nossa plataforma. Link e instruções chegam por e-mail."
          icon={MonitorSmartphone}
        />
        <LogisticsCard
          title="Replays e materiais"
          description="Detalhes sobre gravações, slides e repositórios serão confirmados com a turma por e-mail."
          icon={FileText}
        />
        <LogisticsCard
          title="Suporte na comunidade"
          description="Tire dúvidas nos canais exclusivos da Codante PRO e acompanhe discussões entre as aulas."
          icon={Users}
        />
      </div>
    </section>
  );
}

function LogisticsCard({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}) {
  return (
    <div className="rounded-2xl border border-background-200 dark:border-background-700 bg-white/70 dark:bg-background-900/70 backdrop-blur p-6 flex flex-col gap-3">
      <div className="h-10 w-10 rounded-lg border border-background-200 dark:border-background-700 bg-background-50 dark:bg-background-800 text-amber-600 dark:text-amber-300 flex items-center justify-center">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
}

function Instructors() {
  return (
    <section className="flex justify-center w-full mt-24">
      <div className="container flex flex-col gap-8">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend max-w-xl text-gray-800 dark:text-white"
        >
          Instrutores que aplicam IA em produção
        </BlurRevealText>
        <div className="grid gap-6 md:grid-cols-2">
          <InstructorCard
            name="Ícaro Harry"
            role="Co-fundador do Codante, dev front-end e professor"
            bio="Desenvolvedor front-end há 10 anos e professor há 4. Já treinou mais de 600 pessoas no Brasil e na Europa, liderando turmas de até 450 alunos e atuando com React, Vue, Angular, Next.js e Remix."
            imageSrc="/img/vendas/icaro.webp"
          />
          <InstructorCard
            name="Roberto Cestari"
            role="Co-fundador do Codante, Tech Lead e CTO"
            bio="Ex-Tech Lead de front-end responsável por um time de 20+ pessoas e pelo currículo de uma grande edtech. Fundador e CTO do Trilhante, plataforma com 20k aulas, 117k usuários e 25k assinaturas, além de 29 milhões de aulas assistidas no YouTube."
            imageSrc="/img/vendas/cestari.webp"
          />
        </div>
      </div>
    </section>
  );
}

function InstructorCard({
  name,
  bio,
  role,
  imageSrc,
}: {
  name: string;
  bio: string;
  role: string;
  imageSrc: string;
}) {
  return (
    <article className="rounded-3xl border border-background-200 dark:border-background-700 bg-white dark:bg-background-900 p-8 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img
          src={imageSrc}
          alt={`Foto de ${name}`}
          className="h-32 w-32 rounded-full object-cover border border-background-200 dark:border-background-700"
        />
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            {name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300">{bio}</p>
    </article>
  );
}

function Offer() {
  return (
    <section className="flex justify-center w-full mt-24">
      <div className="container flex flex-col gap-8">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend max-w-2xl text-gray-800 dark:text-white"
        >
          Acesso garantido para assinantes e não assinantes
        </BlurRevealText>
        <div className="grid gap-6 md:grid-cols-2">
          <OfferCard
            title="Assinante Codante PRO"
            price="Incluso"
            details={[
              "Participação garantida sem custo adicional",
              "Prioridade na confirmação da vaga",
              "Acesso contínuo à comunidade e conteúdos PRO",
            ]}
            accent="bg-emerald-500/10 border-emerald-500/50"
          />
          <OfferCard
            title="Não assinante"
            price="R$599"
            footer="Parcelamento em até 12x • Inclui 1 ano de Codante PRO"
            details={[
              "Todas as aulas ao vivo",
              "Assinatura anual Codante PRO inclusa",
              "Certificado + acesso à comunidade",
            ]}
            accent="bg-amber-500/10 border-amber-500/50"
          />
        </div>
      </div>
    </section>
  );
}

function OfferCard({
  title,
  price,
  details,
  footer,
  accent,
}: {
  title: string;
  price: string;
  details: string[];
  footer?: string;
  accent: string;
}) {
  return (
    <article
      className={`rounded-3xl border ${accent} bg-white dark:bg-background-900 p-8 flex flex-col gap-6`}
    >
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
          {price}
        </p>
      </div>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        {details.map((detail) => (
          <li key={detail}>• {detail}</li>
        ))}
      </ul>
      {footer ? (
        <p className="text-xs text-gray-500 dark:text-gray-400">{footer}</p>
      ) : (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Detalhes adicionais serão enviados por e-mail.
        </p>
      )}
    </article>
  );
}

function Testimonials({
  testimonials,
}: {
  testimonials: NonNullable<
    Awaited<ReturnType<typeof getHome>>["featured_testimonials"]
  >;
}) {
  if (!testimonials.length) return null;

  return (
    <section className="flex justify-center w-full mt-24">
      <div className="container flex flex-col items-center gap-6">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend text-center max-w-2xl text-gray-800 dark:text-white"
        >
          Quem já aprende com a Codante
        </BlurRevealText>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 w-full">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial.body}
              avatarUrl={testimonial.avatar_url}
              name={testimonial.name}
              socialMediaProfileName={testimonial.social_media_nickname}
              socialMediaProfileUrl={testimonial.social_media_link}
              columnSpanClassName="col-span-1"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="flex justify-center w-full mt-24">
      <div className="container flex flex-col gap-6">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend max-w-xl text-gray-800 dark:text-white"
        >
          Perguntas frequentes
        </BlurRevealText>
        <div className="grid gap-4 md:grid-cols-2" data-faq-grid>
          {faqs.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              className="!mx-0 !mb-0 h-full"
            ></FaqItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ actionData }: { actionData: LeadFeedback | undefined }) {
  return (
    <section className="flex justify-center w-full mt-24 mb-24">
      <div className="container rounded-3xl border border-amber-200 dark:border-amber-500/40 bg-amber-500/10 dark:bg-amber-500/10 p-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-lexend text-gray-800 dark:text-white">
              Garanta prioridade no primeiro curso ao vivo da Codante
            </h2>
            <p className="text-sm text-amber-900/80 dark:text-amber-100">
              Preencha seus dados e receba a confirmação de vaga assim que
              abrirmos as inscrições.
            </p>
          </div>
          <LeadFormCompact actionData={actionData} />
        </div>
      </div>
    </section>
  );
}

function LeadFormCompact({
  actionData,
}: {
  actionData: LeadFeedback | undefined;
}) {
  return (
    <Form
      method="post"
      replace
      className="flex flex-col gap-3 bg-white dark:bg-background-900 rounded-2xl border border-amber-200 dark:border-amber-500/30 p-6 shadow-sm"
      noValidate
    >
      <label className="flex flex-col text-xs font-semibold text-gray-700 dark:text-gray-300 gap-1">
        Nome
        <input
          required
          name="name"
          type="text"
          placeholder="Seu nome"
          className="rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </label>
      <label className="flex flex-col text-xs font-semibold text-gray-700 dark:text-gray-300 gap-1">
        E-mail
        <input
          required
          name="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          className="rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
        />
      </label>
      <button
        type="submit"
        className="rounded-lg bg-amber-600 hover:bg-amber-700 text-gray-900 font-semibold py-2 text-sm transition-colors"
      >
        Quero participar
      </button>
      {actionData?.success && (
        <p className="text-xs text-emerald-600 dark:text-emerald-400">
          {actionData.success}
        </p>
      )}
      {actionData?.error && (
        <p className="text-xs text-red-600 dark:text-red-400">
          {actionData.error}
        </p>
      )}
    </Form>
  );
}
