import React from "react";

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={`dark:bg-[#17212B] shadow bg-white border-[1.5px] border-gray-300 dark:border-slate-700 px-4 p-8 sm:px-10 rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
