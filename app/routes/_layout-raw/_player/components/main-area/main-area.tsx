import { cn } from "~/lib/utils/cn";

export default function MainArea({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        `w-full relative min-h-screen flex transition-all duration-500  justify-center  lg:min-h-[calc(100vh-200px)] max-w-[1650px] mx-auto`,
        "grid grid-cols-1  px-4", // mobile
        "lg:grid  lg:grid-cols-[350px,1fr] lg:gap-6", // desktop
      )}
    >
      {children}
    </div>
  );
}
