import type { EventHandler, ReactNode } from "react";
import { AiOutlineCheck } from "react-icons/ai";
import { cn } from "~/lib/utils/cn";
import type { StepStatus, UserStepsIds } from "../../../../build-steps.server";
import type { FormProps } from "react-router";
import { Form, useLocation } from "react-router";
import LoadingButton from "~/components/features/form/loading-button";
import { Card } from "~/components/ui/cards/card";
import BecomeProDialog from "~/components/ui/become-pro-dialog";
import { Button } from "~/components/ui/button";
import { LockIcon } from "lucide-react";

// Types for props
type StepProps = {
  id: UserStepsIds;
  title: string;
  description: ReactNode;
  status: StepStatus;
  last?: boolean;
  children?: ReactNode;
  className?: string;
};
type StepLineProps = { last?: boolean; status: StepStatus };
type StepIconProps = { status: StepStatus };
type StepContentProps = {
  title: string;
  description: ReactNode;
  status: StepStatus;
  children: ReactNode | null;
};
type StepFormProps = {
  slug: string;
  user: any;
  children: ReactNode;
  action?: string;
  className?: string;
} & FormProps;

type StepPrimaryButtonProps = {
  stepId: UserStepsIds;
  status?: "idle" | "loading" | "submitting";
  children: ReactNode;

  onClick?: EventHandler<React.MouseEvent>;
};
type StepsContainerProps = { children: ReactNode; className?: string };

// Main Step component
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
    <li id={id} className={cn("relative pb-10", last && "pb-0", className)}>
      <Step.Line last={last} status={status} />
      <div className="relative flex items-start group">
        <Step.Icon status={status} />
        <Step.Content title={title} description={description} status={status}>
          {children}
        </Step.Content>
      </div>
    </li>
  );
}

// Step line component
function StepLine({ last, status }: StepLineProps) {
  if (last) return null;
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

// Step icon component selector
function StepIcon({ status }: StepIconProps) {
  switch (status) {
    case "completed":
      return <StepIconCompleted />;
    case "current":
      return <StepIconCurrent />;
    default:
      return <StepIconUpcoming />;
  }
}

// Step content component
function StepContent({
  title,
  description,
  status,
  children,
}: StepContentProps) {
  return (
    <div className="flex flex-col min-w-0 ml-4">
      <h4 className="text-sm font-medium">{title}</h4>
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-500 font-light">
        {description}
        {status === "current" ? children : null}
      </div>
    </div>
  );
}

// Completed icon
function StepIconCompleted() {
  return (
    <span className="flex items-center h-9">
      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-blue-300 rounded-full dark:bg-blue-900 group-hover:bg-blue-400 dark:group-hover:bg-blue-950">
        <AiOutlineCheck className="w-3 h-3 text-white" aria-hidden="true" />
      </span>
    </span>
  );
}

// Current icon
function StepIconCurrent() {
  return (
    <span className="flex items-center h-9" aria-hidden="true">
      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 rounded-full border-brand">
        <span className="h-2.5 w-2.5 rounded-full bg-brand animate-pulse" />
      </span>
    </span>
  );
}

// Upcoming icon
function StepIconUpcoming() {
  return (
    <span className="flex items-center h-9">
      <span className="relative z-10 flex items-center justify-center w-6 h-6 bg-white border-2 border-gray-300 rounded-full group-hover:border-gray-400">
        <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300 bg-gray-300 dark:bg-gray-400" />
      </span>
    </span>
  );
}

// Step form component
function StepForm({
  slug,
  user,
  children,
  className,
  action = undefined,
  ...rest
}: StepFormProps) {
  const location = useLocation();
  return (
    <Form
      className={cn("mt-2 pr-1", className)}
      method="post"
      action={action ? action : `/mini-projetos/${slug}`}
      preventScrollReset
      {...rest}
    >
      <input type="hidden" name="redirectTo" value={location.pathname} />
      <input type="hidden" name="user" value={user} />
      {children}
    </Form>
  );
}

// Primary button inside the step
function StepPrimaryButton({
  stepId,
  children,
  status = "idle",
  onClick,
}: StepPrimaryButtonProps) {
  return (
    <LoadingButton
      onClick={onClick}
      size="sm"
      status={status}
      type="submit"
      className="mt-3"
      name="intent"
      value={stepId}
    >
      {children}
    </LoadingButton>
  );
}

function StepBecomeProDialogButton() {
  return (
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
            Considere assinar para ter acesso a esse e muitos outros projetos.
          </p>
        </div>
      }
    />
  );
}

// Steps container component
function StepsContainer({ children, className }: StepsContainerProps) {
  return (
    <Card
      as="aside"
      className={cn(
        className,
        "relative w-full rounded-lg p-4 pt-3 font-inter",
      )}
    >
      <nav aria-label="Progress" className="my-4 mx-1">
        <ol className="overflow-hidden">{children}</ol>
      </nav>
    </Card>
  );
}

// Assign subcomponents to the Step component
Step.StepsContainer = StepsContainer;
Step.Form = StepForm;
Step.PrimaryButton = StepPrimaryButton;
Step.Line = StepLine;
Step.Icon = StepIcon;
Step.Content = StepContent;
Step.IconCompleted = StepIconCompleted;
Step.IconCurrent = StepIconCurrent;
Step.IconUpcoming = StepIconUpcoming;
Step.BecomeProDialogButton = StepBecomeProDialogButton;
export default Step;
