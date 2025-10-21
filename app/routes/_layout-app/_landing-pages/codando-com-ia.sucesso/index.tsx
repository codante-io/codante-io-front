import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs, MetaFunction } from "react-router";
import {
  getCodandoComIaOrderStatus,
  type CodandoComIaOrderStatus,
} from "~/lib/models/pagarme.server";

const PAGE_TITLE = "Pagamento - Codando com IA";

export const meta: MetaFunction = () => {
  const description =
    "Acompanhe o status da sua compra do curso Codando com IA e veja os próximos passos.";

  return [
    { title: PAGE_TITLE },
    { name: "description", content: description },
    { property: "og:title", content: PAGE_TITLE },
    { property: "og:description", content: description },
  ];
};

type LoaderData = {
  order: CodandoComIaOrderStatus | null;
  error: string | null;
};

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const orderId =
    url.searchParams.get("order_id") ?? url.searchParams.get("payment_link_id");

  if (!orderId) {
    return {
      order: null,
      error:
        "Não encontramos informações da sua compra. Tente novamente pelo link enviado pelo Pagar.me ou entre em contato conosco.",
    };
  }

  try {
    const order = await getCodandoComIaOrderStatus({ orderId });

    return { order, error: null };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Não foi possível confirmar o status da sua compra agora.";

    return {
      order: null,
      error: errorMessage,
    };
  }
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
});

