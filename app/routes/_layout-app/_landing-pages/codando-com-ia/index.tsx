import { useState, useEffect, type ComponentType } from "react";
import {
  Form,
  isRouteErrorResponse,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useRouteError,
} from "react-router";
import type { ActionFunctionArgs, MetaFunction } from "react-router";
import { withMask } from "use-mask-input";
import { useMetaPixel } from "~/lib/hooks/useMetaPixel";

import BackgroundBlur from "~/components/_layouts/background-blur";
import { Error500 } from "~/components/features/error-handling/500";
import NotFound from "~/components/features/error-handling/not-found";
import FaqItem from "~/components/ui/faq-item";
import { BlurRevealText } from "~/components/ui/motion/blur-reveal/text";
import TestimonialCard from "~/routes/_landing-page/components/testimonials/card";
import { registerMarketingLead } from "~/lib/models/lead.server";
import { createCheckoutLinkV2 } from "~/lib/models/pagarme.server";
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
  MessageCircle,
  Sparkles,
  Code,
  FolderOpen,
} from "lucide-react";
import TooltipWrapper from "~/components/ui/tooltip";
import { BsInfoCircle } from "react-icons/bs";

const COURSE_TAG = "curso-ao-vivo-codando-com-ia-v1";
const LEAD_FORM_STORAGE_KEY = "codante-codando-com-ia-lead-form";

