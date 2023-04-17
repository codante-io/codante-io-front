type InputProps = {
  name: string;
  id: string;
  label: string;
  type?: string;
  className?: string;
};

export default function Input({
  name,
  id,
  label,
  type = "text",
  className = "",
}: InputProps) {
  return (
    <>
      <label
        className="dark:text-slate-300 text-slate-600 text-sm mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`rounded p-2 px-3 dark:bg-[#0e141a] border dark:border-slate-700 dark:text-white text-slate-600 ${className}`}
        id={id}
        type={type}
        name={name}
      />
    </>
  );
}
