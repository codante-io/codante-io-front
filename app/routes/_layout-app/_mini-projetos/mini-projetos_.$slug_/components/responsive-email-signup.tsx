import { useActionData, useFetcher } from "@remix-run/react";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ResponsiveDialog } from "~/components/ui/responsive-dialog";
import LoadingButton from "~/components/features/form/loading-button";
import { useEffect } from "react";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";

interface FetcherData {
  error?: string;
  success?: string;
}

export default function ResponsiveEmailSignup() {
  const errors = useActionData();
  const fetcher = useFetcher();
  const { showSuccessToast, showErrorToast } = useToasterWithSound();

  const status = fetcher.state;
  let isSuccessfulSubmission = status === "idle" && errors === null;

  const fetcherData = fetcher.data as FetcherData;
  const errorMsg = fetcherData && fetcherData.error ? fetcherData.error : null;
  const successMsg =
    fetcherData && fetcherData.success ? fetcherData.success : null;

  useEffect(() => {
    if (successMsg) showSuccessToast(successMsg);
    if (errorMsg) showErrorToast(errorMsg);
  }, [successMsg, errorMsg, showErrorToast, showSuccessToast]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    fetcher.submit(event.currentTarget.form, {
      method: "post",
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
        <fetcher.Form
          method="post"
          className="flex flex-col"
          onSubmit={handleSubmit}
          action="/leads?index"
        >
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
              value="register-lead-challenge"
            >
              Receber instruções
            </LoadingButton>
          </div>
        </fetcher.Form>
      </>
    </ResponsiveDialog>
  );
}
