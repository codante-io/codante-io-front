import { cn } from "~/lib/utils/cn";

function ProOverlay({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "inline-block rounded-md h-4 dark:bg-background-700 bg-gray-200 w-40 align-middle",
        className,
      )}
    ></div>
  );
}

export default ProOverlay;
