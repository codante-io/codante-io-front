import type { ReactNode } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { cn } from "~/lib/utils/cn";
import type { StepStatus, UserStepsIds } from "../../../../build-steps.server";
import { Form, useLocation } from "@remix-run/react";
import LoadingButton from "~/components/features/form/loading-button";
import React from "react";
import { Card } from "~/components/ui/cards/card";

type StepProps = {
  id: UserStepsIds;
  title: string;
  description: ReactNode;
  status: StepStatus;
  last?: boolean;
  children?: React.ReactNode;
  className?: string;
};

type StepLineProps = {
  last?: boolean;
  status: StepStatus;
};

type StepIconProps = {
  status: StepStatus;
};

type StepContentProps = {
  title: string;
  description: ReactNode;
  children: ReactNode;
};

type StepFormProps = {
  slug: string;
  user: any;
  children: ReactNode;
};

type StepPrimaryButtonProps = {
  stepId: UserStepsIds;
  children: ReactNode;
};

type StepsContainerProps = {
  children: ReactNode;
  className?: string;
};

function Step({
  id,
  title,
  description,
  status,
  last = false,
  className,
  children,
}: StepProps) {
  return (
    <li id={id} className={cn("relative", "pb-10", className)}>
      <StepLine last={last} status={status} />
      <div className="relative flex items-start group">
        <StepIcon status={status} />
        <StepContent title={title} description={description}>
          {children}
        </StepContent>
      </div>
    </li>
  );
}

function StepLine({ last, status }: StepLineProps) {
  if (last) {
    return null;
  }

  return (
    <div
      className={cn(
        "absolute left-3 top-3 -ml-px mt-0.5 h-full w-0.5",
        { "bg-blue-300 dark:bg-blue-900": status === "completed" },
        { "bg-gray-300 dark:bg-gray-400": status !== "completed" },
      )}
      aria-hidden="true"
    />
  );
}

function StepIcon({ status }: StepIconProps) {
  if (status === "completed") {
    return <StepIconCompleted />;
  }

  if (status === "current") {
    return <StepIconCurrent />;
  }

  return <StepIconUpcoming />;
}

function StepContent({ title, description, children }: StepContentProps) {
  return (
    <div className="flex flex-col min-w-0 ml-4">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-300">
        {description}
        {children}
      </div>
    </div>
  );
}

function StepIconCompleted() {
  return (
    <span className="flex items-center h-9">
      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-blue-300 rounded-full dark:bg-blue-900 group-hover:bg-blue-400 dark:group-hover:bg-blue-950">
        <AiOutlineCheck className="w-3 h-3 text-white" aria-hidden="true" />
      </span>
    </span>
  );
}

function StepIconCurrent() {
  return (
    <span className="flex items-center h-9" aria-hidden="true">
      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 rounded-full border-brand">
        <span className="h-2.5 w-2.5 rounded-full bg-brand animate-pulse" />
      </span>
    </span>
  );
}

function StepIconUpcoming() {
  return (
    <span className="flex items-center h-9">
      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
        {" "}
        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 bg-gray-300 dark:bg-gray-400" />
      </span>
    </span>
  );
}

function StepForm({ slug, user, children }: StepFormProps) {
  const location = useLocation();
  return (
    <Form
      className="mt-2"
      method="post"
      action={`/mini-projetos/${slug}`}
      preventScrollReset
    >
      <input type="hidden" name="redirectTo" value={location.pathname} />
      <input type="hidden" name="user" value={user} />
      {children}
    </Form>
  );
}

function StepPrimaryButton({ stepId, children }: StepPrimaryButtonProps) {
  return (
    <LoadingButton
      size="sm"
      status="idle"
      type="submit"
      className="mt-3"
      name="intent"
      value={stepId}
    >
      {children}
    </LoadingButton>
  );
}

function StepsContainer({ children, className }: StepsContainerProps) {
  return (
    <Card
      as="aside"
      className={`${className} relative w-full rounded-lg p-4 pt-3 font-inter`}
    >
      <nav aria-label="Progress" className="my-4 mx-1">
        <ol className="overflow-hidden">{children}</ol>
      </nav>
    </Card>
  );
}

Step.StepsContainer = StepsContainer;
Step.Form = StepForm;
Step.PrimaryButton = StepPrimaryButton;
Step.Line = StepLine;
Step.Icon = StepIcon;
Step.Content = StepContent;
Step.IconCompleted = StepIconCompleted;
Step.IconCurrent = StepIconCurrent;
Step.IconUpcoming = StepIconUpcoming;
Step.Form = StepForm;
Step.PrimaryButton = StepPrimaryButton;
Step.Line = StepLine;

export default Step;
