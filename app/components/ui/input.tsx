import * as React from "react";

import { cn } from "~/lib/utils/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border dark:border-gray-700 border-slate-300 dark:text-gray-50 text-gray-600 px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50  dark:bg-background-900 dark:ring-offset-gray-950 dark:placeholder:text-gray-400  dark:disabled:bg-background-800",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
