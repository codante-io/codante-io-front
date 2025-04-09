import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { withMask } from "use-mask-input";
import LoadingButton from "~/components/features/form/loading-button";
import { useEffect } from "react";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";

const LeadForm = () => {
  const submit = useSubmit();
  const actionData = useActionData<{ error?: string; success?: string }>();
  const transition = useNavigation();

  const { showErrorToast, showSuccessToast } = useToasterWithSound();

  const status = transition.state;
  const isSuccessfulSubmission =
    status === "idle" && actionData?.error === null;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    submit(event.currentTarget, {
      method: "post",
      action: "/black-friday",
    });
  }

  useEffect(() => {
    if (actionData?.error) {
      showErrorToast(actionData?.error);
    }

    if (actionData?.success) {
      showSuccessToast(actionData?.success);
    }
  }, [actionData, showErrorToast, showSuccessToast]);

  return (
    <div className="flex justify-center dark:bg-background-800 bg-background-100 rounded-lg shadow-lg p-8 w-96 flex-col w-full">
      <h1 className="text-2xl font-bold mb-6 underline decoration-yellow-500">
        Receba nossa oferta
      </h1>
      <Form method="POST" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label className="dark:text-gray-400">Nome:</Label>
          <Input
            className="dark:bg-background-700"
            name="name"
            type="text"
            required
          />
        </div>
        <div className="mb-4">
          <Label className="dark:text-gray-400">Email:</Label>
          <Input
            className="dark:bg-background-700"
            name="email"
            type="email"
            required
          />
        </div>
        <div className="mb-4">
          <Label className="dark:text-gray-400">Telefone (WhatsApp):</Label>
          <Input
            className="dark:bg-background-700"
            name="phone"
            type="text"
            ref={withMask("(99) 99999-9999")}
          />
        </div>

        <LoadingButton
          type="submit"
          variant="pro"
          size="lg"
          className="relative transition duration-200 inline-flex items-center justify-center text-lg lg:text-xl px-10 py-4 overflow-hidden font-medium  bg-yellow-500 rounded-lg group w-full mt-4"
          status={status}
          isSuccessfulSubmission={isSuccessfulSubmission}
        >
          <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-linear-to-b from-transparent via-transparent to-gray-700"></span>
          <span className="relative">Cadastrar</span>
        </LoadingButton>
      </Form>
    </div>
  );
};

export default LeadForm;
