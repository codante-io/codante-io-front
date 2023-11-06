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
      "password_confirmation"
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

  return { user: userData };
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

  const { user } = useLoaderData<typeof loader>();
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
    <div className="container mx-auto mb-16">
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
        />{" "}
        Minha Conta
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
