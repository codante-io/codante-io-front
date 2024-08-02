/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import DiscordButton from "~/components/features/auth/discord-button";
import { BsDiscord } from "react-icons/bs";
import { Input } from "~/components/ui/input";
import party from "party-js";
import { Button } from "~/components/ui/button";
import Step from "./step";
import type { UserStep } from "../../../../build-steps.server";

type JoinChallengeSectionProps = {
  className?: string;
  steps: UserStep[];
  user?: any;
  slug: string;
};

export default function JoinChallengeSection({
  className = "",
  steps,
  user,
  slug,
}: JoinChallengeSectionProps) {
  return (
    <Step.StepsContainer className={className}>
      <Step
        title="Conecte o seu Github"
        description="Para participar é necessário conectar com o GitHub."
        id="connect-github"
        status={steps.find((step) => step.id === "connect-github")?.status!}
      >
        <Step.Form user={user} slug={slug}>
          <Step.PrimaryButton stepId="connect-github">
            Conectar Github
          </Step.PrimaryButton>
        </Step.Form>
      </Step>
      <Step
        id="join-challenge"
        title="Participe do Mini Projeto"
        description="Participe. É 100% gratuito!"
        status={steps.find((step) => step.id === "join-challenge")?.status!}
      >
        <Step.Form user={user} slug={slug}>
          <Step.PrimaryButton stepId="join-challenge">
            Participar
          </Step.PrimaryButton>
        </Step.Form>
      </Step>
      <Step
        id="join-discord"
        title="Participe da nossa comunidade"
        description="Tire dúvidas e conecte-se com outras pessoas que estão fazendo esse Mini Projeto."
        status={steps.find((step) => step.id === "join-discord")?.status!}
      >
        <Step.Form user={user} slug={slug}>
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
            Acesse o link do repositório, faça um fork e clique em "Verificar".
          </span>
        }
        status={steps.find((step) => step.id === "verify-fork")?.status!}
      >
        <Step.Form user={user} slug={slug}>
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
        <Step.Form user={user} slug={slug}>
          <Input
            placeholder="URL do seu deploy"
            name="submission-url"
            id="submission-url"
            className="pr-1 dark:bg-background-900 w-full"
          />
          <Step.PrimaryButton stepId="submit-challenge">
            Submeter
          </Step.PrimaryButton>
        </Step.Form>
      </Step>
      <Step
        id="finish-challenge"
        title="Finalizar projeto"
        description="Quando acabar o seu Mini Projeto é só marcar aqui como concluído."
        last
        status={steps.find((step) => step.id === "finish-challenge")?.status!}
      >
        <Step.Form user={user} slug={slug}>
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
