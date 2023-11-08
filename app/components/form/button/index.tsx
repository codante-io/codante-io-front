export type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
  textColorClass?: string;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type,
  className,
  textColorClass = "text-white",
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
      rounded bg-brand px-5 py-2 text-sm transition duration-200 hover:bg-opacity-90 disabled:cursor-not-allowed disabled:bg-opacity-60 ${className} ${textColorClass}`}
      {...rest}
    >
      {children}
    </button>
  );
}
