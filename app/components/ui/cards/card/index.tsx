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
          "dark:border-background-700 border-background-200 dark:shadow-md shadow-xs",
        bright: "dark:border-background-600 border-background-200 shadow-md", // mais brilhante
        dull: "dark:border-background-700 border-background-100 shadow-xs", // mais discreto
        brand: "border-brand-500 dark:border-brand-500 shadow-md",
        "brand-l":
          "dark:border-background-600 border-background-200 border-l-brand-500 dark:border-l-brand-500 dark:border-l-4 border-l-4 shadow-md",
        none: "border-0 shadow-xs",
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

const movingBorderCardVariants = cva("relative overflow-hidden", {
  variants: {
    rounded: {
      default: "rounded-lg",
      "2xl": "rounded-2xl",
    },
  },
  defaultVariants: {
    rounded: "default",
  },
});

const movingBorderCardSpanVariants = cva(
  "absolute -z-0 inset-0 group/border scale-x-[1.5] blur-xs before:absolute before:inset-0 before:h-10 before:top-[45%] before:w-full before:bg-[conic-gradient(var(--tw-gradient-stops))] before:via-transparent before:to-transparent before:animate-rotate-bg",
  {
    variants: {
      movingBorderColor: {
        blue: "before:from-blue-900 dark:before:from-[#67d7eb]",
        pro: "before:from-amber-400 dark:before:from-amber-400",
      },
    },
    defaultVariants: {
      movingBorderColor: "blue",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
  as?: string;
}

export interface MovingBorderProps
  extends VariantProps<typeof movingBorderCardSpanVariants>,
    VariantProps<typeof movingBorderCardVariants> {}

export interface MovingBorderCardProps extends CardProps, MovingBorderProps {}

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

const MovingBorderCard = React.forwardRef<
  HTMLDivElement,
  MovingBorderCardProps
>(
  (
    {
      className,
      as = "div",
      asChild = false,
      border,
      hover,
      rounded,
      movingBorderColor,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : as;
    return (
      <div
        className={cn(
          "relative p-[1px] bg-transparent",
          movingBorderCardVariants({ rounded }),
        )}
      >
        <span
          aria-hidden="true"
          className={movingBorderCardSpanVariants({ movingBorderColor })}
        ></span>
        <Comp
          ref={ref}
          className={cn(cardVariants({ rounded, className, border, hover }))}
          {...props}
        ></Comp>
      </div>
    );
  },
);
MovingBorderCard.displayName = "MovingBorderCard";

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
  MovingBorderCard,
};
