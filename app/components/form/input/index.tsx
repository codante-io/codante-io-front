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
        className="dark:text-zinc-400 text-slate-600 text-sm block text-inter font-light mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`rounded p-2 px-3 dark:bg-[#0e141a] border dark:border-slate-700 border-slate-300 dark:text-zinc-50 text-slate-600 w-full font-light disabled:dark:text-zinc-400 disabled:text-slate-400 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-dark ${className}`}
        id={id}
        type={type}
        name={name}
        {...rest}
      />
    </>
  );
}
