import { motion } from "framer-motion";
import { PencilRuler } from "lucide-react";
import { useState } from "react";
import { FaLock } from "react-icons/fa";
import { RiLiveLine } from "react-icons/ri";
import { getPublicEnv } from "~/components/_layouts/public-env";
import { useAnimateScroll } from "~/routes/_landing-page/hooks/use-animate-scroll";

function Demo({ parentRef }: { parentRef: React.RefObject<HTMLDivElement> }) {
  const animate = useAnimateScroll({ containerRef: parentRef });
  const [selectedDemo, setSelectedDemo] = useState<"challenge" | "workshop">(
    "challenge",
  );

  return (
    <div style={{ perspective: "1800px" }} className="w-full mt-16">
      <motion.div
        style={animate}
        className="scale-105 mx-auto max-w-screen-xl aspect-video w-full border-2 border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden translate-z-2 mt-4 mb-10"
      >
        <div className="w-full h-12 bg-background-100 dark:bg-background-800 flex justify-between items-center px-4  border-b-4 border-background-200 dark:border-background-700">
          <div className="flex justify-start self-end w-72">
            <div className="flex items-end gap-1 text-xs overflow-hidden text-gray-800 dark:text-gray-300">
              <button
                onClick={() => setSelectedDemo("challenge")}
                aria-selected={selectedDemo === "challenge"}
                className="px-4 py-2 dark:bg-background-800 bg-background-100 aria-selected:dark:bg-background-700 aria-selected:bg-background-100 rounded-t-lg flex items-center gap-1 group text-xs whitespace-nowrap"
              >
                <PencilRuler className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:text-amber-400" />
                mini projeto
              </button>
              <button
                onClick={() => setSelectedDemo("workshop")}
                aria-selected={selectedDemo === "workshop"}
                className="px-4 py-2 dark:bg-background-800 bg-background-100 aria-selected:dark:bg-background-700 aria-selected:bg-background-100 rounded-t-lg flex items-center gap-1 group text-xs whitespace-nowrap"
              >
                <RiLiveLine className="w-3 h-3 opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:text-brand-400" />
                workshop
              </button>
            </div>
          </div>
          <div className="text-xs px-4 lg:px-16 font-inter dark:text-gray-300 text-gray-800 bg-background-200 dark:bg-background-700 py-1 rounded-xl flex items-center ">
            <FaLock className="w-2 h-2 mr-2" />
            codante.io
            <span className="text-gray-500 whitespace-nowrap">
              {selectedDemo === "challenge" ? "/mini-projeto" : "/workshop"}
            </span>
          </div>
          <div className="flex items-center gap-2 justify-end w-72">
            <div className="w-3 h-3 bg-background-200 dark:bg-background-700 rounded-full" />
            <div className="w-3 h-3 bg-background-200 dark:bg-background-700 rounded-full" />
            <div className="w-3 h-3 bg-background-200 dark:bg-background-700 rounded-full" />
          </div>
        </div>
        <iframe
          src={
            selectedDemo === "challenge"
              ? `${getPublicEnv("BASE_URL")}/demo/mini-projetos/gerenciador-de-habitos-com-nextjs`
              : `${getPublicEnv("BASE_URL")}/demo/workshops/design-para-devs/apresentacao`
          }
          className="w-full h-full aspect-video"
          loading="lazy"
        ></iframe>
      </motion.div>
    </div>
  );
}

export default Demo;
