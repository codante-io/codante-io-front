import { cn } from "~/lib/utils/cn";

export default function PlayerGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full dark:bg-background-900 bg-background-50 z-10 relative",
        "", // mobile
        "lg:grid", // desktop
      )}
    >
      {children}
    </div>
  );
}
