import React from "react";

export default function TitleIcon({
  className = "",
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.7411 0L22.0766 7.01012L35.9352 25L22.0766 42.9899L30.7411 50L50 25L30.7411 0Z"
        fill="#5282FF"
      />
      <path
        className="fill-slate-800 dark:fill-white"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.8227 14.4848L8.66419 0L-0.000287894 7.01012L11.1582 21.495C12.7414 23.55 12.7414 26.45 11.1582 28.5051L-0.000287894 42.9899L8.66419 50L19.8227 35.5152C24.5721 29.3499 24.5721 20.6501 19.8227 14.4848Z"
        fill="white"
      />
    </svg>
  );
}
