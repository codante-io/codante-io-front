import { CgSpinner } from "react-icons/cg";
import type { ButtonProps } from "../../../ui/button";
import { CheckIcon } from "@heroicons/react/24/solid";
import { NewButton } from "~/components/ui/new-button";

type LoadingButtonProps = {
  children: React.ReactNode;
  status: "idle" | "loading" | "submitting";
  isSuccessfulSubmission?: boolean;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
} & ButtonProps;

export default function LoadingButton({
  children,
  className,
  size = "default",
  status,
  isSuccessfulSubmission = false,
  ...rest
}: LoadingButtonProps) {
  return (
    <NewButton
      disabled={status !== "idle" || isSuccessfulSubmission}
      size={size}
      className={`relative ${className}`}
      {...rest}
    >
      {(status === "submitting" || status === "loading") && (
        <div className="absolute inset-0 flex justify-center items-center py-2">
          <CgSpinner className="w-5 h-5 animate-spin" />
        </div>
      )}
      {isSuccessfulSubmission && (
        <div className="absolute inset-0 flex justify-center items-center py-2">
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
    </NewButton>
  );
}
