import { Form, useLocation, useNavigation } from "@remix-run/react";
import { AiOutlineCheck } from "react-icons/ai";
import LoadingButton from "~/components/features/form/loading-button";
import type { Step } from "../../../build-steps.server";
import DiscordButton from "~/components/features/auth/discord-button";
import { BsDiscord } from "react-icons/bs";
import { Card } from "~/components/ui/cards/card";
import { Input } from "~/components/ui/input";
import party from "party-js";
import { Button } from "~/components/ui/button";

export default function JoinChallengeSection({
  className = "",
  initialSteps,
  user,
  slug,
}: {
  className?: string;
  initialSteps?: any;
  user?: any;
  slug: string;
}) {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Card
      as="aside"
      className={`${className} relative w-full rounded-lg p-4 pt-3 font-inter`}
    >
      <nav aria-label="Progress" className="my-4 mx-1">
        <ol className="overflow-hidden">
          {initialSteps?.map((step: Step, stepIndex: number) => (
            <li
              key={step.name}
              className={classNames(
                stepIndex !== initialSteps.length - 1 ? "pb-10" : "",
                "relative",
              )}
            >
              {step.status === "completed" ? (
                <>
                  {stepIndex !== initialSteps.length - 1 ? (
                    <div
                      className="absolute left-3 top-3 -ml-px mt-0.5 h-full w-0.5 bg-blue-300 dark:bg-blue-900"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start group">
                    <span className="flex items-center h-9">
                      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-blue-300 rounded-full dark:bg-blue-900 group-hover:bg-blue-400 dark:group-hover:bg-blue-950">
                        <AiOutlineCheck
                          className="w-3 h-3 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </span>
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="text-sm font-medium">{step.name}</span>
                      <span className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                        {step.description}
                      </span>
                    </span>
                  </div>
                </>
              ) : step.status === "current" ? (
                <>
                  {stepIndex !== initialSteps.length - 1 ? (
                    <div
                      className="absolute left-3 top-3 -ml-px mt-0.5 h-full w-0.5 bg-gray-300 dark:bg-gray-400"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div
                    className="relative flex items-start group"
                    aria-current="step"
                  >
                    <span className="flex items-center h-9" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 rounded-full border-brand">
                        <span className="h-2.5 w-2.5 rounded-full bg-brand animate-pulse" />
                      </span>
                    </span>
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="text-sm font-bold" id={step.intent}>
                        {step.name}
                      </span>
                      <span className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: step.description,
                          }}
                        ></span>
                      </span>
                      <StepForm slug={slug} step={step} user={user} />
                    </span>
                  </div>
                </>
              ) : (
                <>
                  {stepIndex !== initialSteps.length - 1 ? (
                    <div
                      className="absolute left-3 top-3 -ml-px mt-0.5 h-full w-0.5 bg-gray-300 dark:bg-gray-400"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex items-start group">
                    <span className="flex items-center h-9" aria-hidden="true">
                      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
                        {" "}
                        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 bg-gray-300 dark:bg-gray-400" />
                      </span>
                    </span>
                    <span className="flex flex-col min-w-0 ml-4">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        {step.name}
                      </span>
                      <span className="mt-1 text-xs text-gray-500 dark:text-gray-300">
                        {step.description}
                      </span>
                    </span>
                  </div>
                </>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </Card>
  );
}

function StepForm({
  step,
  slug,
  user,
}: {
  step: Step;
  slug: string;
  user: string;
}) {
  const navigation = useNavigation();
  const location = useLocation();

  function getButton() {
    if (step.intent === "join-discord") {
      return (
        <DiscordButton>
          <BsDiscord className="w-3 h-3 mr-2" />
          <span>Entrar</span>
        </DiscordButton>
      );
    }

    if (step.intent === "submit-challenge") {
      return (
        <div className="mt-4 pr-1">
          <Input
            placeholder="URL do seu deploy"
            name="submission-url"
            id="submission-url"
            className=""
          />

          <LoadingButton
            size="sm"
            status={navigation.state}
            type="submit"
            className="mt-3"
            name="intent"
            value={step.intent}
          >
            {step.button}
          </LoadingButton>
        </div>
      );
    }

    if (step.intent === "finish-challenge") {
      return (
        <LoadingButton
          size="sm"
          status={navigation.state}
          type="submit"
          className="mt-4"
          name="intent"
          value={step.intent}
          onClick={({ target }) =>
            party.confetti(target as HTMLElement, {
              count: party.variation.range(40, 250),
            })
          }
        >
          {step.button}
        </LoadingButton>
      );
    }

    return (
      <LoadingButton
        size="sm"
        status={navigation.state}
        type="submit"
        className="mt-4"
        name="intent"
        value={step.intent}
      >
        {step.button}
      </LoadingButton>
    );
  }

  // some steps have secondary buttons
  function getSecondaryButton() {
    return (
      step.secondaryButton && (
        <Button
          type="submit"
          variant="outline"
          className=""
          name="intent"
          value={step.secondaryIntent}
        >
          {step.secondaryButton}
        </Button>
      )
    );
  }

  return (
    <Form method="post" action={`/mini-projetos/${slug}`} preventScrollReset>
      <input type="hidden" name="redirectTo" value={location.pathname} />
      <input type="hidden" name="user" value={user} />
      <section className="flex gap-2 items-center mt-2">
        {getButton()}
        {getSecondaryButton()}
      </section>
    </Form>
  );
}
