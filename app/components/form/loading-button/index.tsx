import { CgSpinner } from "react-icons/cg";
import type { ButtonProps } from "../button";
import Button from "../button";
import { CheckIcon } from "@heroicons/react/24/solid";

type LoadingButtonProps = {
  children: React.ReactNode;
  status: "idle" | "loading" | "submitting";
  isSuccessfulSubmission?: boolean;
} & ButtonProps;

export default function LoadingButton({
  children,
  type,
  className,
  status,
  isSuccessfulSubmission = false,
  ...rest
}: LoadingButtonProps) {
  return (
    <Button
      disabled={status !== "idle" || isSuccessfulSubmission}
      type={type}
      className={`relative ${className}`}
      {...rest}
    >
      {(status === "submitting" || status === "loading") && (
        <div className="absolute inset-0 flex justify-center py-2">
          <CgSpinner className="w-5 h-5 animate-spin" />
        </div>
      )}
      {isSuccessfulSubmission && (
        <div className="absolute inset-0 flex justify-center py-2">
          <CheckIcon className="w-5" />
        </div>
      )}
      <span
        className={
          status === "idle" && !isSuccessfulSubmission ? "" : "invisible"
        }
      >
        {children}
      </span>
    </Button>
  );
}
