import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "~/lib/utils/cn";

const cardVariants = cva(
  "border-[1.5px] bg-background-50 dark:bg-background-800 dark:text-white transition-colors overflow-hidden",
  {
    variants: {
      border: {
        default:
          "dark:border-background-700 border-background-200 dark:shadow-md shadow",
        bright: "dark:border-background-600 border-background-200 shadow-md", // mais brilhante
        dull: "dark:border-background-700 border-background-100 shadow", // mais discreto
        brand: "border-brand-500 dark:border-brand-500 shadow-md",
        "brand-l":
          "dark:border-background-600 border-background-200 border-l-brand-500 dark:border-l-brand-500 dark:border-l-4 border-l-4 shadow-md",
        none: "border-0 shadow",
      },
      hover: {
        default: "",
        "brand-light":
          "hover:shadow-md hover:border-brand-300 dark:hover:border-brand-300",
        brand:
          "hover:shadow-md hover:border-brand-400 dark:hover:border-brand-400",
      },
      rounded: {
        default: "rounded-lg",
        "2xl": "rounded-2xl",
      },
    },
    defaultVariants: {
      border: "default",
      hover: "default",
      rounded: "default",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  as?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      as = "div",
      asChild = false,
      border,
      hover,
      rounded,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : as;
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ border, hover, rounded, className }))}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

// Other Components

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight font-lexend",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-500 dark:text-gray-400", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  cardVariants,
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
