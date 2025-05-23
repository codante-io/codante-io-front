import { Form, useActionData, useLoaderData, useNavigation } from "react-router";
import { resetPassword } from "~/lib/services/auth.server";
import AuthCard from "../auth-card";
import LoadingButton from "~/components/features/form/loading-button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const passwordConfirmation = formData.get("password_confirmation") as string;

  const { errors } = await resetPassword({
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
  const errors = useActionData<string>();
  const transition = useNavigation();

  const status = transition.state;
  const isSuccessfulSubmission = status === "idle" && errors === null;

  return (
    <AuthCard>
      <h1 className="text-lg text-gray-700 dark:text-gray-50">
        Redefinir Senha
      </h1>
      {!isSuccessfulSubmission ? (
        <Form method="post" className="mt-8">
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="token" value={token} />
          <Label htmlFor="password">Nova Senha</Label>
          <Input type="password" name="password" id="password" />
          <div className="mt-4">
            <Label htmlFor="password_confirmation">
              Confirmação da nova senha
            </Label>
            <Input
              type="password"
              id="password_confirmation"
              name="password_confirmation"
            />
          </div>
          <div className="h-4 mt-2 text-xs text-red-400">{errors}</div>

          <div className="mt-8 text-right">
            <LoadingButton
              disabled={status !== "idle"}
              type="submit"
              isSuccessfulSubmission={isSuccessfulSubmission}
              status={status}
              className="relative transition duration-200"
            >
              Redefinir Senha
            </LoadingButton>
          </div>
        </Form>
      ) : (
        <div className="mt-8 text-sm font-light dark:text-gray-400 text-gray-500">
          Tudo certo! Você redefiniu uma nova senha. Agora, é só fazer o login
          normalmente.
        </div>
      )}
    </AuthCard>
  );
}
