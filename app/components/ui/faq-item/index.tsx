import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import useSound from "~/lib/hooks/use-sound/use-sound";
import switchSound from "~/lib/sounds/switch.mp3";
import classNames from "~/lib/utils/class-names";

export default function FaqItem({
  question,
  answer,
  className,
}: {
  question: string;
  answer: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [playSound] = useSound(switchSound, { volume: 0.25 });

  return (
    <div
      className={classNames(
        isVisible
          ? "border-brand-500"
          : "border-background-300 dark:border-background-600 transition-colors",
        "cursor-pointer shadow mb-6 mx-2 lg:mx-24 border-[1.5px] font-lexend rounded-lg bg-white dark:bg-background-800 px-4 md:px-10 py-4 z-10",
        className,
      )}
      onClick={() => {
        setIsVisible(!isVisible);
        playSound();
      }}
    >
      <section className="flex justify-between items-center">
        <h3
          className={`py-4 md:py-6 text-lg md:text-xl  font-light text-gray-700 dark:text-white`}
        >
          {question}
        </h3>
        <RiArrowDownSLine
          className={`text-3xl md:text-4xl transition-transform flex-shrink-0 ${
            isVisible ? "-rotate-180 text-brand-500" : "text-gray-400"
          }`}
        />
      </section>
      <AnimatePresence initial={false}>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isVisible ? 1 : 0,
            height: isVisible ? "auto" : 0,
            transition: { opacity: { duration: 0.6 } },
          }}
          exit={{
            opacity: 0,
            height: 0,
            transition: { opacity: { duration: 0.1 } },
          }}
          key={isVisible ? "open" : "closed"}
          className={`${isVisible ? "visible" : "invisible"} `}
        >
          <p className="font-extralight dark:text-gray-300 text-gray-600 pb-4 text-sm md:text-base font-sans prose">
            {answer}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
