import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ResponsiveDialog } from "~/components/ui/responsive-dialog";
import LoadingButton from "~/components/features/form/loading-button";

export default function ResponsiveEmailSignup({ slug }: { slug: string }) {
  const submit = useSubmit();
  const errors = useActionData();
  const transition = useNavigation();

  const status = transition.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, {
      method: "post",
      action: `/mini-projetos/${slug}`,
    });
  }

  return (
    <ResponsiveDialog
      title="Participe do projeto"
      description="Vamos te enviar por email as instruções para participar"
      triggerLabel="Quero participar desse projeto!"
      triggerButtonSize="lg"
    >
      <>
        <Form method="POST" className="flex flex-col" onSubmit={handleSubmit}>
          <Label htmlFor="email">Seu email</Label>
          <Input name="email" id="email" type="email" className="mb-4" />

          <div className="min-h-[16px] mt-2">
            <div className="text-xs text-gray-500">
              Ao cadastrar você receberá informações sobre o Codante pelo email.
              Não se preocupe, não vamos enviar spam.
            </div>
          </div>
          <div className="text-right w-full">
            <LoadingButton
              type="submit"
              size="lg"
              className="relative transition duration-200 w-full mt-10"
              status={status}
              isSuccessfulSubmission={isSuccessfulSubmission}
              name="intent"
              value="register-lead"
            >
              Receber instruções
            </LoadingButton>
          </div>
        </Form>
      </>
    </ResponsiveDialog>
  );
}
