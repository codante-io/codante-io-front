import { cn } from "~/lib/utils/cn";

export default function PlayerGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full bg-background-900",
        "", // mobile
        "lg:grid", // desktop
      )}
    >
      {children}
    </div>
  );
}