export default function CodandoComIaCheckoutSuccess() {
  const { order, error } = useLoaderData<typeof loader>();

  if (error || !order) {
    return (
      <main className="flex justify-center w-full py-16">
        <div className="container max-w-2xl rounded-3xl border border-red-200/60 bg-white dark:bg-background-900 px-6 py-12 shadow-xl">
          <h1 className="text-3xl font-lexend text-red-600 dark:text-red-400">
            Não foi possível encontrar sua compra
          </h1>
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            {error ??
              "Verifique o link recebido no e-mail ou tente novamente mais tarde."}
          </p>
          <p className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            Se o pagamento foi concluído, envie o comprovante para{" "}
            <a
              className="text-brand font-semibold hover:underline"
              href="mailto:contato@codante.io"
            >
              contato@codante.io
            </a>{" "}
            para que possamos liberar seu acesso manualmente.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/curso-ao-vivo/codando-com-ia"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-5 py-3 font-semibold text-gray-900 hover:bg-amber-600"
            >
              Voltar para a landing
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg border border-background-200 px-5 py-3 font-semibold text-gray-800 hover:bg-background-100 dark:border-background-700 dark:text-gray-200"
            >
              Ir para a home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const status = (order.status ?? "").toLowerCase();
  const amountLabel =
    order.amount != null ? currencyFormatter.format(order.amount / 100) : null;

  const charges = order.charges ?? [];
  const primaryCharge = charges[0];
  const paymentMethod = primaryCharge?.payment_method ?? undefined;
  const chargeStatus = (primaryCharge?.status ?? "").toLowerCase();
  const lastTransaction = (primaryCharge?.last_transaction ?? {}) as Record<
    string,
    unknown
  >;
  const transactionStatus =
    typeof lastTransaction.status === "string"
      ? (lastTransaction.status as string).toLowerCase()
      : "";

  const boletoUrl =
    typeof lastTransaction.url === "string"
      ? (lastTransaction.url as string)
      : undefined;
  const boletoLine =
    typeof lastTransaction.line === "string"
      ? (lastTransaction.line as string)
      : typeof lastTransaction.barcode === "string"
        ? (lastTransaction.barcode as string)
        : undefined;
  const pixUrl =
    typeof lastTransaction.qr_code_url === "string"
      ? (lastTransaction.qr_code_url as string)
      : undefined;
  const pixCode =
    typeof lastTransaction.qr_code === "string"
      ? (lastTransaction.qr_code as string)
      : undefined;

  const hasPaidTransaction =
    status === "paid" ||
    chargeStatus === "paid" ||
    transactionStatus === "paid";

  const hasPendingTransaction =
    ["pending", "waiting_payment", "processing", "authorized"].includes(
      status,
    ) ||
    ["pending", "waiting_payment", "processing", "authorized"].includes(
      chargeStatus,
    ) ||
    ["pending", "waiting_payment", "processing", "authorized"].includes(
      transactionStatus,
    );

  const hasDeniedTransaction =
    [
      "failed",
      "canceled",
      "declined",
      "refunded",
      "voided",
      "overpaid",
    ].includes(status) ||
    [
      "failed",
      "canceled",
      "declined",
      "refunded",
      "voided",
      "overpaid",
    ].includes(chargeStatus) ||
    [
      "failed",
      "canceled",
      "declined",
      "refunded",
      "voided",
      "overpaid",
    ].includes(transactionStatus);

  const { title, subtitle, tone } = buildStatusCopy({
    status,
    paymentMethod,
    hasPaidTransaction,
    hasPendingTransaction,
    hasDeniedTransaction,
  });

  return (
    <main className="flex justify-center w-full py-16">
      <div className="container max-w-2xl rounded-3xl border border-background-200 dark:border-background-700 bg-white dark:bg-background-900 px-6 py-12 shadow-xl flex flex-col gap-8">
        <header className="flex flex-col gap-3 text-center">
          <span
            className={`inline-flex self-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${tone === "success" ? "bg-emerald-100 text-emerald-700" : tone === "warning" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-700"}`}
          >
            {statusBadgeLabel(status)}
          </span>
          <h1 className="text-3xl font-lexend text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-sm text-gray-700 dark:text-gray-300">{subtitle}</p>
        </header>

        <section className="rounded-2xl border border-background-200 dark:border-background-700 bg-background-50/70 dark:bg-background-800/70 p-6 flex flex-col gap-4 text-sm text-left text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-800 dark:text-gray-100">
              Pedido
            </span>
            <span>{order.id}</span>
          </div>
          {amountLabel && (
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                Valor total
              </span>
              <span>{amountLabel}</span>
            </div>
          )}
          {paymentMethod && (
            <div className="flex justify-between">
              <span className="font-semibold text-gray-800 dark:text-gray-100">
                Forma de pagamento
              </span>
              <span className="capitalize">
                {paymentMethod.replace("_", " ")}
              </span>
            </div>
          )}
        </section>

        {tone !== "success" && paymentMethod && (
          <section className="rounded-2xl border border-background-200 dark:border-background-700 bg-white dark:bg-background-900 p-6 flex flex-col gap-4 text-sm text-gray-700 dark:text-gray-300">
            <h2 className="text-base font-semibold text-gray-900 dark:text-gray-50">
              Próximos passos
            </h2>
            {paymentMethod === "boleto" && (
              <>
                <p>
                  Assim que o boleto for compensado, confirmaremos sua vaga e
                  enviaremos todas as instruções por e-mail. Esse processo pode
                  levar até 2 dias úteis.
                </p>
                {boletoLine && (
                  <div className="rounded-lg bg-background-100 dark:bg-background-800 px-4 py-3 font-mono text-xs break-all">
                    {boletoLine}
                  </div>
                )}
                {boletoUrl && (
                  <a
                    href={boletoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-600"
                  >
                    Abrir boleto
                  </a>
                )}
              </>
            )}
            {paymentMethod === "pix" && (
              <>
                <p>
                  Após finalizar o pagamento via Pix, a confirmação costuma
                  ocorrer em poucos minutos. Caso não apareça automaticamente,
                  aguarde um instante e recarregue esta página.
                </p>
                {pixCode && (
                  <div className="rounded-lg bg-background-100 dark:bg-background-800 px-4 py-3 font-mono text-xs break-all">
                    {pixCode}
                  </div>
                )}
                {pixUrl && (
                  <a
                    href={pixUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-amber-600"
                  >
                    Abrir QR Code
                  </a>
                )}
              </>
            )}
          </section>
        )}

        <section className="flex flex-col gap-3 text-sm text-gray-700 dark:text-gray-300">
          <p>
            Qualquer dúvida, envie um e-mail para{" "}
            <a
              className="text-brand font-semibold hover:underline"
              href="mailto:contato@codante.io"
            >
              contato@codante.io
            </a>{" "}
            ou fale com a gente na comunidade Codante PRO.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg bg-amber-500 px-5 py-3 font-semibold text-gray-900 hover:bg-amber-600"
            >
              Ir para a home
            </Link>
            <Link
              to="/curso-ao-vivo/codando-com-ia"
              className="inline-flex items-center justify-center rounded-lg border border-background-200 px-5 py-3 font-semibold text-gray-800 hover:bg-background-100 dark:border-background-700 dark:text-gray-200"
            >
              Ver detalhes do curso
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

type StatusCopyParams = {
  status: string;
  paymentMethod?: string;
  hasPaidTransaction: boolean;
  hasPendingTransaction: boolean;
  hasDeniedTransaction: boolean;
};

type StatusCopy = {
  title: string;
  subtitle: string;
  tone: "success" | "warning" | "danger";
};

function buildStatusCopy({
  status,
  paymentMethod,
  hasPaidTransaction,
  hasPendingTransaction,
  hasDeniedTransaction,
}: StatusCopyParams): StatusCopy {
  if (hasPaidTransaction) {
    return {
      title: "Pagamento confirmado!",
      subtitle:
        "Sua vaga está garantida e em breve você receberá os próximos passos por e-mail.",
      tone: "success",
    };
  }

  if (hasDeniedTransaction) {
    return {
      title: "Pagamento não confirmado",
      subtitle:
        "Não conseguimos processar o pagamento. Verifique seus dados ou tente outra forma de pagamento.",
      tone: "danger",
    };
  }

  if (hasPendingTransaction || status === "active") {
    return {
      title: "Pagamento em processamento",
      subtitle:
        paymentMethod === "boleto"
          ? "Assim que o boleto for compensado, confirmaremos sua vaga e enviaremos as próximas orientações."
          : paymentMethod === "pix"
            ? "Estamos aguardando a confirmação do pagamento Pix. Normalmente isso acontece em poucos minutos."
            : "Estamos aguardando a confirmação do pagamento. Isso pode levar alguns instantes dependendo da forma escolhida.",
      tone: "warning",
    };
  }

  if (status === "inactive" || status === "disabled") {
    return {
      title: "Link desativado",
      subtitle:
        "Este link não está mais ativo. Caso não tenha concluído a compra, gere um novo no site ou fale com nosso suporte.",
      tone: "danger",
    };
  }

  if (status === "expired") {
    return {
      title: "Link expirado",
      subtitle:
        "O prazo para pagamento expirou. Gere um novo link para garantir sua vaga.",
      tone: "danger",
    };
  }

  return {
    title: "Estamos validando sua compra",
    subtitle:
      "Recebemos seu pedido e estamos aguardando atualizações de pagamento. Recarregue a página em alguns instantes.",
    tone: "warning",
  };
}

function statusBadgeLabel(status: string) {
  switch (status) {
    case "paid":
      return "Pagamento confirmado";
    case "pending":
    case "waiting_payment":
    case "processing":
    case "authorized":
    case "active":
      return "Em análise";
    case "failed":
    case "canceled":
    case "declined":
    case "inactive":
    case "disabled":
      return "Pagamento não confirmado";
    default:
      return "Aguardando";
  }
}
