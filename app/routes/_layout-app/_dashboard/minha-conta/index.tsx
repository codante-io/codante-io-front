import { Disclosure, Switch } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import {
  Form,
  Link,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigation,
} from "react-router";
import { Edit } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsGithub } from "react-icons/bs";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import DiscordButton from "~/components/features/auth/discord-button";
import LoadingButton from "~/components/features/form/loading-button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import ProBadge from "~/components/ui/pro-badge";
import UserAvatar from "~/components/ui/user-avatar";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";
import type { Subscription } from "~/lib/models/subscription.server";
import { getSubscription } from "~/lib/models/subscription.server";
import type { User } from "~/lib/models/user.server";
import { logoutWithRedirectAfterLogin, user } from "~/lib/services/auth.server";
import { authenticator } from "~/lib/services/github-auth.server";
import AuthCard from "../../_auth/auth-card";
import AvatarUpload from "./avatar-image-uploader";
import {
  changeAvatar,
  changeLinkedinUrl,
  changeName,
  changePassword,
  changeSettings,
} from "./services.server";

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

  if (intent === "changeLinkedinUrl") {
    const linkedin = formData.get("linkedin") as string;
    const res = await changeLinkedinUrl({ request, linkedin });
    if (res?.errors) {
      return { changeLinkedinUrlErrors: res.message };
    }
    return {
      changeLinkedinUrl: true,
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
  if (intent === "showBadge") {
    const showBadge = formData.get("showBadge") === "true";
    await changeSettings({ request, showBadge });
  }

  if (intent === "connectGithub") {
    return logoutWithRedirectAfterLogin({
      request,
      redirectTo: `/minha-conta#social-section`,
    });
  }

  if (intent === "avatar-submission") {
    const avatar = formData.get("avatar") as File;

    const res = await changeAvatar({ request, avatar });
    if (res?.error) {
      return {
        error: true,
        message: res.message,
      };
    } else {
      return {
        success: true,
        message: "Avatar alterado com sucesso",
      };
    }
  }

  return null;
}

export async function loader({ request }: { request: Request }) {
  const userData = await user({ request });

  if (userData instanceof Response) {
    return userData;
  }

  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const subscription = await getSubscription({ request });

  return { user: userData, subscription };
}

export default function Conta() {
  const { user, subscription } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const { showSuccessToast } = useToasterWithSound();
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);

  const transition = useNavigation();
  const changeNameStatus =
    transition.formData?.get("intent") === "changeName"
      ? transition.state
      : "idle";
  const changePasswordStatus =
    transition.formData?.get("intent") === "changePassword"
      ? transition.state
      : "idle";
  const changeLinkedinUrlStatus =
    transition.formData?.get("intent") === "changeLinkedinUrl"
      ? transition.state
      : "idle";

  let changePasswordErrors;
  let changeNameErrors;
  let changeLinkedinUrlErrors;
  let isChangeNameSuccess: boolean = false;
  let isChangePasswordSuccess: boolean = false;
  let isChangeLinkedinUrlSuccess: boolean = false;

  if (actionData && "changePasswordErrors" in actionData) {
    changePasswordErrors = actionData.changePasswordErrors ?? "";
  }

  if (actionData && "changePasswordErrors" in actionData) {
    changePasswordErrors = actionData.changePasswordErrors ?? "";
  }

  if (actionData && "changeNameErrors" in actionData) {
    changeNameErrors = actionData.changeNameErrors ?? "";
  }

  if (actionData && "changeLinkedinUrlErrors" in actionData) {
    changeLinkedinUrlErrors = actionData.changeLinkedinUrlErrors ?? "";
  }

  if (actionData && "changeName" in actionData) {
    isChangeNameSuccess = actionData.changeName && changeNameStatus === "idle";
  }

  if (actionData && "changeLinkedinUrl" in actionData) {
    isChangeLinkedinUrlSuccess =
      actionData.changeLinkedinUrl && changeLinkedinUrlStatus === "idle";
  }

  if (actionData && "changePassword" in actionData) {
    isChangePasswordSuccess =
      actionData.changePassword && changePasswordStatus === "idle";
  }

  useEffect(() => {
    if (isChangeNameSuccess) {
      showSuccessToast("Alterações salvas com sucesso");
    }

    if (isChangePasswordSuccess) {
      showSuccessToast("Você alterou sua senha com sucesso.");
    }

    if (isChangeLinkedinUrlSuccess) {
      showSuccessToast("Você alterou seu LinkedIn com sucesso.");
    }
  }, [
    isChangeNameSuccess,
    isChangePasswordSuccess,
    isChangeLinkedinUrlSuccess,
    showSuccessToast,
  ]);

  return (
    <>
      <div className="container mx-auto mb-16">
        <header className="flex gap-10 ">
          <Dialog
            open={avatarDialogOpen}
            onOpenChange={() => setAvatarDialogOpen((value) => !value)}
          >
            <DialogContent
              aria-describedby="avatar-dialog-description"
              className="w-11/12 sm:max-w-md rounded-md p-8"
            >
              <DialogHeader>
                <DialogTitle className="text-start text-lg md:text-xl font-medium text-gray-700 dark:text-gray-50 mb-6">
                  Altere seu Avatar
                </DialogTitle>
              </DialogHeader>
              <AvatarUpload
                onSuccessfulUpload={() => setAvatarDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>
          <div
            className="cursor-pointer relative group"
            onClick={() => setAvatarDialogOpen(!avatarDialogOpen)}
          >
            <div className="absolute transition inset-0 center hidden group-hover:flex bg-opacity-70 bg-black text-gray-200 hover:flex items-center justify-center rounded-full">
              <Edit />
            </div>
            <UserAvatar
              avatar={user.avatar}
              className="w-32 h-32"
              showTooltip={false}
            />
          </div>

          <div>
            <h1 className="text-2xl font-lexend">
              <div>{user.name}</div>
            </h1>

            <p className="flex items-center mt-1 mb-3">
              <span className="hidden text-sm font-light md:inline dark:text-gray-300">
                Codante
              </span>
              {user?.is_pro === 1 && <ProBadge />}
            </p>
            <div className="text-xs font-light dark:text-gray-500 space-y-3">
              {user.github_user && (
                <p className="flex items-center gap-2 ">
                  <FaGithub className="h-4 w-4" />
                  <Link
                    className="hover:underline"
                    to={`https://github.com/${user.github_user}`}
                    target="_blank"
                  >
                    @{user.github_user}
                  </Link>
                </p>
              )}
              {user.linkedin_user && (
                <p className="flex items-center gap-2 ">
                  <FaLinkedin className="h-4 w-4" />
                  <Link
                    target="_blank"
                    className="hover:underline"
                    to={`https://linkedin.com/in/${user.linkedin_user}`}
                  >
                    linkedin.com/in/
                    {user.linkedin_user}
                  </Link>
                </p>
              )}
            </div>
          </div>
        </header>
        {subscription && <SubscriptionSection subscription={subscription} />}

        <MyAccountSection
          user={user}
          changeNameErrors={changeNameErrors}
          changeNameStatus={changeNameStatus}
        />

        <LinkedinSection
          user={user}
          changeLinkedinUrlErrors={changeLinkedinUrlErrors}
          changeLinkedinUrlStatus={changeLinkedinUrlStatus}
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
  user: User;
  changeNameErrors?: string;
  changeNameStatus: "idle" | "loading" | "submitting";
}) {
  const fetcher = useFetcher();
  function handleShowBadge(value: boolean) {
    fetcher.submit(
      { intent: "showBadge", showBadge: value },
      { method: "post" },
    );
  }

  return (
    <>
      <h2 className="flex items-center mt-12 text-xl">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="inline-block mr-2 text-blue-300 dark:text-blue-800"
        />
        Perfil
      </h2>

      <AuthCard className="max-w-xl mt-6">
        <Form method="post">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            name="name"
            type="text"
            onChange={() => {}}
            defaultValue={user?.name}
          />
          <div className="mt-6">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={() => {}}
              value={user?.email}
              disabled
            />
          </div>
          <div className="mt-2 mb-3 text-xs text-red-400 min-h-4">
            {changeNameErrors}
          </div>

          {/* switch para habilitar mostrar badge */}
          <div className="mt-8">
            <Switch.Group>
              <Switch.Label className="block mb-2 text-sm font-light text-gray-500 dark:text-gray-400 text-inter">
                Mostrar Badge PRO{" "}
              </Switch.Label>
              <Switch
                disabled={!user.is_pro}
                checked={!!user.is_pro && !!user.avatar.badge}
                onChange={(value) => handleShowBadge(value)}
                className={`${
                  !!user.is_pro && !!user.avatar.badge
                    ? "bg-brand-500"
                    : "bg-gray-700"
                } relative inline-flex h-6 w-11 items-center rounded-full ${
                  !user.is_pro && "cursor-not-allowed"
                }`}
              >
                <span className="sr-only">Enable notifications</span>
                <span
                  className={`${
                    !!user.is_pro && !!user.avatar.badge
                      ? "translate-x-6"
                      : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </Switch.Group>
          </div>
          <div className="mt-8 text-right">
            <LoadingButton
              status={changeNameStatus}
              isSuccessfulSubmission={false}
              name="intent"
              value="changeName"
              type="submit"
            >
              Salvar Alterações
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
          <Label htmlFor="password">Nova Senha</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
          />
          <div className="mt-6">
            <Label htmlFor="password_confirmation">Confirme a Senha</Label>
            <Input
              id="password_confirmation"
              name="password_confirmation"
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
          <span className="px-1 mx-1 text-xs rounded-xs py-0.5 bg-amber-400 text-background-50 dark:text-background-900">
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
          href={subscription.boleto_url ?? ""}
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

function LinkedinSection({
  user,
  changeLinkedinUrlErrors,
  changeLinkedinUrlStatus,
}: {
  user: User;
  changeLinkedinUrlErrors?: string;
  changeLinkedinUrlStatus: "idle" | "loading" | "submitting";
}) {
  const [linkedinUser, setLinkedinUser] = useState(user?.linkedin_user || "");

  function getLinkedinUserFromURL(url: string) {
    const partes = url.split("/in/");
    if (partes.length > 1) {
      return partes[1];
    } else {
      return url;
    }
  }

  function handlePaste(event: React.ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    const linkedinUser = getLinkedinUserFromURL(pastedText);
    setLinkedinUser(linkedinUser);
  }

  return (
    <>
      <h2 className="flex items-center mt-8 text-xl pt-4" id="social-section">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="inline-block mr-2 text-blue-300 dark:text-blue-800"
        />
        Contas Sociais
      </h2>

      <AuthCard className="max-w-xl mt-6">
        <div className="mt-6" id="social-github">
          {user?.github_user ? (
            <>
              <Label htmlFor="github">Github</Label>
              <Input
                id="github"
                name="github"
                type="text"
                defaultValue={`https://github.com/${user?.github_user}`}
                disabled
              />
            </>
          ) : (
            <div>
              <p className="dark:text-gray-400 text-gray-600 text-sm block text-inter font-light mb-2">
                Github
              </p>
              <Form>
                <button
                  name="intent"
                  value="connectGithub"
                  type="submit"
                  formMethod="post"
                  className="flex items-center space-x-2 px-4 py-2 bg-brand-500 text-background-50 rounded-md hover:bg-brand-600"
                >
                  <BsGithub className="w-4 h-4" />
                  <span>Conectar Github</span>
                </button>
              </Form>
            </div>
          )}
        </div>

        <div className="mt-6" id="social-discord">
          {user?.discord_user && (
            <>
              <Label htmlFor="discord">Discord</Label>
              <Input
                id="discord"
                name="discord"
                type="text"
                defaultValue={user?.discord_user}
                disabled
              />
            </>
          )}

          {!user?.discord_user && (
            <>
              <p className="dark:text-gray-400 text-gray-600 text-sm block text-inter font-light mb-2">
                Discord
              </p>
              <DiscordButton />
            </>
          )}
        </div>

        <div className="mt-6" id="social-linkedin">
          <Form replace method="post" className="mt-6">
            <div className="relative">
              <label
                htmlFor="linkedin"
                className="absolute text-sm md:text-base left-2 top-[72%] md:top-[70%] transform -translate-y-1/2 dark:text-gray-500 text-gray-400"
              >
                https://www.linkedin.com/in/
              </label>
              <Label htmlFor="linkedin">Linkedin</Label>
              <Input
                id="linkedin"
                name="linkedin"
                type="text"
                onChange={(event) => setLinkedinUser(event.target.value)}
                required
                className="md:pl-56 pl-[200px] text-sm md:text-base"
                onPaste={handlePaste}
                value={linkedinUser}
              />
            </div>
            {user?.linkedin_user && (
              <a
                href={`https://www.linkedin.com/in/${user?.linkedin_user}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-fit flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:hover:text-white hover:underline dark:text-gray-400 text-xs"
              >
                Visualizar perfil
                <FiExternalLink />
              </a>
            )}
            <div className="mt-2 mb-1 text-xs text-red-400 h-4">
              {changeLinkedinUrlErrors}
            </div>

            <div className="mt-8 text-right">
              <LoadingButton
                status={changeLinkedinUrlStatus}
                isSuccessfulSubmission={false}
                name="intent"
                value="changeLinkedinUrl"
                type="submit"
              >
                Salvar Alterações
              </LoadingButton>
            </div>
          </Form>
        </div>
      </AuthCard>
    </>
  );
}
