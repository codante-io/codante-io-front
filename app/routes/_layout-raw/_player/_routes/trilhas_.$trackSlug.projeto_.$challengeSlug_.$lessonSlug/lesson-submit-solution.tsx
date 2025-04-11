import { Link, useFetcher, useLocation } from "react-router";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond/dist/filepond.min.css";
import { InfoIcon } from "lucide-react";
import party from "party-js";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import { BsDiscord } from "react-icons/bs";
import DiscordButton from "~/components/features/auth/discord-button";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToasterWithSound } from "~/lib/hooks/useToasterWithSound";
import Step from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/_tabs/_overview/components/steps/step";
import "./filepond-style.css";
import { UserStep } from "~/routes/_layout-app/_mini-projetos/mini-projetos_.$slug_/build-steps.server";

registerPlugin(FilePondPluginFileValidateType);

// Types
interface LessonSubmitSolutionProps {
  challenge: {
    slug: string;
    repository_name: string;
  };
  steps: UserStep[];
}

interface FetcherResponse {
  error?: string;
  success?: string;
}

// Constants

const API_ACTION = "/api/challenge";

// Utility Functions
const getButtonStatus = (
  formData: FormData | undefined,
  stepId: string,
  fetcherState: "idle" | "submitting" | "loading",
): "idle" | "submitting" | "loading" => {
  if (!formData || fetcherState === "idle") return fetcherState;
  const submittedStepId = formData.get("stepId")?.toString();
  return submittedStepId === stepId ? fetcherState : "idle";
};

// Custom Hook
const useFormSubmission = () => {
  const fetcher = useFetcher<FetcherResponse>();
  const { showSuccessToast, showErrorToast } = useToasterWithSound();

  useEffect(() => {
    if (fetcher.data?.error) {
      showErrorToast(fetcher.data.error);
    }
    if (fetcher.data?.success) {
      showSuccessToast(fetcher.data.success);
    }
  }, [fetcher.data, showErrorToast, showSuccessToast]);

  return fetcher;
};

