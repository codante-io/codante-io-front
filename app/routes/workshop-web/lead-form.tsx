import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import "./style.css";
import { useColorMode } from "~/lib/contexts/color-mode-context";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { withMask } from "use-mask-input";
import LoadingButton from "~/components/features/form/loading-button";
import { useEffect } from "react";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";

const LeadForm = () => {
  const { colorMode } = useColorMode();
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
      action: "/workshop-web",
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
    <div className="flex justify-center">
      <div
        className={`bg-white rounded-lg shadow-lg p-8 w-96 forms ${colorMode === "light" ? "forms-light" : "forms-dark"}`}
      >
        <h1 className="text-2xl font-bold text-center  mb-6">
          Participe do nosso workshop gratuito!
        </h1>
        <Form method="POST" onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label className="dark:text-gray-200">Nome:</Label>
            <Input
              className="dark:bg-background-50 dark:text-gray-800"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="dark:text-gray-200">Email:</Label>
            <Input
              className="dark:bg-background-50 dark:text-gray-800"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="mb-4">
            <Label className="dark:text-gray-200">Telefone (WhatsApp):</Label>
            <Input
              className="dark:bg-background-50 dark:text-gray-800"
              name="phone"
              type="text"
              ref={withMask("(99) 9999-9999")}
            />
          </div>
          <LoadingButton
            type="submit"
            size="lg"
            className="relative transition duration-200 w-full"
            status={status}
            isSuccessfulSubmission={isSuccessfulSubmission}
          >
            Cadastrar
          </LoadingButton>
        </Form>
      </div>
    </div>
  );
};

export default LeadForm;
