import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils/cn";

const alertVariants = cva(
  "relative w-full rounded-lg border border-background-200 px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current dark:border-background-800",
  {
    variants: {
      variant: {
        default:
          "bg-white text-gray-950 dark:bg-background-800 dark:text-gray-50",
        destructive:
          "text-red-500 bg-white [&>svg]:text-current *:data-[slot=alert-description]:text-red-500/90 dark:text-red-900 dark:bg-background-800 dark:*:data-[slot=alert-description]:text-red-900/90",
        warning:
          "text-amber-500 bg-white [&>svg]:text-current *:data-[slot=alert-description]:text-amber-500/90 dark:text-amber-900 dark:bg-background-800 dark:*:data-[slot=alert-description]:text-amber-900/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-gray-500 col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed dark:text-gray-400",
        className,
      )}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription };
