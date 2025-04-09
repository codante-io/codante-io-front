import classNames from "~/lib/utils/class-names";

type InputProps = {
  name: string;
  id: string;
  label: string;
  type?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  name,
  id,
  label,
  type = "text",
  className = "",
  ...rest
}: InputProps) {
  return (
    <>
      <label
        className="dark:text-gray-400 text-gray-600 text-sm block text-inter font-light mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={classNames(
          "rounded-xs p-2 px-3 dark:bg-[#0e141a] border dark:border-slate-700 border-slate-300 dark:text-gray-50 text-gray-600 w-full font-light dark:disabled:text-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-background-50 dark:disabled:bg-background-800",
          className,
        )}
        id={id}
        type={type}
        name={name}
        {...rest}
      />
    </>
  );
}
