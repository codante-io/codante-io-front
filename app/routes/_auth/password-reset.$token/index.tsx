import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { resetPassword } from "~/services/auth.server";
import AuthCard from "../auth-card";
import Input from "~/components/form/input";
import Button from "~/components/form/button";
import Spinner from "~/components/spinner";
import { CheckIcon } from "@heroicons/react/24/solid";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("password_confirmation") as string;

  const { errors, redirector } = await resetPassword({
    email,
    token,
    password,
    passwordConfirmation,
  });

  return errors || null;
}

export async function loader({
  request,
  params,
}: {
  request: Request;
  params: { token: string };
}) {
  const token = params.token;
  const url = new URL(request.url);
  const email = url.searchParams.get("email");
  if (!email) {
    throw new Error("Email is required");
  }
  return { email, token };
}

export default function PasswordReset() {
  const { token, email } = useLoaderData<typeof loader>();
  const errors = useActionData();
  const transition = useNavigation();

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  return (
    <AuthCard>
      <h1 className="text-lg text-slate-700 dark:text-white">
        Redefinir Senha
      </h1>
      {!isSuccessfulSubmission ? (
        <Form method="post" className="mt-8">
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="token" value={token} />
          <Input
            label="Nova Senha"
            type="password"
            name="password"
            id="password"
          />
          <div className="mt-4">
            <Input
              label="Confirmação da nova senha"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
            />
          </div>
          <div className="text-red-400 text-xs mt-2 h-4">{errors}</div>

          <div className="mt-8 text-right">
            <Button
              disabled={status !== "idle"}
              type="submit"
              className="relative transition duration-200"
            >
              {status === "submitting" && (
                <div className="absolute inset-0 flex justify-center py-2">
                  <Spinner />
                </div>
              )}
              {isSuccessfulSubmission && (
                <div className="absolute inset-0 flex justify-center py-2">
                  <CheckIcon className="w-5" />
                </div>
              )}
              <span
                className={
                  status === "idle" && !isSuccessfulSubmission
                    ? ""
                    : "invisible"
                }
              >
                Redefinir Senha
              </span>
            </Button>
          </div>
        </Form>
      ) : (
        <div className="text-slate-500 text-slate-400 font-light text-sm mt-8">
          Tudo certo! Você redefiniu uma nova senha. Agora, é só fazer o login
          normalmente.
        </div>
      )}
    </AuthCard>
  );
}
