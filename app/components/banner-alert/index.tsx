import React from "react";

export default function BannerAlert({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="px-4 py-3 mb-8 -mt-8 bg-blue-100 border-t-4 rounded-b shadow-md text-brand border-brand dark:bg-blue-950"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <svg
            className="w-6 h-6 mr-4 text-blue-500 fill-current dark:text-blue-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-blue-500 dark:text-blue-300">{title}</p>
          <p className="text-sm text-blue-500 dark:text-blue-300">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}