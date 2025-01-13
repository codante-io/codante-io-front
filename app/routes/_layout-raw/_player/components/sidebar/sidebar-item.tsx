import { Link } from "@remix-run/react";
import { BsCheck } from "react-icons/bs";
import { cn } from "~/lib/utils/cn";

type SidebarItemProps = {
  id: number;
  name: string;
  current: boolean;
  href: string;
  completed: boolean;
  isFirst: boolean;
  isLast: boolean;
};

export default function SidebarItem({
  id,
  name,
  current,
  completed,
  href,
  isFirst,
  isLast,
}: SidebarItemProps) {
  return (
    <Link to={href}>
      <li
        id={`lesson-${id}`}
        className="flex items-center gap-4 pl-2 ml-2 transition-colors dark:hover:bg-background-700 hover:bg-background-150 rounded-xl group/lesson"
      >
        <div className="relative py-[1.4rem]">
          {!isFirst && (
            <div
              className={
                "absolute h-[23%] top-0 left-[calc(50%-1px)] w-[2px] rounded-b-full dark:bg-background-600 bg-background-200"
              }
            />
          )}

          {completed ? (
            <BsCheck
              className={cn(
                "w-3 h-3 text-emerald-600 scale-150",
                current && "animate-pulse text-emerald-300",
              )}
            />
          ) : (
            <div className="relative">
              {current && (
                <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping dark:bg-white bg-background-600"></span>
              )}

              <div
                className={cn(
                  "w-3 h-3 rounded-full dark:bg-background-600 bg-background-300",
                  completed && "dark:bg-emerald-600 bg-emerald-600",
                  current && "dark:bg-white bg-brand-500 scale-125 ",
                )}
              />
            </div>
          )}

          {!isLast && (
            <div
              className={
                "absolute h-[23%] bottom-0 left-[calc(50%-1px)] w-[2px] rounded-t-full dark:bg-background-600 bg-background-200"
              }
            />
          )}
        </div>
        <span
          className={cn(
            "dark:text-gray-400 text-gray-600 dark:group-hover/lesson:text-white group-hover/lesson:text-background-700 decoration-[1px] underline-offset-1 text transition-colors",
            current && "font-semibold dark:text-white text-background-700",
          )}
        >
          {name}
        </span>
      </li>
    </Link>
  );
}
