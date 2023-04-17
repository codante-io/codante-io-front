type ButtonProps = {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  className?: string;
};

export default function Button({ children, type, className }: ButtonProps) {
  return (
    <button
      type={type}
      className={`mt-4 rounded font-medium  bg-[#5282FF] text-white p-[0.4rem] px-8 border-b-2 -700 border-b-[#4572E4] ${className}`}
    >
      {children}
    </button>
  );
}
