import { cn } from "~/lib/utils/cn";

export default function SidebarSectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        `text-lg dark:bg-background-900 bg-background-50 font-lexend pb-2 font-semibold z-20 sticky top-0 text-gray-700 dark:text-gray-300`,
        className,
      )}
    >
      {children}
    </h3>
  );
}
