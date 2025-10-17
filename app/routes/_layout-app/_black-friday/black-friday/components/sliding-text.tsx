// SlidingText.js
import React from "react";
import { motion } from "framer-motion";

const SlidingText = ({
  children,
  speed = 10,
}: {
  children: React.ReactNode;
  speed?: number;
}) => {
  // Animation settings for the sliding text
  const slideAnimation: any = {
    x: ["-50%", "-200%"], // Slide from right to left
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: speed,
        ease: "linear",
      },
    },
  };

  return (
    <div className="overflow-hidden whitespace-nowrap flex absolute w-full">
      <motion.div
        className="inline-block pr-8 text-2xl font-nabla"
        animate={slideAnimation}
      >
        {children}
      </motion.div>
      <motion.div
        className="inline-block pr-8 text-2xl font-nabla"
        animate={slideAnimation}
      >
        {children}
      </motion.div>
      <motion.div
        className="inline-block pr-8 text-2xl font-nabla"
        animate={slideAnimation}
      >
        {children}
      </motion.div>
      <motion.div
        className="inline-block pr-8 text-2xl font-nabla"
        animate={slideAnimation}
      >
        {children}
      </motion.div>{" "}
      <motion.div
        className="inline-block pr-8 text-2xl font-nabla"
        animate={slideAnimation}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SlidingText;
