import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { CardProps } from "~/components/ui/cards/card";
import { Card, CardFooter } from "~/components/ui/cards/card";
import { cn } from "~/lib/utils/cn";

const submissionCardVariants = cva("", {
  variants: { size: { sm: "w-[275px]", md: "w-[377px]", full: "w-full" } },
  defaultVariants: { size: "md" },
});

interface SubmissionCardProps
  extends CardProps,
    VariantProps<typeof submissionCardVariants> {}

function SubmissionCard({
  children,
  size,
  className,
  ...props
}: SubmissionCardProps) {
  return (
    <Card
      as="article"
      className={cn(
        " overflow-hidden rounded-xl border-[1.5px] shadow-2xs text-gray-800 dark:text-white transition-shadow",
        "dark:border-background-600 border-background-200",
        submissionCardVariants({ size }),
        className,
      )}
      {...props}
    >
      {children}
    </Card>
  );
}

type SubmissionCardImageProps = { imageUrl: string; submissionUrl?: string };

function SubmissionCardImage({ imageUrl }: SubmissionCardImageProps) {
  return (
    <img
      src={imageUrl}
      alt="Screenshot da aplicação submetida"
      className={cn("w-full transition-all delay-75 aspect-video")}
    />
  );
}

type SubmissionCardFooterProps = React.HTMLAttributes<HTMLDivElement>;

function SubmissionCardFooter({
  children,
  className,
  ...props
}: SubmissionCardFooterProps) {
  return (
    <CardFooter
      className={cn(
        "block dark:bg-background-700 p-3 py-4 px-3 dark:text-white text-gray-700",
        className,
      )}
      {...props}
    >
      {children}
    </CardFooter>
  );
}

export { SubmissionCard, SubmissionCardImage, SubmissionCardFooter };
