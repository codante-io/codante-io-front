import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { useEffect } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Input from "~/components/form/input";
import LoadingButton from "~/components/form/loading-button";
import ProBadge from "~/components/pro-badge";
import { useToasterWithSound } from "~/hooks/useToasterWithSound";
import { user } from "~/services/auth.server";
import { authenticator } from "~/services/github-auth.server";
import AuthCard from "../../_auth/auth-card";
import { changeName, changePassword } from "./services.server";
import type { User } from "~/models/user.server";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import type { Subscription } from "~/models/subscription.server";
import { getSubscription } from "~/models/subscription.server";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import toast from "react-hot-toast";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "changeName") {
    const name = formData.get("name") as string;
    const res = await changeName({ request, name });
    if (res?.errors) {
      return { changeNameErrors: res.message };
    }
    return {
      changeName: true,
    };
  }

  if (intent === "changePassword") {
    const password = formData.get("password") as string;
    const passwordConfirmation = formData.get(
      "password_confirmation",
    ) as string;
    const res = await changePassword({
      request,
      password,
      passwordConfirmation,
    });
    if (res?.errors) {
      return { changePasswordErrors: res.message };
    }

    return {
      changePassword: true,
    };
  }

  return null;
}

export async function loader({ request }: { request: Request }) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const userData: User | null = await user({ request });
  const subscription = await getSubscription({ request });

  return { user: userData, subscription };
}

export default function Conta() {
  const transition = useNavigation();
  const changeNameStatus =
    transition.formData?.get("intent") === "changeName"
      ? transition.state
      : "idle";
  const changePasswordStatus =
    transition.formData?.get("intent") === "changePassword"
      ? transition.state
      : "idle";

  const { user, subscription } = useLoaderData<typeof loader>();
  const actionData = useActionData();
  const { showSuccessToast } = useToasterWithSound();
  const changePasswordErrors = actionData?.changePasswordErrors;
  const changeNameErrors = actionData?.changeNameErrors;

  let isChangeNameSuccess =
    actionData?.changeName && changeNameStatus === "idle";
  let isChangePasswordSuccess =
    actionData?.changePassword && changePasswordStatus === "idle";

  useEffect(() => {
    if (isChangeNameSuccess) {
      showSuccessToast("Você alterou seu nome com sucesso");
    }

    if (isChangePasswordSuccess) {
      showSuccessToast("Você alterou sua senha com sucesso.");
    }
  }, [isChangeNameSuccess, isChangePasswordSuccess, showSuccessToast]);

  return (
    <>
      <div className="container mx-auto mb-16">
        <header className="">
          <h1 className="text-3xl font-lexend">
            {/* <span className="hidden ml-3 font-light text-blue-500 md:inline">
              {" "}
              &#8226;{" "}
            </span> */}
            Minha Conta
          </h1>

          <span className="flex items-center mt-2">
            <span className="hidden text-sm font-light md:inline dark:text-gray-300">
              {user?.name}
            </span>
            {user?.is_pro === 1 && <ProBadge />}
          </span>
        </header>
        {subscription && <SubscriptionSection subscription={subscription} />}

        <MyAccountSection
          user={user}
          changeNameErrors={changeNameErrors}
          changeNameStatus={changeNameStatus}
        />

        <PasswordChangeSection
          changePasswordStatus={changePasswordStatus}
          changePasswordErrors={changePasswordErrors}
        />
      </div>
    </>
  );
}