// Component
export default function LessonSubmitSolution({
  challenge,
  steps,
}: LessonSubmitSolutionProps) {
  const [hasDeployUrl, setHasDeployUrl] = useState(true);
  const location = useLocation();
  const fetcher = useFormSubmission();

  const handleToggleHasDeploy = () => setHasDeployUrl((prev) => !prev);

  const DeployUrlForm = () => (
    <>
      <Input
        placeholder="URL do seu deploy"
        name="submission-url"
        id="submission-url"
        className="pr-1 dark:bg-background-900 w-full"
      />
      <div className="flex justify-between gap-1 items-start">
        <Step.PrimaryButton
          stepId="submit-challenge"
          status={getButtonStatus(
            fetcher.formData,
            "submit-challenge",
            fetcher.state,
          )}
        >
          Submeter
        </Step.PrimaryButton>
        <Button
          variant="link"
          type="button"
          className="text-xs pr-2 pl-2 dark:text-gray-500"
          onClick={handleToggleHasDeploy}
        >
          Não tem deploy?
        </Button>
      </div>
    </>
  );

  const ImageUploadForm = () => (
    <div>
      <p className="font-light text-gray-400 mb-4">
        <InfoIcon className="w-4 h-4 inline-block mr-1" />
        Envie o screenshot da sua aplicação por aqui. A imagem idealmente deverá
        possuir 1920x1080 pixels. Uma ferramenta útil e gratuita é o{" "}
        <a
          className="hover:underline"
          target="_blank"
          href="https://screenshot.rocks"
          rel="noreferrer"
        >
          Screenshot.rocks
        </a>
        . Você poderá substituir a imagem depois.
      </p>
      <FilePond
        labelIdle="Arraste a imagem ou <span class='filepond--label-action'>clique aqui</span>"
        labelThousandsSeparator="."
        storeAsFile={true}
        required
        acceptedFileTypes={["image/*"]}
        name="submission_image"
        credits={false}
      />
      <Button
        variant="link"
        type="button"
        className="text-xs pr-2 pl-2 dark:text-gray-500 "
        onClick={handleToggleHasDeploy}
      >
        Possui Deploy?
      </Button>
    </div>
  );

  return (
    <div className="max-w-prose pt-10">
      <Step.StepsContainer>
        <Step
          title="Conecte o seu Github"
          description="Para participar é necessário conectar com o GitHub."
          id="connect-github"
          status={
            steps.find((step) => step.id === "connect-github")?.status ??
            "upcoming"
          }
        >
          <fetcher.Form method="post" action={API_ACTION}>
            <input type="hidden" name="redirectTo" value={location.pathname} />
            <input type="hidden" name="stepId" value="connect-github" />
            <Step.PrimaryButton
              stepId="connect-github"
              status={getButtonStatus(
                fetcher.formData,
                "connect-github",
                fetcher.state,
              )}
            >
              Conectar Github
            </Step.PrimaryButton>
          </fetcher.Form>
        </Step>
        <Step
          id="join-challenge"
          title="Participe do Mini Projeto"
          description="Registre sua participação."
          status={
            steps.find((step) => step.id === "join-challenge")?.status ??
            "upcoming"
          }
        >
          <fetcher.Form method="post" action={API_ACTION}>
            <input type="hidden" name="slug" value={challenge.slug} />
            <input type="hidden" name="stepId" value="join-challenge" />
            <Step.PrimaryButton
              stepId="join-challenge"
              status={getButtonStatus(
                fetcher.formData,
                "join-challenge",
                fetcher.state,
              )}
            >
              Participar
            </Step.PrimaryButton>
          </fetcher.Form>
        </Step>
        <Step
          id="join-discord"
          title="Participe da nossa comunidade"
          description="Tire dúvidas e conecte-se com outras pessoas que estão fazendo esse Mini Projeto."
          status={
            steps.find((step) => step.id === "join-discord")?.status ??
            "upcoming"
          }
        >
          <fetcher.Form action={API_ACTION}>
            <section className="flex gap-2 items-center mt-2">
              <DiscordButton>
                <BsDiscord className="w-3 h-3 mr-2" />
                <span>Entrar</span>
              </DiscordButton>
              <Button
                type="submit"
                variant="outline"
                className=""
                name="intent"
                value="skip-discord"
              >
                Pronto
              </Button>
            </section>
          </fetcher.Form>
        </Step>
        <Step
          id="verify-fork"
          title="Faça o fork do repositório"
          description={
            <span>
              Acesse o{" "}
              {steps.find((step) => step.id === "verify-fork")?.status ===
              "current" ? (
                <Link
                  to={`https://github.com/codante-io/${challenge.repository_name}`}
                  target="_blank"
                  className="text-brand hover:underline"
                >
                  link do repositório
                </Link>
              ) : (
                "link do repositório"
              )}
              , faça um fork e clique em "Verificar".
            </span>
          }
          status={
            steps.find((step) => step.id === "verify-fork")?.status ??
            "upcoming"
          }
        >
          <fetcher.Form method="post" action={API_ACTION}>
            <input type="hidden" name="slug" value={challenge.slug} />
            <input type="hidden" name="stepId" value="verify-fork" />
            <Step.PrimaryButton
              stepId="verify-fork"
              status={getButtonStatus(
                fetcher.formData,
                "verify-fork",
                fetcher.state,
              )}
            >
              Verificar Fork
            </Step.PrimaryButton>
          </fetcher.Form>
        </Step>
        <Step
          id="submit-challenge"
          title="Submeta sua resolução"
          description="Faça deploy do seu Mini Projeto e envie o link para aparecer na galeria de submissões."
          status={
            steps.find((step) => step.id === "submit-challenge")?.status ??
            "upcoming"
          }
        >
          <fetcher.Form
            method="post"
            encType="multipart/form-data" // important!
            action={API_ACTION}
            className="mt-4"
          >
            <input type="hidden" name="slug" value={challenge.slug} />
            <input type="hidden" name="stepId" value="submit-challenge" />
            {hasDeployUrl && <DeployUrlForm />}
            {!hasDeployUrl && <ImageUploadForm />}
          </fetcher.Form>
        </Step>
        <Step
          id="finish-challenge"
          title="Finalizar projeto"
          description="Quando acabar o seu Mini Projeto é só marcar aqui como concluído."
          last
          status={
            steps.find((step) => step.id === "finish-challenge")?.status ??
            "upcoming"
          }
        >
          <fetcher.Form method="post" action={API_ACTION}>
            <input type="hidden" name="slug" value={challenge.slug} />
            <input type="hidden" name="stepId" value="finish-challenge" />
            <Step.PrimaryButton
              onClick={(e: any) =>
                party.confetti(e.target as HTMLElement, {
                  count: party.variation.range(40, 250),
                })
              }
              stepId="finish-challenge"
              status={getButtonStatus(
                fetcher.formData,
                "finish-challenge",
                fetcher.state,
              )}
            >
              Marcar como concluído
            </Step.PrimaryButton>
          </fetcher.Form>
        </Step>
      </Step.StepsContainer>
    </div>
  );
}
