import { abort404 } from "~/utils/responses.server";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import NotFound from "~/components/errors/not-found";
import { Error500 } from "~/components/errors/500";
import { sendPagarmePaymentToBackend } from "~/models/subscription.server";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const pagarmeToken = formData.get("pagarmeToken");
  const paymentMethod = formData.get("paymentMethod");

  return await sendPagarmePaymentToBackend(
    request,
    pagarmeToken as string,
    paymentMethod as "boleto" | "credit_card"
  );
}

export async function loader() {
  return abort404();
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

export default function Subscription() {
  return null;
}
