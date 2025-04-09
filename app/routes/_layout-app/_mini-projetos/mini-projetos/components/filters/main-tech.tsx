import {
  SiFigma,
  SiFigmaHex,
  SiJavascript,
  SiJavascriptHex,
  SiNextdotjs,
  SiReact,
  SiReactHex,
  SiTailwindcss,
  SiTailwindcssHex,
} from "@icons-pack/react-simple-icons";
import { Link } from "@remix-run/react";
import { AiFillTrophy } from "react-icons/ai";
import { cn } from "~/lib/utils/cn";

type MainTechFilterProps = {
  selectedTechs?: string | null;
  baseUrl: string;
  techsToDisplay?: string[];
};

function getUrl(
  baseUrl: string,
  isSelected: boolean | undefined,
  tech: string,
) {
  if (typeof window === "undefined") {
    return baseUrl;
  }

  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (isSelected) {
    searchParams.delete("tecnologia");
  } else {
    searchParams.set("tecnologia", tech);
  }
  return `${url.pathname}?${searchParams.toString()}`;
}

export default function MainTechFilter({
  selectedTechs,
  baseUrl,
  techsToDisplay = ["nextjs", "tailwindcss", "react", "fundamentos", "ui-ux"],
}: MainTechFilterProps) {
  const technologies = [
    {
      name: "Next.js",
      icon: (props: any) => <SiNextdotjs {...props} />,
      color: "#fff",
      value: "nextjs",
      hoverClass: "dark:group-hover:text-[#fff] group-hover:text-black",
      selectClass: "text-black dark:text-white",
    },
    {
      name: "TailwindCSS",
      icon: (props: any) => <SiTailwindcss {...props} />,
      color: SiTailwindcssHex,
      value: "tailwindcss",
      hoverClass: "group-hover:text-[#06B6D4]",
      selectClass: "text-[#06B6D4]",
    },
    {
      name: "React",
      icon: (props: any) => <SiReact {...props} />,
      color: SiReactHex,
      value: "react",
      hoverClass: "group-hover:text-[#61DAFB]",
      selectClass: "text-[#61DAFB]",
    },
    {
      name: "Fundamentos",
      icon: (props: any) => <SiJavascript {...props} />,
      color: SiJavascriptHex,
      value: "fundamentos",
      hoverClass: "group-hover:text-[#F7DF1E]",
      selectClass: "text-[#F7DF1E]",
    },
    {
      name: "UI/UX",
      icon: (props: any) => <SiFigma {...props} />,
      value: "ui-ux",
      color: SiFigmaHex,
      hoverClass: "group-hover:text-[#F24E1E]",
      selectClass: "text-[#F24E1E]",
    },
    {
      name: "Hackathon",
      icon: (props: any) => <AiFillTrophy {...props} />,
      value: "hackathon",
      color: "#fcd34d",
      hoverClass: "group-hover:text-[#fcd34d] group-hover:fill-[#fcd34d]",
      selectClass: "text-[#fcd34d]",
    },
  ];

  const filteredTechs = technologies.filter((tech) =>
    techsToDisplay.includes(tech.value),
  );

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {filteredTechs.map((technology) => {
        const isSelected = selectedTechs?.includes(technology.value);
        return (
          <Link
            to={getUrl(baseUrl, isSelected, technology.value)}
            preventScrollReset
            prefetch="intent"
            key={technology.value}
            className={cn(
              "flex items-center gap-2 p-3 md:py-3 py-2 text-xs text-gray-500 dark:text-gray-400 font-light transition-colors border-[1.5px] rounded-xl cursor-pointer group dark:border-background-700 border-background-300 hover:border-brand-300 dark:hover:border-brand-300",
              isSelected &&
                "border-brand-300 dark:border-brand-300 dark:text-white text-gray-700 bg-background-100 dark:bg-background-800",
            )}
          >
            {technology.icon({
              className: cn(
                "w-4 h-4 transition transtition-color scale-90 group-hover:text-brand-400 group-hover:scale-105",
                technology.hoverClass,
                isSelected && "scale-105",
                isSelected && technology.selectClass,
              ),
            })}
            {technology.name}
          </Link>
        );
      })}
    </div>
  );
}
