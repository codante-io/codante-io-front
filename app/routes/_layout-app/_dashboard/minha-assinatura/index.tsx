import { useLoaderData } from "@remix-run/react";
import { FiExternalLink } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import ProBadge from "~/components/pro-badge";
import { getSubscription } from "~/models/subscription.server";
import { user } from "~/services/auth.server";
import { authenticator } from "~/services/github-auth.server";
import { toTitleCase } from "~/utils/string-utils";
import AuthCard from "../../_auth/auth-card";
import type { Subscription } from "~/models/subscription.server";
import type { User } from "~/models/user.server";

export async function loader({ request }: { request: Request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const userData: User = await user({ request });
  const subscription = await getSubscription({ request });

  return { user: userData, subscription };
}

export default function Assinatura() {
  const { user, subscription } = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto mb-16">
      {subscription && (
        <SubscriptionSection user={user} subscription={subscription} />
      )}
    </div>
  );
}

function SubscriptionSection({
  subscription,
  user,
}: {
  subscription: Subscription | null;
  user: User | undefined;
}) {
  if (!subscription) return null;

  return (
    <>
      <h2 className="flex items-center mt-12 text-xl">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="inline-block mr-2 text-blue-300 dark:text-blue-800"
        />{" "}
        Minha Assinatura
        <span className="hidden ml-3 font-light text-blue-500 md:inline">
          {" "}
          &#8226;{" "}
        </span>
        <span className="hidden ml-3 text-base font-light md:inline dark:text-gray-300">
          {user?.name}
        </span>
        {user?.is_pro === 1 && <ProBadge />}
      </h2>

      <AuthCard className="max-w-xl mt-6">
        <p className="mb-6 text-sm font-light text-gray-600 dark:text-gray-400 text-inter">
          Codante
          <span className="px-1 mx-1 text-xs rounded py-0.5 bg-amber-400 text-background-50 dark:text-background-900">
            PRO
          </span>{" "}
          - Vitalício
        </p>
        <p className="mb-2 text-sm font-light text-gray-600 dark:text-gray-400 text-inter">
          Status:{" "}
          <span
            className={`${
              subscription.status === "active"
                ? "text-green-400"
                : "dark:text-amber-500 text-amber-600"
            }`}
          >
            {subscription.translated_status}
          </span>
        </p>
        <p className="mb-2 text-sm font-light text-gray-500 dark:text-gray-400 text-inter">
          Início:{" "}
          <span className="text-gray-700 dark:text-white">
            {subscription.starts_at}
          </span>{" "}
        </p>
        <p className="mb-2 text-sm font-light text-gray-500 dark:text-gray-400 text-inter">
          Término:{" "}
          <span className="text-gray-700 dark:text-white">Vitalício</span>
        </p>
        <p className="mb-2 text-sm font-light text-gray-500 dark:text-gray-400 text-inter">
          Forma de Pagamento:{" "}
          <span className="text-gray-700 dark:text-white">
            {toTitleCase(subscription.payment_method ?? "")}
          </span>
        </p>
        {subscription.status !== "active" &&
          subscription.payment_method?.toLowerCase() === "boleto" &&
          subscription.boleto_url && (
            <p className="mb-2 text-sm font-light text-inter">
              <a
                href={subscription.boleto_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-white hover:underline dark:text-gray-400"
              >
                Link do Boleto
                <FiExternalLink />
              </a>
            </p>
          )}
      </AuthCard>
    </>
  );
}
