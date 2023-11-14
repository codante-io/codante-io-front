export type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  textColorClass?: string;
  bgClass?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type,
  className,
  textColorClass = "text-white",
  bgClass = "bg-brand hover:bg-opacity-90 disabled:bg-opacity-60",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
      rounded px-5 py-2 text-sm transition duration-200 disabled:cursor-not-allowed ${className} ${textColorClass} ${bgClass}`}
      {...rest}
    >
      {children}
    </button>
  );
}
