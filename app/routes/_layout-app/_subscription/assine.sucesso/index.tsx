import { useLoaderData } from "@remix-run/react";
import type { Subscription } from "~/models/subscription.server";

export function loader({ request }: { request: Request }) {
  const url = new URL(request.url);
  const subscriptionString = url.searchParams.get("subscription");

  if (!subscriptionString) {
    return { subscription: null };
  }
  const subscription: Subscription = JSON.parse(subscriptionString);
  return { subscription };
}

export default function AssineSucesso() {
  const { subscription } = useLoaderData<typeof loader>();

  return (
    <main className="container mx-auto text-center">
      <h1 className="mb-10 text-4xl font-lexend">
        Obrigado por assinar o Codante!
      </h1>
      <p className="mb-10 text-lg">
        Você receberá um email com mais informações em breve.
      </p>

      <h2 className="mb-10 text-2xl font-lexend">Dados da assinatura:</h2>
      <p>Subscription:</p>
      <pre>{JSON.stringify(subscription, null, 2)}</pre>
    </main>
  );
}
