import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm  ring-offset-white transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-brand text-gray-50 hover:bg-brand/90 dark:bg-brand dark:text-white dark:hover:bg-brand/90",
        destructive:
          "bg-red-500 text-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90",
        outline:
          "border-[1.5px] border-background-300 bg-white text-gray-800 hover:text-gray-900 hover:bg-gray-100 dark:border-background-600 dark:bg-background-800 dark:hover:bg-background-700 dark:hover:text-gray-100 dark:text-gray-50",
        "outline-ghost":
          "border-[1.5px] border-background-300 dark:border-background-600 hover:bg-background-100 hover:text-gray-900 dark:hover:bg-background-700 dark:hover:text-gray-100 dark:text-gray-50",
        secondary:
          "bg-background-100 text-background-900 hover:bg-background-100/80 dark:bg-background-800 dark:text-background-50 dark:hover:bg-background-800/80",
        ghost:
          "hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50",
        link: "text-gray-900 underline-offset-4 hover:underline dark:text-gray-50",
        pro: "text-gray-700 bg-linear-to-r animate-bg from-amber-100 via-amber-200 to-amber-400",
        register:
          "bg-background-200 text-gray-700 dark:bg-background-800 dark:text-gray-300 bg-grainy overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-md px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export type ButtonVariantProps = VariantProps<typeof buttonVariants>["variant"];
export type ButtonVariantSize = VariantProps<typeof buttonVariants>["size"];

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
