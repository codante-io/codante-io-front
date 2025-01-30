/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import "filepond/dist/filepond.min.css";
import party from "party-js";
import { BsDiscord } from "react-icons/bs";
import DiscordButton from "~/components/features/auth/discord-button";
import { Button } from "~/components/ui/button";
import type { UserStep } from "../../../../build-steps.server";
import "./filepond-style.css";
import Step from "./step";
import SubmissionStepForm from "./submission-step-form";
import { Link } from "@remix-run/react";
import BecomeProDialog from "~/components/ui/become-pro-dialog";
import { LockIcon } from "lucide-react";

type JoinChallengeSectionProps = {
  className?: string;
  steps: UserStep[];
  user?: any;
  slug: string;
  action?: string;
  githubRepoUrl: string;
  userCanJoinChallenge: boolean;
};

export default function JoinChallengeSection({
  className = "",
  steps,
  user,
  slug,
  action = undefined,
  githubRepoUrl,
  userCanJoinChallenge,
}: JoinChallengeSectionProps) {
  return (
    <Step.StepsContainer className={className}>
      <Step
        title="Conecte o seu Github"
        description="Para participar é necessário conectar com o GitHub."
        id="connect-github"
        status={steps.find((step) => step.id === "connect-github")?.status!}
      >
        <Step.Form user={user} slug={slug} action={action}>
          <Step.PrimaryButton stepId="connect-github">
            Conectar Github
          </Step.PrimaryButton>
        </Step.Form>
      </Step>
      <Step
        id="join-challenge"
        title="Participe do Mini Projeto"
        description="Registre sua participação."
        status={steps.find((step) => step.id === "join-challenge")?.status!}
      >
        <Step.Form user={user} slug={slug} action={action}>
          {userCanJoinChallenge ? (
            <Step.PrimaryButton stepId="join-challenge">
              Participar
            </Step.PrimaryButton>
          ) : (
            <BecomeProDialog
              trigger={
                <Button size="sm" className="justify-start">
                  <LockIcon className="w-4 h-4 mr-2" />
                  Participar
                </Button>
              }
              content={
                <div>
                  <p>
                    Considere assinar para ter acesso a esse e muitos outros
                    projetos.
                  </p>
                </div>
              }
            />
          )}
        </Step.Form>
      </Step>
      <Step
        id="join-discord"
        title="Participe da nossa comunidade"
        description="Tire dúvidas e conecte-se com outras pessoas que estão fazendo esse Mini Projeto."
        status={steps.find((step) => step.id === "join-discord")?.status!}
      >
        <Step.Form user={user} slug={slug} action={action}>
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
        </Step.Form>
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
                to={`https://github.com/codante-io/${githubRepoUrl}`}
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
        status={steps.find((step) => step.id === "verify-fork")?.status!}
      >
        <Step.Form user={user} slug={slug} action={action}>
          <Step.PrimaryButton stepId="verify-fork">
            VerificarFork
          </Step.PrimaryButton>
        </Step.Form>
      </Step>
      <Step
        id="submit-challenge"
        title="Submeta sua resolução"
        description="Faça deploy do seu Mini Projeto e envie o link para aparecer na galeria de submissões."
        status={steps.find((step) => step.id === "submit-challenge")?.status!}
      >
        <SubmissionStepForm user={user} slug={slug} />
      </Step>
      <Step
        id="finish-challenge"
        title="Finalizar projeto"
        description="Quando acabar o seu Mini Projeto é só marcar aqui como concluído."
        last
        status={steps.find((step) => step.id === "finish-challenge")?.status!}
      >
        <Step.Form user={user} slug={slug} action={action}>
          <Step.PrimaryButton
            onClick={(e) =>
              party.confetti(e.target as HTMLElement, {
                count: party.variation.range(40, 250),
              })
            }
            stepId="finish-challenge"
          >
            Marcar como concluído
          </Step.PrimaryButton>
        </Step.Form>
      </Step>
    </Step.StepsContainer>
  );
}
