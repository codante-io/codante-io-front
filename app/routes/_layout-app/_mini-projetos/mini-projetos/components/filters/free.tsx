import { Link } from "@remix-run/react";
import { Gift, Star } from "lucide-react";
import { cn } from "~/lib/utils/cn";

type FreeFilterProps = {
  selectedFilter?: string | null;
  baseUrl: string;
};

function getUrl(
  baseUrl: string,
  isSelected: boolean | undefined,
  filter: string,
) {
  if (typeof window === "undefined") {
    return baseUrl;
  }

  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (isSelected) {
    searchParams.delete("gratuito");
  } else {
    searchParams.set("gratuito", filter);
  }
  return `${url.pathname}?${searchParams.toString()}`;
}

export default function FreeFilter({
  selectedFilter,
  baseUrl,
}: FreeFilterProps) {
  const filters = [
    {
      key: "true",
      label: "Gratuito",
      icon: ({ isSelected }: { isSelected: boolean }) => (
        <Gift
          className={cn(
            "w-4 h-4 text-gray-500 group-hover:text-green-600",
            isSelected && "text-green-600",
          )}
        />
      ),
    },
    {
      key: "false",
      label: "Pro",
      icon: ({ isSelected }: { isSelected: boolean }) => (
        <Star
          className={cn(
            "w-4 h-4 text-gray-500 group-hover:text-yellow-600",
            isSelected && "text-yellow-600",
          )}
        />
      ),
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {filters.map(({ key, label, icon }) => {
        const isSelected = selectedFilter === key;
        return (
          <Link
            to={getUrl(baseUrl, isSelected, key)}
            preventScrollReset
            prefetch="intent"
            key={key}
            className={cn(
              "flex items-center gap-2 p-3 md:py-3 py-2 text-xs text-gray-500 dark:text-gray-400 font-light transition-colors border-[1.5px] rounded-xl cursor-pointer group dark:border-background-700 border-background-300 hover:border-brand-300 dark:hover:border-brand-300 group-hover:scale-105",
              isSelected &&
                "scale-105 grayscale-0 border-brand-300 dark:border-brand-300 dark:text-white text-gray-700 bg-background-100 dark:bg-background-800 ",
            )}
          >
            {icon({ isSelected })}
            {label}
          </Link>
        );
      })}
    </div>
  );
}
