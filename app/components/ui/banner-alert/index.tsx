// import { cva } from "class-variance-authority";
import React from "react";
import classNames from "~/lib/utils/class-names";

// const bannerVariants = cva(
//   "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm  ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300",
//   {
//     variants: {
//       variant: {
//         default:
//           "bg-brand-100 dark:bg-brand-950 border-brand px-4 py-3 mb-8 -mt-8 border rounded shadow-md",
//         warning:
//           "bg-brand-100 dark:bg-brand-950 border-yellow-400 px-4 py-3 mb-8 -mt-8 border rounded shadow-md",
//       },
//     },
//     defaultVariants: {
//       variant: "default",
//     },
//   },
// );

export default function BannerAlert({
  children,
  bgColor,
  borderColor,
  className,
}: {
  children?: React.ReactNode;
  bgColor?: string;
  borderColor?: string;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        bgColor || "bg-brand-100 dark:bg-brand-950",
        borderColor || "border-brand",
        "px-4 py-3 mb-8 -mt-8 border rounded shadow-md",
        className,
      )}
    >
      <div className="flex flex-col items-center md:flex-row">{children}</div>
    </div>
  );
}

BannerAlert.Icon = function BannerAlertIcon() {
  return (
    <div className="py-1">
      <svg
        className="w-6 h-6 mr-4 fill-current text-brand-500 dark:text-brand-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
      </svg>
    </div>
  );
};

BannerAlert.Title = function BannerAlertTitle({
  children,
  textColor,
  className,
}: {
  children: React.ReactNode;
  textColor?: string;
  className?: string;
}) {
  return (
    <div
      className={classNames(
        textColor || "text-brand-500 dark:text-brand-300",
        "font-bold",
        className,
      )}
    >
      {children}
    </div>
  );
};

BannerAlert.Subtitle = function BannerAlertSubtitle({
  children,
  textColor,
}: {
  children: React.ReactNode;
  textColor?: string;
}) {
  return (
    <div
      className={classNames(
        textColor || "text-brand-500 dark:text-brand-300",
        "text-sm",
      )}
    >
      {children}
    </div>
  );
};

BannerAlert.Body = function BannerAlertBody({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex-1">{children}</div>;
};
