import { MagicCard } from "~/components/ui/cards/magic-card";

import { useColorMode } from "~/lib/contexts/color-mode-context";
import { ArrowRight } from "lucide-react";

export default function SocialNetworkCard({
  icon,
  description,
  callToAction = "Siga",
}: {
  icon: React.ReactNode;
  description: string;
  callToAction: string;
}) {
  const { colorMode } = useColorMode();

  return (
    <MagicCard
      className="cursor-pointer flex-col items-center justify-center whitespace-nowrap text-4xl aspect-square"
      gradientColor={colorMode === "dark" ? "#364C63" : "#CCDAFF"}
      gradientFrom={colorMode === "dark" ? "#CCDAFF" : "#F1F4F8"}
      gradientTo={colorMode === "dark" ? "#364C63" : "#CCDAFF"}
    >
      <div className="flex flex-col items-center justify-center gap-6">
        {icon}
        <span className="text-xs dark:text-gray-300 text-gray-600 bg-transparent dark:bg-transparent group-hover:bg-background-100 dark:group-hover:bg-background-700 px-4 py-1 rounded-full relative">
          <span className="opacity-100 group-hover:opacity-0 transition-opacity duration-300 dark:text-gray-400">
            {description}
          </span>
          <span className="left-1/2 -translate-x-1/2 flex top-1/2 gap-2 -translate-y-1/2 items-center absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {callToAction} <ArrowRight className="w-3 h-3" />
          </span>
        </span>
      </div>
    </MagicCard>
  );
}
