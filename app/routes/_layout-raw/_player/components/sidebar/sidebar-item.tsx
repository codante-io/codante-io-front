import { BsCheck } from "react-icons/bs";
import { cn } from "~/lib/utils/cn";

type SidebarItemProps = {
  id: string;
  name: string;
  current: boolean;
  completed: boolean;
  isFirst: boolean;
  isLast: boolean;
};

export default function SidebarItem({
  id,
  name,
  current,
  completed,
  isFirst,
  isLast,
}: SidebarItemProps) {
  return (
    <li
      id={`lesson-${id}`}
      className="flex items-center gap-4 dark:hover:bg-background-700 hover:bg-background-150 rounded-xl px-2 group/lesson"
    >
      <div className="relative py-[1.4rem]">
        {!isFirst && (
          <div
            className={
              "absolute h-[23%] top-0 left-[calc(50%-1px)] w-[2px] rounded-b-full dark:bg-background-600 bg-background-600"
            }
          />
        )}

        {completed ? (
          <BsCheck className="w-3 h-3 text-emerald-600 scale-150" />
        ) : (
          <div className="relative">
            {current && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full dark:bg-white bg-background-600 opacity-75"></span>
            )}

            <div
              className={cn(
                "w-3 h-3 rounded-full dark:bg-background-600 bg-background-600",
                completed && "dark:bg-emerald-600 bg-emerald-600",
                current && "dark:bg-white bg-background-600 scale-125 ",
              )}
            />
          </div>
        )}

        {!isLast && (
          <div
            className={
              "absolute h-[23%] bottom-0 left-[calc(50%-1px)] w-[2px] rounded-t-full dark:bg-background-600 bg-background-600"
            }
          />
        )}
      </div>
      <span
        className={cn(
          "dark:text-gray-400 text-gray-600 dark:group-hover/lesson:text-white group-hover/lesson:text-background-700 decoration-[1px] underline-offset-1",
          current && "font-semibold dark:text-white text-background-700",
        )}
      >
        {name}
      </span>
    </li>
  );
}
