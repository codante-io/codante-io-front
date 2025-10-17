import type { ActionFunctionArgs, MetaFunction } from "react-router";
import { Form, useActionData, useNavigation } from "react-router";
import Input from "~/components/features/form/input";
import LoadingButton from "~/components/features/form/loading-button";
import { getOgGeneratorUrl } from "~/lib/utils/path-utils";

type ActionData = { ok: true; message: string } | { ok: false; error: string };

export const meta: MetaFunction = () => {
  const title = "IA para Devs — Newsletter | Codante.io";
  const description =
    "Aprenda IA aplicada ao desenvolvimento: tutoriais práticos, prompts, ferramentas e novidades direto no seu e‑mail.";
  const imageUrl = getOgGeneratorUrl("IA para Devs — Newsletter do Codante");

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://codante.io/newsletter" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:domain", content: "codante.io" },
    { name: "twitter:url", content: "https://codante.io/newsletter" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    {
      name: "twitter:image:alt",
      content: "IA para Devs — Newsletter do Codante",
    },
  ];
};

function isValidEmail(email: string) {
  // simples validação de e-mail
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    return { ok: false, error: "Informe um e-mail." } satisfies ActionData;
  }
  if (!isValidEmail(email)) {
    return { ok: false, error: "E-mail inválido." } satisfies ActionData;
  }

  try {
    // Integração futura: chamar um endpoint interno (/_api/api/subscribe) ou serviço externo (Mailchimp, etc.)
    // Exemplo (comentado):
    // await fetch("/_api/api/subscribe", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });

    // Por ora, apenas retornamos sucesso localmente.
    return {
      ok: true,
      message:
        "Inscrição realizada com sucesso! Verifique seu e-mail para confirmar.",
    } satisfies ActionData;
  } catch {
    return {
      ok: false,
      error: "Não foi possível realizar a inscrição. Tente novamente.",
    } satisfies ActionData;
  }
}

export default function NewsletterPage() {
  const actionData = useActionData<ActionData>();
  const navigation = useNavigation();
  const status =
    navigation.state === "submitting"
      ? "submitting"
      : navigation.state === "loading"
        ? "loading"
        : "idle";

  const isSuccess = actionData && "ok" in actionData && actionData.ok;

  return (
    <div className="relative overflow-hidden">
      {/* background decorative blur / gradient */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/15 to-cyan-500/20 blur-3xl dark:from-indigo-500/25 dark:via-fuchsia-500/20 dark:to-cyan-500/25" />
        <div className="absolute bottom-[-10rem] left-[-10rem] h-80 w-80 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute bottom-[-8rem] right-[-8rem] h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
      </div>

      <section className="container mx-auto max-w-3xl px-4 py-14 md:py-20">
        <header className="text-center mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200/60 bg-purple-50/60 px-3 py-1 text-xs font-medium text-purple-700 dark:border-purple-900/40 dark:bg-purple-950/50 dark:text-purple-200">
            🚀 Novo
            <span className="h-1 w-1 rounded-full bg-purple-400" />
            IA para Devs
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-lexend tracking-tight">
            Aprenda a usar IA no seu dia a dia como dev
          </h1>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-gray-600 dark:text-gray-300 font-inter">
            Tutoriais práticos, prompts prontos, ferramentas e novidades sobre
            IA aplicada ao desenvolvimento. Conteúdo direto ao ponto, 1–2x por
            mês.
          </p>
        </header>

        {actionData &&
        !("ok" in actionData && actionData.ok) &&
        "error" in actionData ? (
          <div className="mb-4 rounded-md border border-red-300 bg-red-50 dark:bg-red-950/30 dark:border-red-900 text-red-700 dark:text-red-300 p-3 text-sm">
            {actionData.error}
          </div>
        ) : null}

        {isSuccess ? (
          <div className="rounded-md border border-green-300 bg-green-50 dark:bg-green-900/30 dark:border-green-900 text-green-800 dark:text-green-300 p-4 text-sm">
            {actionData && "message" in actionData
              ? actionData.message
              : "Inscrição realizada com sucesso!"}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200/70 bg-white/60 p-4 shadow-sm backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/60 md:p-6">
            <Form method="post" replace>
              <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                <div>
                  <Input
                    id="email"
                    name="email"
                    label="Seu e-mail"
                    type="email"
                    placeholder="voce@exemplo.com"
                    required
                  />
                </div>
                <LoadingButton
                  type="submit"
                  status={status as any}
                  isSuccessfulSubmission={false}
                  className="w-full md:w-auto"
                >
                  Inscrever-se
                </LoadingButton>
              </div>
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Sem spam. Envio ocasional com conteúdos de IA realmente úteis.
                Cancele quando quiser.
              </p>
            </Form>
          </div>
        )}

        {/* benefits */}
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          <li className="flex items-start gap-3 rounded-lg border border-gray-200/70 bg-white/40 p-3 text-sm backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/40">
            <span className="mt-0.5">✨</span>
            <p>
              Prompts e playbooks para tarefas reais de front-end e back-end.
            </p>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-gray-200/70 bg-white/40 p-3 text-sm backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/40">
            <span className="mt-0.5">🧠</span>
            <p>Como integrar IA no fluxo de trabalho: do PR ao deploy.</p>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-gray-200/70 bg-white/40 p-3 text-sm backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/40">
            <span className="mt-0.5">🛠️</span>
            <p>Ferramentas, APIs e exemplos práticos para devs.</p>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-gray-200/70 bg-white/40 p-3 text-sm backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/40">
            <span className="mt-0.5">📬</span>
            <p>Curadoria com o que realmente vale seu tempo.</p>
          </li>
        </ul>

        {/* social proof */}
        <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          Junte-se a milhares de devs que já aprendem com o Codante.
        </div>
      </section>

      {/* bottom callout */}
      {!isSuccess ? (
        <div className="border-t border-gray-200/70 bg-gradient-to-b from-white/40 to-white/10 py-8 dark:from-gray-900/40 dark:to-gray-900/10">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="rounded-xl border border-gray-200/70 bg-white/60 p-4 text-center shadow-sm backdrop-blur dark:border-gray-800/70 dark:bg-gray-900/60 md:p-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Receba a próxima edição da IA para Devs diretamente no seu
                e‑mail.
              </p>
              <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
                <Input
                  id="email-secondary"
                  name="email"
                  label="Seu e-mail"
                  type="email"
                  placeholder="voce@exemplo.com"
                  required
                />
                <LoadingButton
                  type="submit"
                  status={status as any}
                  isSuccessfulSubmission={false}
                  className="w-full md:w-auto"
                >
                  Assinar agora
                </LoadingButton>
              </div>
              <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                Usamos seu e-mail apenas para enviar a newsletter.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