type StoredLeadData = {
  name: string;
  email: string;
  phone: string;
};

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
      "O que são LLMs / IA Generativa",
      "Prompts, Tokens, Context Window",
      "Provedores de Inferência",
      "Input vs Output vs Cache Read vs Cache Write",
      "Benchmarks",
      "Chat, IDE, CLIs, APIs",
      "Setup do ambiente - Gratuito",
      "Setup do ambiente - Recomendado",
      "Aspectos de segurança e privacidade",
      "Ferramentas atuais",
    ],
    practiceTopics: [
      "Configuração de Setup",
      "Primeiro projeto usando setup recomendado",
    ],
  },
  {
    id: "aula-02",
    date: "12/11",
    instructor: "Roberto Cestari",
    title: 'Modelos de IA - O "Estado da Arte" atual',
    theoryTopics: [
      "Modelos 'State Of The Art' ",
      "Open Source vs Closed Source vs Local",
      "Contexto e Tamanho de Contexto",
      "Tokenizer",
      "Gateways: OpenRouter e AI Gateway",
      "OpenRouter - Dicas e uso",
      "Capacidades de Modelos (visão, tooling, áudio)",
      "Padrão de APIs populares (responses e chat completions)",
    ],
    practiceTopics: [
      "Usando APIs da Openai e do Claude",
      "Criando nosso primeiro chatbot",
      "Criando um app que responde à mesma pergunta com 3 modelos diferentes",
    ],
  },
  {
    id: "aula-03",
    date: "19/11",
    instructor: "Ícaro Harry",
    title: "Context - Boas Práticas",
    theoryTopics: [
      "Prompt Engineering",
      "Estrutura de Prompt Ideal",
      "Técnicas para prompts mais eficazes",
      "Context Engineering",
      "Por que + Contexto é diferente de + qualidade",
      "Claude.md, Agents.md",
      "Skills (Anthropic)",
    ],
    practiceTopics: ["TBD"],
  },
  {
    id: "aula-04",
    date: "26/11",
    instructor: "Roberto Cestari",
    title: "MCPs",
    theoryTopics: [
      "O que é MCP",
      "Lista dos Principais MCPs",
      "Como utilizar MCPs em diferentes clientes",
      "Criando um MCP server",
    ],
    practiceTopics: [
      "Usando alguns dos MCPs mais populares",
      "Criando um MCP server simples",
      "MCP avançado da tabela TACO/TBCA",
    ],
  },
  {
    id: "aula-05",
    date: "03/12",
    instructor: "Roberto Cestari",
    title: "AI SDK - A lib mais popular para agentes",
    theoryTopics: [
      "O que é AI SDK",
      "Como funciona o AI SDK",
      "Prompts e Respostas",
      "Mensagens no front e no backend",
      "Provedores no contexto do AI SDK",
    ],
    practiceTopics: [
      "Criando um chatbot simples com Next.js e AI SDK",
      "Conectando nosso MCP da tabela TACO no nosso chatbot",
    ],
  },
  {
    id: "aula-06",
    date: "10/12",
    instructor: "Ícaro Harry",
    title: "Tools e RAG",
    theoryTopics: [
      "Ferramentas - padrão de setup",
      "O que é RAG - fundamentos",
      "Embeddings",
      "Vetores",
      "Chunking",
      "Vector DBs populares",
    ],
    practiceTopics: [
      "App com memória usando RAG - Assistente Nutricional",
      "Adicionando tools ao app",
    ],
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
    title: "Ganhe 1 ano de Codante PRO",
    description: "Não assinantes ganham 1 ano de Codante ao garantir o curso.",
    icon: Gift,
  },
  {
    title: "Grupo de WhatsApp exclusivo",
    description:
      "Conecte-se com outros alunos e instrutores para trocar experiências e dúvidas.",
    icon: MessageCircle,
  },
  {
    title: "Projetos práticos e código fonte",
    description:
      "Acesso ao código completo dos projetos desenvolvidos durante as aulas para estudo e referência.",
    icon: FolderOpen,
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
      "O curso custa R$588 com possibilidade de parcelamento em até 12x. Ao comprar, você recebe uma assinatura anual do Codante.",
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
  const phone = (formData.get("phone") as string) ?? "";
  const isCodantePro = formData.get("isCodantePro") === "true";
  const leadTag = isCodantePro ? `${COURSE_TAG}-assinante-codante` : COURSE_TAG;

  // Always attempt to register the lead (for tracking/analytics)
  const leadResponse = await registerMarketingLead(request, {
    email,
    name,
    phone,
    tag: leadTag,
  });

  // For Pro users, return the lead response (success or error)
  // They don't need checkout, so we show them the registration result
  if (isCodantePro) {
    return leadResponse?.error
      ? leadResponse
      : ({
          success:
            leadResponse?.success ??
            "Cadastro realizado. Como assinante Codante PRO, você já tem acesso gratuito ao curso!",
        } satisfies LeadFeedback);
  }

  // For non-Pro users, always proceed to checkout
  // Lead registration errors (like duplicate) should not block checkout
  try {
    const checkout = await createCheckoutLinkV2({
      request,
      planSlug: "codando-com-ia-v1",
    });

    if (!checkout.url) {
      return {
        error:
          "Não foi possível iniciar o checkout agora. Por favor, tente novamente em instantes.",
      };
    }

    return redirect(checkout.url);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Não foi possível iniciar o checkout agora. Por favor, tente novamente em instantes.";

    return {
      error: errorMessage,
    };
  }
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
      <AiSdkSection />
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
            <h1 className="text-4xl xl:text-7xl font-bold font-lexend max-w-3xl dark:text-white text-gray-800">
              Codando com IA
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
              description="R$588 à vista ou em 12x. Assinantes Codante PRO participam sem custo extra."
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
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    isCodantePro: false,
  });

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDisabled = isSubmitting;

  const { trackLead, trackInitiateCheckout } = useMetaPixel();

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LEAD_FORM_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored) as StoredLeadData;
        setFormValues((prev) => ({
          ...prev,
          name: data.name,
          email: data.email,
          phone: data.phone,
        }));
      } catch {
        // Ignore parsing errors silently
      }
    }
  }, []);

  const handleFormSubmit = () => {
    // Track Lead event
    trackLead({
      value: "0",
      currency: "BRL",
    });

    // Track InitiateCheckout se não for Codante PRO
    if (!formValues.isCodantePro) {
      trackInitiateCheckout({
        value: "0",
        currency: "BRL",
      });

      // Save to localStorage ONLY for non-Pro users
      try {
        localStorage.setItem(
          LEAD_FORM_STORAGE_KEY,
          JSON.stringify({
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
          }),
        );
      } catch {
        // Ignore storage errors silently
      }
    }
  };

  return (
    <div className="w-full rounded-2xl border border-background-200 dark:border-background-700 bg-white dark:bg-background-900 p-6 shadow-xl">
      <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">
        Quero me Inscrever
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Avise a gente que você quer participar. Vamos te enviar a abertura das
        vagas e os próximos passos direto no seu e-mail.
      </p>
      <Form
        id="lead-form"
        method="post"
        replace
        className="flex flex-col gap-4"
        onSubmit={handleFormSubmit}
      >
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          Nome
          <input
            required
            name="name"
            type="text"
            placeholder="Seu nome"
            value={formValues.name}
            onChange={(event) =>
              setFormValues((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium text-gray-800 dark:text-gray-200">
          Celular
          <input
            required
            name="phone"
            type="text"
            placeholder="(11) 99999-9999"
            value={formValues.phone}
            ref={withMask("(99) 99999-9999")}
            onChange={(event) =>
              setFormValues((prev) => ({
                ...prev,
                phone: event.target.value,
              }))
            }
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
            value={formValues.email}
            onChange={(event) =>
              setFormValues((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            className="w-full rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </label>
        <div className="flex items-center justify-start gap-2 rounded-lg  px-4 pl-2 py-3">
          <label className="flex items-center gap-3 text-sm font-medium text-gray-800 dark:text-gray-200">
            <input
              type="checkbox"
              name="isCodantePro"
              value="true"
              checked={formValues.isCodantePro}
              onChange={(event) =>
                setFormValues((prev) => ({
                  ...prev,
                  isCodantePro: event.target.checked,
                }))
              }
              className="h-4 w-4 rounded border-background-300 text-amber-500 focus:ring-amber-500"
            />
            <span>Já sou assinante do Codante PRO</span>
          </label>
          <TooltipWrapper text="Se você já é assinante do Codante, você já tem acesso a esse curso gratuitamente, basta se inscrever.">
            <BsInfoCircle className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:text-background-500 dark:hover:text-background-300" />
          </TooltipWrapper>
        </div>
        <button
          type="submit"
          disabled={isDisabled}
          aria-disabled={isDisabled}
          aria-busy={isSubmitting}
          className={`inline-flex items-center justify-center gap-2 rounded-lg text-gray-900 font-semibold py-3 transition-colors ${
            isDisabled
              ? "bg-amber-200 cursor-not-allowed opacity-70"
              : "bg-amber-500 hover:bg-amber-600"
          }`}
        >
          {isSubmitting && (
            <svg
              className="h-4 w-4 animate-spin text-gray-900"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          )}
          <span>{isSubmitting ? "Enviando..." : "Quero me Inscrever"}</span>
        </button>
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
    <section className="flex justify-center w-full mt-32">
      <div className="container flex flex-col gap-8">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend  text-gray-800 dark:text-white"
        >
          O que você leva com o <strong>Codando com IA</strong>
        </BlurRevealText>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  {benefit.title === "Ganhe 1 ano de Codante PRO" && (
                    <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 italic">
                      Não, não é pegadinha. Comprando o curso você ganha acesso
                      ilimitado ao Codante por 1 ano! 🎁
                    </p>
                  )}
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
    <section className="flex justify-center w-full mt-32">
      <div className="container grid gap-8 md:grid-cols-2 items-stretch">
        <div className="rounded-3xl border border-background-200 dark:border-background-700 bg-white dark:bg-background-900 p-8 flex flex-col">
          <h2 className="text-2xl font-lexend mb-4 text-gray-800 dark:text-brand-300 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-brand-500" />
            Acelere seu workflow com IA
          </h2>
          <p className="text-base font-light text-gray-700 dark:text-gray-400 max-w-xl">
            Se você já tem noções básicas de JavaScript ou TypeScript, esse
            curso vai te mostrar como usar modelos de IA no seu workflow diário
            sem enrolação.
          </p>
          <ul className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300 flex-1">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>Quer
              aproveitar IA para entregar mais rápido e melhor.
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>Está
              começando com TypeScript e precisa de boas práticas na prática.
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>Procura
              mentoria ao vivo com quem já constrói produtos com IA.
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-background-200 dark:border-background-700 bg-white dark:bg-background-900 p-8 flex flex-col">
          <h2 className="text-2xl font-lexend mb-4 text-gray-800 dark:text-brand-300 flex items-center gap-2">
            <Code className="h-6 w-6 text-brand-500" />
            Tecnologias que iremos aprender
          </h2>
          <p className="text-base font-light text-gray-700 dark:text-gray-400 max-w-xl mb-6">
            Stack completa para construir aplicações inteligentes com IA
            integrada ao seu workflow.
          </p>
          <div className="grid gap-3 flex-1">
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>LLMs e IA Generativa</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>Principais APIs (Chat completions, Responses)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>Prompt e Context Engineering</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>MCPs (Model Context Protocol)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>AI SDK para agentes</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>RAG e Vector Databases</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
              <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
              <span>TypeScript em produção</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Schedule() {
  return (
    <section className="flex justify-center w-full mt-32">
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
                className="rounded-2xl border border-background-200/60 dark:border-background-800/80 bg-gradient-to-br from-background-50/95 via-white/85 to-amber-50/40 dark:from-background-900/80 dark:via-background-900/65 dark:to-background-800/55 shadow-lg backdrop-blur p-6 flex flex-col gap-4 transition-all duration-300 hover:!border-blue-300 hover:shadow-xl"
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
    <section className="flex justify-center w-full mt-32">
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
    <section className="flex justify-center w-full mt-32">
      <div className="container flex flex-col gap-8">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend  text-gray-800 dark:text-white"
        >
          Quem serão seus instrutores?
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

function AiSdkSection() {
  return (
    <section className="flex justify-center w-full mt-32">
      <div className="container flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <BlurRevealText
              element="h2"
              className="text-3xl md:text-4xl font-lexend text-gray-800 dark:text-white flex items-center gap-2"
            >
              <Sparkles className="h-6 w-6 " />
              <strong>AI SDK da Vercel</strong>: A biblioteca mais popular para
              agentes
            </BlurRevealText>
          </div>
        </div>
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="flex flex-col gap-6">
            <p className="text-lg text-gray-700 dark:text-gray-200">
              Durante o curso, você vai dominar o{" "}
              <strong>AI SDK da Vercel</strong>, uma das principais bibliotecas
              para criar agentes e workflows inteligentes com TypeScript.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                    API Unificada
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Integração simplificada com múltiplos provedores (OpenAI,
                    Anthropic, Google) sem alterar código
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                    Streaming em Tempo Real
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Respostas dinâmicas e feedback instantâneo para melhor
                    experiência do usuário
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-50">
                    Saídas Estruturadas
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Validação com Zod e geração de dados estruturados garantindo
                    qualidade
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-background-200 dark:border-background-700 bg-gradient-to-br from-emerald-50/50 to-blue-50/30 dark:from-emerald-900/20 dark:to-blue-900/20 p-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 mb-4">
              Por que escolher o AI SDK?
            </h3>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span>
                  Compatível com React, Next.js e qualquer ambiente JavaScript
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span>
                  Construção de agentes com chamadas de ferramentas e loops de
                  feedback
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span>TypeScript nativo com tipagem completa</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                <span>Comunidade ativa e documentação excelente</span>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-sm text-emerald-800 dark:text-emerald-200 font-medium">
                💡 <strong>Dica:</strong> O AI SDK é usado por empresas como
                Vercel, Linear e outras startups de sucesso para construir
                produtos com IA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Offer() {
  return (
    <section className="flex justify-center w-full mt-32">
      <div className="container flex flex-col gap-8">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend  text-gray-800 dark:text-white text-center"
        >
          Qual é o valor do curso?
        </BlurRevealText>
        <div className="flex justify-center">
          <OfferCard
            title="Curso Codando com IA"
            price="12x de R$49"
            footer="Já é assinante Codante PRO? Você pode participar sem custo adicional"
            details={[
              "Todas as aulas ao vivo",
              "Mini Projetos e muita prática",
              "Ganhe 1 ano de Codante PRO",
              "Certificado + acesso à comunidade",
              "Assinantes Codante PRO participam sem custo adicional",
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
  const scrollToForm = () => {
    const formElement = document.getElementById("lead-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <article
      className={`rounded-3xl border ${accent} bg-white dark:bg-background-900 p-8 flex flex-col gap-6`}
    >
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
          {title}
        </h3>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-2">
          {price === "12x de R$49" ? (
            <>
              12x de{" "}
              <span className="text-amber-600 dark:text-amber-400">R$49</span>
            </>
          ) : (
            price
          )}
        </p>
      </div>
      <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        {details.map((detail) => (
          <li key={detail}>• {detail}</li>
        ))}
      </ul>
      <div className="mt-8">
        <button
          onClick={scrollToForm}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold py-3 transition-colors w-full disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-100"
          disabled={false}
          title="Clique para ir ao formulário de inscrição"
        >
          Quero me inscrever
        </button>
        {footer ? (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            {footer}
          </p>
        ) : (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
            Detalhes adicionais serão enviados por e-mail.
          </p>
        )}
      </div>
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
    <section className="flex justify-center w-full mt-32">
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
    <section className="flex justify-center w-full mt-32">
      <div className="container flex flex-col gap-6">
        <BlurRevealText
          element="h2"
          className="text-3xl md:text-4xl font-lexend max-w-xl text-gray-800 dark:text-white"
        >
          Perguntas frequentes
        </BlurRevealText>
        <div className="grid gap-4" data-faq-grid>
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
    <section className="flex justify-center w-full mt-32 mb-24">
      <div className="container rounded-3xl border border-blue-200 dark:border-blue-500/40 bg-blue-500/10 dark:bg-blue-500/10 p-10">
        <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-lexend text-gray-800 dark:text-white">
              Garanta prioridade no primeiro curso ao vivo da Codante
            </h2>
            <p className="text-sm text-blue-900/80 dark:text-blue-100">
              Preencha seus dados e se inscreva. As vagas são limitadas. Temos
              certeza que você vai se surpreender com o curso.
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
  const [formValues, setFormValues] = useState({
    name: "",
    phone: "",
    email: "",
    isCodantePro: false,
  });

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isDisabled = isSubmitting;

  const { trackLead, trackInitiateCheckout } = useMetaPixel();

  // Load saved form data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LEAD_FORM_STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored) as StoredLeadData;
        setFormValues((prev) => ({
          ...prev,
          name: data.name,
          email: data.email,
          phone: data.phone,
        }));
      } catch {
        // Ignore parsing errors silently
      }
    }
  }, []);

  const handleFormSubmit = () => {
    // Track Lead event
    trackLead({
      value: "0",
      currency: "BRL",
    });

    // Track InitiateCheckout se não for Codante PRO
    if (!formValues.isCodantePro) {
      trackInitiateCheckout({
        value: "0",
        currency: "BRL",
      });

      // Save to localStorage ONLY for non-Pro users
      try {
        localStorage.setItem(
          LEAD_FORM_STORAGE_KEY,
          JSON.stringify({
            name: formValues.name,
            email: formValues.email,
            phone: formValues.phone,
          }),
        );
      } catch {
        // Ignore storage errors silently
      }
    }
  };

  return (
    <Form
      method="post"
      replace
      className="flex flex-col gap-3 bg-white dark:bg-background-900 rounded-2xl border border-blue-200 dark:border-blue-500/30 p-6 shadow-sm"
      onSubmit={handleFormSubmit}
    >
      <label className="flex flex-col text-xs font-semibold text-gray-700 dark:text-gray-300 gap-1">
        Nome
        <input
          required
          name="name"
          type="text"
          placeholder="Seu nome"
          value={formValues.name}
          onChange={(event) =>
            setFormValues((prev) => ({
              ...prev,
              name: event.target.value,
            }))
          }
          className="rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="flex flex-col text-xs font-semibold text-gray-700 dark:text-gray-300 gap-1">
        Celular
        <input
          required
          name="phone"
          type="text"
          placeholder="(11) 99999-9999"
          value={formValues.phone}
          ref={withMask("(99) 99999-9999")}
          onChange={(event) =>
            setFormValues((prev) => ({
              ...prev,
              phone: event.target.value,
            }))
          }
          className="rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <label className="flex flex-col text-xs font-semibold text-gray-700 dark:text-gray-300 gap-1">
        E-mail
        <input
          required
          name="email"
          type="email"
          placeholder="seuemail@exemplo.com"
          value={formValues.email}
          onChange={(event) =>
            setFormValues((prev) => ({
              ...prev,
              email: event.target.value,
            }))
          }
          className="rounded-lg border border-background-200 dark:border-background-700 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>
      <div className="flex items-center justify-between rounded-lg   px-3 py-2">
        <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            name="isCodantePro"
            value="true"
            checked={formValues.isCodantePro}
            onChange={(event) =>
              setFormValues((prev) => ({
                ...prev,
                isCodantePro: event.target.checked,
              }))
            }
            className="h-3.5 w-3.5 rounded border-background-300 text-blue-500 focus:ring-blue-500"
          />
          <span>Já sou assinante do Codante PRO</span>
        </label>
        <TooltipWrapper text="Se você já é assinante do Codante, você já tem acesso a esse curso gratuitamente, basta se inscrever.">
          <BsInfoCircle className="h-4 w-4 text-gray-400 hover:text-gray-600 dark:text-background-500 dark:hover:text-background-300" />
        </TooltipWrapper>
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        aria-disabled={isDisabled}
        aria-busy={isSubmitting}
        className={`inline-flex items-center justify-center gap-2 rounded-lg text-gray-900 dark:text-white font-semibold py-2 text-sm transition-colors ${
          isDisabled
            ? "bg-blue-200 cursor-not-allowed opacity-70"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isSubmitting && (
          <svg
            className="h-3.5 w-3.5 animate-spin text-gray-900"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
        )}
        <span>{isSubmitting ? "Enviando..." : "Quero me Inscrever"}</span>
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
