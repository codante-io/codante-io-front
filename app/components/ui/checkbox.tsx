import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "~/lib/utils/cn";

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer border-gray-200 dark:bg-gray-200/30 data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:data-[state=checked]:bg-gray-900 data-[state=checked]:border-gray-900 focus-visible:border-gray-950 focus-visible:ring-gray-950/50 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500 size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:dark:bg-gray-800/30 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900 dark:dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:border-gray-50 dark:focus-visible:border-gray-300 dark:focus-visible:ring-gray-300/50 dark:aria-invalid:ring-red-900/20 dark:dark:aria-invalid:ring-red-900/40 dark:aria-invalid:border-red-900",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
