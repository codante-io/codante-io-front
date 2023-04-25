import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Button from "~/components/form/button";
import Input from "~/components/form/input";
import AuthCard from "~/routes/_auth/auth-card";
import { currentToken, getSession, user } from "~/services/auth.server";
import { changeName, changePassword } from "./services.server";
import LoadingButton from "~/components/form/loading-button";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useColorMode } from "~/contexts/color-mode-context";
import { authenticator } from "~/services/github-auth.server";

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

  const userData = await user({ request });
  const token = await currentToken({ request });
  const session = await getSession(request.headers.get("Cookie"));
  return { user: userData, token, session };
}

export default function Account() {
  const { colorMode } = useColorMode();
  const transition = useNavigation();
  const changeNameStatus =
    transition.formData?.get("intent") === "changeName"
      ? transition.state
      : "idle";
  const changePasswordStatus =
    transition.formData?.get("intent") === "changePassword"
      ? transition.state
      : "idle";

  console.log(changeNameStatus);

  const { user } = useLoaderData();
  const actionData = useActionData();
  const changePasswordErrors = actionData?.changePasswordErrors;
  const changeNameErrors = actionData?.changeNameErrors;

  let isChangeNameSuccess =
    actionData?.changeName && changeNameStatus === "idle";
  let isChangePasswordSuccess =
    actionData?.changePassword && changePasswordStatus === "idle";

  useEffect(() => {
    if (isChangeNameSuccess) {
      toast.success("Você alterou seu nome com sucesso");
    }

    if (isChangePasswordSuccess) {
      toast.success("Você alterou sua senha com sucesso.");
    }
  }, [isChangeNameSuccess, isChangePasswordSuccess]);

  return (
    <div className="container mx-auto mt-16 mb-16">
      <h2 className="flex items-center text-xl">
        <MdKeyboardDoubleArrowRight
          size={24}
          className="inline-block mr-2 text-blue-300 dark:text-blue-800"
        />{" "}
        Minha Conta
        <span className="hidden ml-3 font-light text-blue-500 md:inline">
          {" "}
          &#8226;{" "}
        </span>
        <span className="hidden ml-3 text-base font-light md:inline dark:text-slate-400">
          {user.name}
        </span>
      </h2>

      <AuthCard className="max-w-xl mt-6">
        <Form method="post">
          <Input
            id="name"
            name="name"
            label="Nome"
            type="text"
            onChange={() => {}}
            defaultValue={user.name}
          />
          <div className="mt-6">
            <Input
              id="email"
              name="email"
              label="Email"
              type="email"
              onChange={() => {}}
              value={user.email}
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
    </div>
  );
}
