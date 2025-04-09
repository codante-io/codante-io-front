import React from "react";

type AuthCardProps = {
  children: React.ReactNode;
  className?: string;
};

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={`dark:bg-[#17212B] shadow-xs bg-white border-[1.5px] border-background-200 dark:border-background-700 px-4 p-8 sm:px-10 rounded-2xl ${className}`}
    >
      {children}
    </div>
  );
}
