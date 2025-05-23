import { sendPasswordLink } from "~/lib/services/auth.server";
import AuthCard from "../auth-card";
import { Form, useActionData, useNavigation } from "react-router";
import LoadingButton from "~/components/features/form/loading-button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export async function action({
  request,
}: {
  request: Request;
}): Promise<string | null> {
  const formData = await request.formData();
  const email = formData.get("email") as string;

  const res: any = await sendPasswordLink({ email });

  return res?.errors || null;
}

export default function PasswordReset() {
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
        <Form replace method="post" className="mt-8">
          <Label htmlFor="email">
            Coloque seu email para redefinir sua senha
          </Label>
          <Input name="email" id="email"></Input>
          <div className="mt-2 text-xs text-red-400 min-h-4">{errors}</div>

          <div className="text-right">
            <LoadingButton
              type="submit"
              className="relative mt-8 transition duration-200"
              status={status}
              isSuccessfulSubmission={isSuccessfulSubmission}
            >
              Redefinir Senha
            </LoadingButton>
          </div>
        </Form>
      ) : (
        <div className="mt-8 text-sm font-light text-gray-500 dark:text-gray-300">
          Seu email foi enviado! Verifique sua caixa de entrada e siga as
          instruções no email.
        </div>
      )}
    </AuthCard>
  );
}