function MyAccountSection({
  user,
  changeNameErrors,
  changeNameStatus,
}: {
  user?: User | null;
  changeNameErrors?: string;
  changeNameStatus: "idle" | "loading" | "submitting";
}) {
  return (
    <>
      <h2 className="flex items-center mt-12 text-xl">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="inline-block mr-2 text-blue-300 dark:text-blue-800"
        />
        Dados
      </h2>

      <AuthCard className="max-w-xl mt-6">
        <Form method="post">
          <Input
            id="name"
            name="name"
            label="Nome"
            type="text"
            onChange={() => {}}
            defaultValue={user?.name}
          />
          <div className="mt-6">
            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              onChange={() => {}}
              value={user?.email}
              disabled
            />
          </div>
          <div className="mt-2 mb-3 text-xs text-red-400 min-h-4">
            {changeNameErrors}
          </div>
          <div className="mt-8 text-right">
            <LoadingButton
              status={changeNameStatus}
              isSuccessfulSubmission={false}
              name="intent"
              value="changeName"
              type="submit"
            >
              Alterar Nome
            </LoadingButton>
          </div>
        </Form>
      </AuthCard>
    </>
  );
}

function PasswordChangeSection({
  changePasswordErrors,
  changePasswordStatus,
}: {
  changePasswordErrors?: string;
  changePasswordStatus: "idle" | "loading" | "submitting";
}) {
  return (
    <>
      <h2 className="flex items-center mt-12 text-xl">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="inline-block mr-2 text-blue-300 dark:text-blue-800"
        />{" "}
        Alterar Senha
      </h2>

      <AuthCard className="max-w-xl mt-6">
        <Form replace method="post">
          <Input
            id="password"
            name="password"
            label="Nova Senha"
            type="password"
            autoComplete="off"
          />
          <div className="mt-6">
            <Input
              id="password_confirmation"
              name="password_confirmation"
              label="Confirme a Senha"
              type="password"
              autoComplete="off"
            />
          </div>
          <div className="mt-2 mb-3 text-xs text-red-400 min-h-4">
            {changePasswordErrors}
          </div>
          <div className="mt-8 text-right">
            <LoadingButton
              status={changePasswordStatus}
              isSuccessfulSubmission={false}
              name="intent"
              value="changePassword"
              type="submit"
            >
              Alterar Senha
            </LoadingButton>
          </div>
        </Form>
      </AuthCard>
    </>
  );
}

function SubscriptionSection({ subscription }: { subscription: Subscription }) {
  return (
    <>
      <h2 className="flex items-center mt-12 text-xl">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="inline-block mr-2 text-blue-300 dark:text-blue-800"
        />{" "}
        Assinatura
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
            {subscription.translated_payment_method ?? ""}
          </span>
        </p>
        {subscription.status !== "active" &&
          subscription.payment_method?.toLowerCase() === "boleto" &&
          subscription.boleto_url && (
            <BoletoSubscriptionSection subscription={subscription} />
          )}
        {subscription.status !== "active" &&
          subscription.payment_method?.toLowerCase() === "pix" &&
          subscription.boleto_url && (
            <PixSubscriptionSection subscription={subscription} />
          )}
      </AuthCard>
    </>
  );
}

function PixSubscriptionSection({
  subscription,
}: {
  subscription: Subscription;
}) {
  function copyToClipboard() {
    navigator.clipboard.writeText(subscription.boleto_barcode ?? "");
    toast.success("Código Pix Copia e Cola copiado!");
  }

  return (
    <>
      <p className="mb-2 text-sm font-light text-inter">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-white hover:underline dark:text-gray-400"
        >
          Código (Pix Copia e Cola)
          <FiCopy />
        </button>
      </p>
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex gap-2 w-full text-sm font-light text-gray-500 dark:text-gray-400 text-inter">
              <span>QR Code do PIX</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500 dark:text-gray-400`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              <img
                src={subscription.boleto_url ?? ""}
                alt="QR Code"
                className="w-64"
              />
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}

function BoletoSubscriptionSection({
  subscription,
}: {
  subscription: Subscription;
}) {
  function copyToClipboard() {
    navigator.clipboard.writeText(subscription.boleto_barcode ?? "");
    toast.success("Código de barras copiado!");
  }
  return (
    <>
      <p className="mb-2 text-sm font-light text-inter">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-white hover:underline dark:text-gray-400"
        >
          Copiar Código de Barras
          <FiCopy />
        </button>
      </p>
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
    </>
  );
}
