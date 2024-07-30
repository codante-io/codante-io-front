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
import { cn } from "~/lib/utils";

type MainTechFilterProps = {
  selectedTechs?: string | null;
  baseUrl: string;
};

export default function MainTechFilter({
  selectedTechs,
  baseUrl,
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
  ];

  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {technologies.map((technology) => {
        const isSelected = selectedTechs?.includes(technology.value);
        return (
          <Link
            to={
              isSelected ? baseUrl : `${baseUrl}?tecnologia=${technology.value}`
            }
            preventScrollReset
            prefetch="intent"
            key={technology.value}
            className={cn(
              "flex items-center gap-2 p-3 md:py-3 py-2 text-sm text-gray-500 dark:text-gray-400 font-light transition-colors border-[1.5px] rounded-xl cursor-pointer group dark:border-gray-700 border-gray-300 hover:border-brand-300 hover:dark:border-brand-300",
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
