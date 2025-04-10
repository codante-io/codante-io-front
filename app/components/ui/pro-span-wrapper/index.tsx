import type { ReactNode } from "react";

export default function ProSpanWrapper({ children }: { children: ReactNode }) {
  return (
    <span className="text-white font-semibold dark:text-gray-900 px-[3px] py-[2px] rounded-lg bg-amber-400">
      {children}
    </span>
  );
}
